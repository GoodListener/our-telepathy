import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberList from '../component/MemberList';
import MyInfoBox from '../component/MyInfoBox';
import socketManager from '../socket/socketManager';
import rtc from '../rtc/rtc';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import MyWorkBox from '../component/MyWorkBox';
import CallDialog from '../component/callDialog/CallDialog';

const useStyles = makeStyles({
    mainBox: {
        backgroundColor: "#F1F3F6",
        padding: "10px 20px"
    }
})

export default function Main() {
    const styles = useStyles();
    const { teamId, userName } = useParams();
    const [open, setOpen] = useState(false);
    const [memberData, setMemberData] = useState({name: 'null', id: ''});
    const [stream, setStream] = useState(null);

    useEffect(() => {
        socketManager.onMessageReceived(receiveDataMessage);

        return () => {
            socketManager.offMessageReceived();
        }
    });

    function receiveDataMessage(data) {
        console.log(data);
        switch (data.type) {
            case 'offer':
                setMemberData({
                    name: 'test',
                    id: data.id,
                    message: data.message
                })
                setOpen(true);
                break;
            case 'answer':
                rtc.receiveAnswer(data.id, data.message);
                break;
            case 'candidate':
                rtc.addIceCandidate(data.id, data.message);
                break;
            default:
                console.log(data);
                break;
        }
    }

    function receiveOffer(data) {
        console.log('receiveOffer');
        console.log(data);
        rtc.receiveOffer(data.id, data.message)
        .then(pc => {
            pc.onicecandidate = (event) => { handleIceCandidate(data.id, event) };
            pc.onaddstream = (event) => { handleRemoteStreamAdded(data.id, event); };
            pc.onremovestream = handleRemoteStreamRemoved;
            rtc.createAnswer(data.id).then(sessionDescription => {
                socketManager.sendMessageToUser('answer', data.id, sessionDescription);
            })
        })
    }

    function handleIceCandidate(id, event) {
        console.log(id, event);
        if (event.candidate) {
            socketManager.sendMessageToUser('candidate', id, event.candidate);
        }
    }

    function handleRemoteStreamAdded(id, event) {
        console.log(id, event);
        setStream(event.stream);
    }

    function handleRemoteStreamRemoved(event) {
        console.log(event);
    }

    function handleClose() {
        setOpen(false);
        rtc.destroyConnection(memberData.id);
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={3} className={styles.mainBox}>
                <Grid item xs={12} md={12}>
                    <Typography>TeleTele</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MyInfoBox
                        userName={userName}
                        teamId={teamId}
                    ></MyInfoBox>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MyWorkBox

                    >
                    </MyWorkBox>
                </Grid>
            </Grid>
            <MemberList className={styles.mainBox}></MemberList>
            <CallDialog type="answer" member={memberData} open={open} onClose={handleClose} connect={receiveOffer} stream={stream}></CallDialog>
        </Container>
    );
}