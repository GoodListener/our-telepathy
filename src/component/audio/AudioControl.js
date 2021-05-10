import React, { useEffect, useRef } from 'react';

export default function AudioControl({ stream }) {
    const audioRef = useRef();

    useEffect(() => {
        audioRef.current.srcObject = stream;
        audioRef.current.autoPlay = 'autoplay';
    })

    return (
        <div>
            <audio ref={audioRef} autoPlay="autoplay" controls="controls"></audio>
        </div>
    )
}