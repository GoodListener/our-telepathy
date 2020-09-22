import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Member from '../component/Member';
import Socket from '../socket/Socket';
import rtc from '../rtc/rtc';
import utils from '../utils/utils';

// 단 1회만 호출하도록 해야함 (useMount 사용등으로)
const socket = new Socket(userId, teamId, userName, addMember, removeMember);

export default function Main() {
    let { teamId, userName } = useParams();
    const userId = utils.getNewId();
    const [memberList, setMemberList] = useState([{userId, userName}]);

    function addMember(userId, userName) {
        setMemberList(memberList.concat({
            userId: userId,
            userName: userName
        }));
    }

    function removeMember(userId) {
        setMemberList(memberList.filter(member => {
            return member.userId !== userId
        }));
    }

    function offerToMember(userId) {
        rtc.createOffer(userId)
        .then((pc, sessionDescription) => {
            pc.onicecandidate = (event) => { handleIceCandidate(userId, event) };
            pc.onaddstream = (event) => { handleRemoteStreamAdded(userId, event); };
            pc.onremovestream = handleRemoteStreamRemoved;
            socket.sendMessageToUser('OFFER', userId, sessionDescription);
        });
    }

    function handleIceCandidate(userId, event) {
        if (event.candidate) {
            socket.sendMessageToUser('CANDIDATE', userId, event.candidate);
        }
    }

    function handleRemoteStreamAdded(userId, event) {
        console.log(event.stream);
        // const video = document.createElement('video');
        // video.id = id;
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

    return (
        <div>
            <p>{teamId}팀과 함께하는 중</p>
            <Link to="/">첫 페이지로 가기</Link>
            <Member 
                memberList={memberList}
                offerToMember={offerToMember}
            ></Member>
        </div>
    );
}