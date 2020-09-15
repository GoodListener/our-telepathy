const state = {
    pcList: {}
}

const remote = []

const pcInfo = {
    'iceServers': [
        { url: 'stun:stun1.l.google.com:19302' },
        {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        }]

};

function init() {

}

function peerConnection(id, stream) {
    return new Promise(res => {
        try {
            const pc = new RTCPeerConnection(pcInfo);
            pc.addStream(stream)
            pc.oniceconnectionstatechange = (event) => { handleOnIceConnectionStateChange(id, event); };
            state.pcList[id] = pc;
            res(pc);
        } catch (e) {
            console.error(e);
            return;
        }
    });
}

function createOffer(id) {
    return new Promise(res => {
        peerConnection(id).then((pc) => {
            state.pcList[id].createOffer(sessionDescription => {
                state.pcList[id].setLocalDescription(sessionDescription);
                res(pc, sessionDescription);
            }, handleError)
        })
    })
}

function receiveOffer(id, offer) {
    console.log('receiveOffer: ' + id);
    if (!state.pcList[id]) {
        return new Promise(res => {
            peerConnection(id).then(() => {
                state.pcList[id].setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
                    createAnswer(id)
                    .then(res);
                })
            })
        })
    }
}

function createAnswer(id) {
    console.log('createAnswer: ' + id);
    console.log(state.pcList[id].connectionState);
    return new Promise(res => {
        if (state.pcList[id].connectionState != "connected") {
            state.pcList[id].createAnswer(sessionDescription => {
                state.pcList[id].setLocalDescription(sessionDescription);
                res(id, sessionDescription);       
            }, handleError);
        }
    })
}

function receiveAnswer(id, answer) {
    console.log('receiveAnswer: ' + id);
    state.pcList[id].setRemoteDescription(new RTCSessionDescription(answer));
}

function addIceCandidate(id, candidate) {
    state.pcList[id].addIceCandidate(candidate);
}

function handleOnIceConnectionStateChange(id, event) {

}

function handleError(error) {
    console.error(error);
}

function getPcList() {
    return state.pcList;
}

export default {
    getPcList,
    peerConnection,
    createOffer,
    receiveOffer,
    receiveAnswer,
    addIceCandidate,
}