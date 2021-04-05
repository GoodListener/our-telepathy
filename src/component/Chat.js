import React from 'react';

export default function Chat({ chatList }) {
    
    return <ul>
        {chatList.map(chat =>
            (<li key={chat.key}>
                <p>{chat.name}</p>
                <p>{chat.message}</p>
            </li>))}
    </ul>
}