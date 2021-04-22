const state = {
    pcList: {},
    stream: null
}

const pcInfo = {
    'iceServers': [
        { url: 'stun:34.64.112.126:3478' },
        {
            url: 'turn:34.64.112.126:3478?transport=udp',
            credential: 'dmdcjfdl',
            username: 'ekim'
        }],
    'DtlsSrtpKeyAgreement': true

};

async function getUserMedia() {
    if (state.stream) {
        return state.stream;
    }
    state.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    return state.stream;
}

function peerConnection(id) {
    return new Promise((res, rej) => {
        getUserMedia().then(stream => {
            window.myStream = stream;
            try {
                const pc = new RTCPeerConnection(pcInfo);
                pc.addStream(stream);
                pc.oniceconnectionstatechange = (event) => { handleOnIceConnectionStateChange(id, event); };
                state.pcList[id] = pc;
                res(pc);
            } catch (e) {
                console.error(e);
                rej(e)
            }
        })
    });
}

function createOffer(id) {
    console.log('createOffer: ' + id);
    return new Promise((res, rej) => {
        peerConnection(id)
            .then(pc => {
                state.pcList[id].createOffer(sessionDescription => {
                    state.pcList[id].setLocalDescription(sessionDescription);
                    res({ pc, sessionDescription });
                }, handleError)
            })
            .catch(e => {
                rej(e);
            })
    })
}

function receiveOffer(id, offer) {
    console.log('receiveOffer: ' + id);
    if (!state.pcList[id]) {
        return new Promise(res => {
            peerConnection(id)
                .then(pc => {
                    pc.setRemoteDescription(new RTCSessionDescription(offer));
                    res(pc);
                });
        })
    }
}

function createAnswer(id) {
    return new Promise(res => {
        if (state.pcList[id].connectionState !== "connected") {
            state.pcList[id].createAnswer(sessionDescription => {
                state.pcList[id].setLocalDescription(sessionDescription);
                res(sessionDescription);
            }, handleError);
        }
    })
}

function receiveAnswer(id, answer) {
    state.pcList[id].setRemoteDescription(new RTCSessionDescription(answer));
}

function addIceCandidate(id, candidate) {
    if (state.pcList[id])
        state.pcList[id].addIceCandidate(candidate);
}

function handleOnIceConnectionStateChange(id, event) {
    console.log(id, event);
    console.log(state.pcList[id].connectionState)
    if (state.pcList[id].connectionState === "connected") {
        console.log('connected');
    }
    // if (peerConnection.connectionState === 'connected') {
    //     // Peers connected!
    // }
}

function handleError(error) {
    console.error(error);
}


export default {
    getUserMedia,
    createOffer,
    createAnswer,
    receiveOffer,
    receiveAnswer,
    addIceCandidate,
}