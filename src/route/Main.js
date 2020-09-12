import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Main() {
    let { teamId } = useParams();
    return (
        <div>
            <p>{teamId}팀과 함께하는 중</p>
            <Link to="/">첫 페이지로 가기</Link>
        </div>
    );
}