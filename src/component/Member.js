import React, { useState } from 'react';

export default function Member({ memberList }) {
    
    function handleClickMember(member) {
        console.log(member);
    }
    return <ul>
        {memberList.map(member =>
            (<li onClick={() => { handleClickMember(member) } }>
                <p>{member.userId}</p>
                <p>{member.userName}</p>
            </li>))}
    </ul>
}