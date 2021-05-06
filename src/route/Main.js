import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MemberList from '../component/MemberList';
import MyInfoBox from '../component/MyInfoBox';
import socketManager from '../socket/socketManager';
import rtc from '../rtc/rtc';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import MyWorkBox from '../component/MyWorkBox';

const useStyles = makeStyles({
    mainBox: {
        backgroundColor: "#F1F3F6",
        padding: "10px 20px"
    }
})

export default function Main() {
    const styles = useStyles();
    const { teamId, userName } = useParams();

    useEffect(() => {
        socketManager.onMessageReceived(receiveDataMessage);

        return () => {
            socketManager.offMessageReceived();
        }
    });

    function offerToMember(user) {
        rtc.createOffer(user.id)
            .then(({ pc, sessionDescription }) => {
                pc.onicecandidate = (event) => { handleIceCandidate(user.id, event) };
                pc.onaddstream = (event) => { handleRemoteStreamAdded(user.id, event); };
                pc.onremovestream = handleRemoteStreamRemoved;
                socketManager.sendMessageToUser('offer', user.id, sessionDescription);
            });
    }

    function receiveDataMessage(data) {
        switch (data.type) {
            case 'offer':
                rtc.receiveOffer(data.id, data.message)
                    .then(pc => {
                        pc.onicecandidate = (event) => { handleIceCandidate(data.id, event) };
                        pc.onaddstream = (event) => { handleRemoteStreamAdded(data.id, event); };
                        pc.onremovestream = handleRemoteStreamRemoved;
                        rtc.createAnswer(data.id).then(sessionDescription => {
                            socketManager.sendMessageToUser('answer', data.id, sessionDescription);
                        })
                    })
                break;
            case 'answer':
                rtc.receiveAnswer(data.id, data.message);
                break;
            case 'candidate':
                console.log('candidate');
                console.log(data);
                rtc.addIceCandidate(data.id, data.message);
                break;
            default:
                console.log(data);
                break;
        }
    }

    function handleIceCandidate(id, event) {
        if (event.candidate) {
            socketManager.sendMessageToUser('candidate', id, event.candidate);
        }
    }

    function handleRemoteStreamAdded(id, event) {
        console.log(id, event);
    }

    function handleRemoteStreamRemoved(event) {
        console.log(event);
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
            <MemberList className={styles.mainBox}
                offerToMember={offerToMember}
            ></MemberList>
        </Container>
    );
}