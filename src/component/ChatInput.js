import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core'

export default function ChatInput({ sendMessage }) {
    
    const [message, setMessage] = useState("");


    function handleTextChange(e) {
        setMessage(e.target.value);
    } 

    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            sendMessage(message);
            setMessage(() => "");
        }
    }

    return (
        <React.Fragment>
            <TextField
                value={message}
                onChange={handleTextChange}
                onKeyPress={handleEnterKey}
            ></TextField>
            <Button
                onClick={() => { sendMessage(message); setMessage(() => ""); }}>Send</Button>
        </React.Fragment>
    )
}