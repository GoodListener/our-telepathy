import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import rtc from '../rtc/rtc';

const state = {
    id: '',
    teamId: '',
    userName: ''
}

const sock = new SockJS('https://192.168.0.4:8443/ws');
const stomp = Stomp.over(sock);

function init(id, teamId, userName) {
    state.id = id;
    state.teamId = teamId;
    state.userName = userName;
    stomp.connect({
        teamId,
        userName
    }, onConnect, onError);
}

function onConnect() {
    stomp.subscribe(`/topic/${state.teamId}`, onPublicMessageReceived);
    stomp.subscribe(`/topic/${state.id}`, onPrivateMessageReceived);
    stomp.subscribe(`/topic/${state.teamId}/${state.id}`, onMessageReceived);
    stomp.send(`/app/signal.join.${state.teamId}`, {},
        JSON.stringify({ id: state.id, teamId: state.teamId, userName: state.userName, type: 'JOIN', message: 'joinUser' }));
}

function onError(error) {
    console.error(error);
}

function onPublicMessageReceived(event) {
    const data = JSON.parse(event.body);
    if (data.id === state.id) return;

    switch (data.type) {
        case 'JOIN':
            console.log(data);
            break;
        case 'LEAVE':

            break;
    }
}

function onPrivateMessageReceived(event) {
    const data = JSON.parse(event.body);
    switch (data.type) {
        case 'USERLIST':
            console.log(data);
            // data.message.forEach(user => {
            //     addMember(user.id, user.userName);
            // });
            break;
    }
}


function onMessageReceived(event) {
    const data = JSON.parse(event.body);
    if (data.id == state.id) return;

    switch (data.type) {
        case 'OFFER':
            rtc.receiveOffer(data.id, data.message)
                .then((id, sessionDescription) => {
                    sendMessageToUser('ANSWER', id, sessionDescription);
                })
            break;
        case 'ANSWER':
            rtc.receiveAnswer(data.id, data.message);
            break;
        case 'CANDIDATE':
            rtc.addIceCandidate(data.id, data.message);
            break;
    }
}

function sendMessageToUser(type, target, message) {
    const messageObject = {
        id: state.id,
        type: type,
        message: message
    };
    stomp.send(`/topic/${state.teamId}/${target}`, {}, JSON.stringify(messageObject));
}

function sendMessageToServer(type, message) {
    const messageObject = {
        id: state.id,
        type: type,
        message: message
    };
    stomp.send(`/app/`)
}

export default {
    init
}