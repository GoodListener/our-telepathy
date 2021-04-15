import { io } from 'socket.io-client';

const state = {
    key: '',
    id: '',
    team: '',
    name: ''
}

class SocketManager {
    constructor() {
        this.socket = io("https://flawless-psyche-307902.du.r.appspot.com");
    }

    join(userInfo) {
        state.id = userInfo.id;
        state.team = userInfo.team;
        state.name = userInfo.name;
        this.socket.emit("join", userInfo);
    }

    onJoin(addMember, removeMember) {
        this.socket.on('myInfo', userInfo => {
            state.key = userInfo.key;
        })

        this.socket.on('userList', userList => {
            userList.forEach(userInfo => {
                console.log(userInfo);
                addMember(userInfo);
            })
        })

        this.socket.on("joinedUser", member => {
            console.log(member);
            addMember(member);
        });

        this.socket.on("leavedUser", key => {
            removeMember(key);
        });
    }

    offJoin() {
        this.socket.off('myInfo');
        this.socket.off('userList');
        this.socket.off('joinedUser');
        this.socket.off('leavedUser');
    }

    getMyInfo() {
        return state;
    }

    sendChatMessageToAll(user, message) {
        this.socket.emit("chatMessageToAll", user, message);
    }

    onChatMessage(onChatMessage) {
        this.socket.on('receiveChatMessage', onChatMessage);
    }

    onError(error) {
        console.error(error);
    }

    onMessageReceived(receiveDataMessage) {
        this.socket.on('receivePrivateMessage', receiveDataMessage);
    }

    offMessageReceived() {
        this.socket.off('receivePrivateMessage')
    }

    sendMessageToUser(type, targetkey, message) {
        const messageObject = {
            id: state.id, // sender id
            key: state.key, // sender key
            type: type,
            message: message
        };
        this.socket.emit('privateMessage', targetkey, messageObject);
    }
}

export default new SocketManager();