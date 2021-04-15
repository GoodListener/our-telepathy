import React, { useRef } from 'react';

export default function Member({ memberList, offerToMember }) {
    
    const videoRef = useRef();

    function addStream(stream) {
        if (stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.autoplay = 'autoplay';
        }
    }

    return <ul>
        {memberList.map(member =>
            (<li key={member.key} onDoubleClick={() => { offerToMember(member) } }>
                <p>{member.id}</p>
                <p>{member.status}</p>
                <p>{member.name}</p>
                <video ref={videoRef} onClick={addStream(member.stream)}></video>
            </li>))}
    </ul>
}