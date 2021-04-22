import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberList from '../component/MemberList';
import MyInfoBox from '../component/MyInfoBox';
import socketManager from '../socket/socketManager';
import rtc from '../rtc/rtc';
import utils from '../utils/utils';
import { makeStyles, Box, Container, Grid, Typography } from '@material-ui/core';
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
    const [myInfo, setMyInfo] = useState({
        key: '',
        id: utils.getNewId(),
        name: userName,
        team: teamId,
        status: 'working'
    });
    const [chatList, setChatList] = useState([]);
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        socketManager.join(myInfo);
    }, []);

    useEffect(() => {
        socketManager.onJoin(addMember, removeMember);

        return () => {
            socketManager.offJoin();
        }
    });

    useEffect(() => {
        socketManager.onChatMessage(receiveChatMessage);
    }, []);

    useEffect(() => {
        socketManager.onMessageReceived(receiveDataMessage);

        return () => {
            socketManager.offMessageReceived();
        }
    });

    /**
     * @param {Member} member
     */
    function addMember(member) {
        setMemberList(memberList => [...memberList, member]);
    }

    function updateMember(newMember) {
        const index = [...memberList].findIndex(member => {
            return member.key === newMember.key
        });
        let newMemberList = [...memberList];
        newMemberList[index] = newMember;
        setMemberList(() => newMemberList);
    }

    function removeMember(key) {
        setMemberList(memberList => memberList.filter(member => {
            return member.key !== key;
        }));
    }

    function sendChatMessage(message) {
        const user = socketManager.getMyInfo();
        socketManager.sendChatMessageToAll(user, message);
    }

    function receiveChatMessage(chat) {
        setChatList(chatList => [...chatList, chat]);
    }

    function offerToMember(user) {
        rtc.createOffer(user.id, user.key)
            .then(({ pc, sessionDescription }) => {
                pc.onicecandidate = (event) => { handleIceCandidate(user.key, event) };
                pc.onaddstream = (event) => { handleRemoteStreamAdded(user.key, event); };
                pc.onremovestream = handleRemoteStreamRemoved;
                socketManager.sendMessageToUser('offer', user.key, sessionDescription);
            });
    }


    function receiveDataMessage(data) {
        switch (data.type) {
            case 'offer':
                rtc.receiveOffer(data.id, data.message)
                    .then(pc => {
                        pc.onicecandidate = (event) => { handleIceCandidate(data.key, event) };
                        pc.onaddstream = (event) => { handleRemoteStreamAdded(data.key, event); };
                        pc.onremovestream = handleRemoteStreamRemoved;
                        rtc.createAnswer(data.id).then(sessionDescription => {
                            socketManager.sendMessageToUser('answer', data.key, sessionDescription);
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

    function handleIceCandidate(key, event) {
        if (event.candidate) {
            socketManager.sendMessageToUser('candidate', key, event.candidate);
        }
    }

    function handleRemoteStreamAdded(key, event) {
        const member = [...memberList].find(member => member.key === key);
        if (member) {
            member.stream = event.stream;
            updateMember(member);
        }
    }

    function handleRemoteStreamRemoved(event) {
        console.log(event);
    }

    function checkMemberList() {
        console.log(memberList);
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={3} className={styles.mainBox}>
                <Grid item xs={12} md={12}>
                    <Typography>TeleTele</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MyInfoBox
                        myInfo={myInfo}
                        setMyInfo={setMyInfo}
                    ></MyInfoBox>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MyWorkBox

                    >
                    </MyWorkBox>
                </Grid>
            </Grid>
            <MemberList className={styles.mainBox}
                memberList={memberList}
                offerToMember={offerToMember}
            ></MemberList>
        </Container>
    );
}