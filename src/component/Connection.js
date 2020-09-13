import React from 'react'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const sock = new SockJS('https://192.168.0.4:8443/ws');
const stomp = Stomp.over(sock);

export default function Connection({ id, userName, teamId }) {
    stomp.connect({
        teamId,
        userName
    }, onConnect, onError);

    return <></>

    function onConnect() {
        stomp.subscribe(`/topic/${teamId}`, () => {});
        stomp.subscribe(`/topic/${id}`, () => {});
        stomp.subscribe(`/topic/${teamId}/${id}`, () => {});
        stomp.send(`/app/signal.join.${teamId}`, {},
            JSON.stringify({ id, teamId, userName, type: 'JOIN', message: 'joinUser' }));
    }

    function onError(error) {
        console.error(error);
    }

    // function onPublicMessageReceived(event) {
    //     const data = JSON.parse(event.body);
    //     if (data.id == user.id) return;

    //     switch (data.type) {
    //         case 'JOIN':
    //             userCtrl.addUser(data.id, data.userName, (id) => {
    //                 connection.createOffer(id);
    //             });
    //             break;
    //         case 'LEAVE':
    //             userCtrl.removeUser(data.id);
    //             if (document.getElementById(data.id)) {
    //                 document.getElementById(data.id).remove();
    //             }
    //             break;
    //     }
    // }

    // function onPrivateMessageReceived(event) {
    //     const data = JSON.parse(event.body);
    //     switch (data.type) {
    //         case 'USERLIST':
    //             userCtrl.initUsers(data.message);
    //             break;
    //     }
    // }

    // function onMessageReceived(event) {
    //     const data = JSON.parse(event.body);
    //     if (data.id == user.id) return;

    //     switch (data.type) {
    //         case 'OFFER':
    //             connection.receiveOffer(data.id, data.message);
    //             break;
    //         case 'ANSWER':
    //             connection.receiveAnswer(data.id, data.message);
    //             break;
    //         case 'CANDIDATE':
    //             connection.addIceCandidate(data.id, data.message);
    //             break;
    //     }
    // }
}