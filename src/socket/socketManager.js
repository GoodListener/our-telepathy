import { io } from 'socket.io-client';

class SocketManager {
    constructor() {
        // this.socket = io("https://flawless-psyche-307902.du.r.appspot.com");
        this.socket = io("https://localhost:8080");
        this.myInfo = null;
        this.isJoined = false;
        console.log('socketManager');
    }


    join(member) {
        if (!this.isJoined) {
            this.myInfo = member;
            this.socket.emit("join", member);
            this.isJoined = true;
        }
    }

    /**
     * 
     * @param {Function} onAddMember 
     * @param {Function} onRemoveMember 
     */
    onJoin(onAddMember, onRemoveMember) {
        this.socket.on('myInfo', userInfo => {
            this.myInfo.id = userInfo.id;
        })

        this.socket.on('userList', userList => {
            userList.forEach(userInfo => {
                onAddMember(userInfo);
            })
        })

        this.socket.on("joinedUser", member => {
            onAddMember(member);
        });

        this.socket.on("leavedUser", id => {
            onRemoveMember(id);
        });
    }

    offJoin() {
        this.socket.off('myInfo');
        this.socket.off('userList');
        this.socket.off('joinedUser');
        this.socket.off('leavedUser');
    }

    getMyInfo() {
        return this.myInfo;
    }

    changeStatus(member) {
        this.socket.emit('changeStatus', member);
    }


    onChangeStatus(onChangeStatus) {
        this.socket.on('onChangeStatus', onChangeStatus);
    }

    offChangeStatus() {
        this.socket.off('onChangeStatus');
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

    sendMessageToUser(type, targetId, message) {
        const messageObject = {
            id: this.myInfo.id, // sender id
            type: type,
            message: message
        };
        this.socket.emit('privateMessage', targetId, messageObject);
    }
}

export default new SocketManager();