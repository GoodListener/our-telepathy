import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Start() {
    const [teamId, setTeamId] = useState('');

    function handleChange(e) {
        setTeamId(e.target.value);
    }

    return <div>
        <p>텔레파시</p>
        <p>
            <input type="text" onChange={handleChange} />팀과
            <Link to={`/team/${teamId}`}> 함께하기</Link>
        </p>
    </div>
}