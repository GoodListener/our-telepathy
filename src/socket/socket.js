import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import rtc from '../rtc/rtc';

const state = {
    id: '',
    teamId: '',
    userName: ''
}

export default class Socket {
    constructor(id, teamId, userName, addMember, removeMember) {
        this.stomp = Stomp.over(new SockJS('https://192.168.0.4:8443/ws'));

        state.id = id;
        state.teamId = teamId;
        state.userName = userName;

        this.addMember = addMember;
        this.removeMember = removeMember;

        this.stomp.connect({
            teamId,
            userName
        }, () => { this.onConnect() }, this.onError);
    }

    onConnect() {
        this.stomp.subscribe(`/topic/${state.teamId}`, event => { this.onPublicMessageReceived(event) });
        this.stomp.subscribe(`/topic/${state.id}`, event => { this.onPrivateMessageReceived(event) } );
        this.stomp.subscribe(`/topic/${state.teamId}/${state.id}`, event => { this.onMessageReceived(event) });
        this.stomp.send(`/app/signal.join.${state.teamId}`, {},
            JSON.stringify({ id: state.id, teamId: state.teamId, userName: state.userName, type: 'JOIN', message: 'joinUser' }));
    }

    onError(error) {
        console.error(error);
    }

    onPublicMessageReceived(event) {
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

    onPrivateMessageReceived(event) {
        const data = JSON.parse(event.body);
        switch (data.type) {
            case 'USERLIST':
                data.message.forEach(user => {
                    this.addMember(user.id, user.userName);
                });
                break;
        }
    }


    onMessageReceived(event) {
        const data = JSON.parse(event.body);
        if (data.id == state.id) return;

        switch (data.type) {
            case 'OFFER':
                rtc.receiveOffer(data.id, data.message)
                    .then((id, sessionDescription) => {
                        this.sendMessageToUser('ANSWER', id, sessionDescription);
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

    sendMessageToUser(type, target, message) {
        const messageObject = {
            id: state.id,
            type: type,
            message: message
        };
        this.stomp.send(`/topic/${state.teamId}/${target}`, {}, JSON.stringify(messageObject));
    }

    sendMessageToServer(type, message) {
        const messageObject = {
            id: state.id,
            type: type,
            message: message
        };
        this.stomp.send(`/app/`)
    }
}
