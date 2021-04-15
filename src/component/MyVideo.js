import React, { useEffect, useRef } from 'react';

export default function MyVideo({ stream }) {
    
    const videoRef = useRef();
    useEffect(() => {
        videoRef.current.srcObject = stream;
        videoRef.current.autoplay = 'autoplay';
    }, [stream]);

    return <video ref={videoRef}></video>
}