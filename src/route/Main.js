import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Connection from '../component/Connection';

export default function Main() {
    let { teamId } = useParams();
    let id = generateId();
    return (
        <div>
            <p>{teamId}팀과 함께하는 중</p>
            <Connection id={id} teamId={teamId} userName="사용자"></Connection>
            <Link to="/">첫 페이지로 가기</Link>
        </div>
    );

    function generateId() {
        return new Date().getTime().toString().substring(6, 14);
    }
}