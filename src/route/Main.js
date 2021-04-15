import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Member from '../component/Member';
import socketManager from '../socket/socketManager';
import rtc from '../rtc/rtc';
import utils from '../utils/utils';
import ChatInput from '../component/ChatInput';
import Chat from '../component/Chat';
import MyVideo from '../component/MyVideo'
import { Button } from '@material-ui/core';

export default function Main() {
    const { teamId, userName } = useParams();
    const [myInfo, setMyInfo] = useState({
        key: '',
        id: utils.getNewId(),
        name: userName,
        team: teamId
    });
    const [chatList, setChatList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [myStream, setMyStream] = useState(null);

    
    useEffect(() => {
        async function getMyStream() {
            const stream = await rtc.getUserMedia();
            console.log(stream);
            setMyStream(stream);
        }
        getMyStream();
    }, []);

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
        // const video = document.createElement('video');
        // video.id = userId;
        // video.srcObject = event.stream;
        // video.autoplay = 'autoplay';
        // document.body.append(video);
        // remote.push({
        //     video: video,
        //     stream: event.stream
        // });
    }

    function handleRemoteStreamRemoved(event) {
        console.log(event);
    }

    function checkMemberList() {
        console.log(memberList);
    }

    return (
        <div>
            <p>{teamId}팀과 함께하는 중</p>
            <Link to="">첫 페이지로 가기</Link>
            <Button
                onClick={() => { checkMemberList() }}>MemberListCheck</Button>
            <MyVideo
                stream={myStream}
            ></MyVideo>
            <Member
                memberList={memberList}
                offerToMember={offerToMember}
            ></Member>
            <ChatInput
                sendMessage={(user, message) => { sendChatMessage(user, message) }}
            ></ChatInput>
            <Chat
                chatList={chatList}
            ></Chat>
        </div>
    );
}