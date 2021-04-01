import React from 'react';
import { Link } from 'react-router-dom';

function MatchingUsers() {
    return <>
        <Link to='/admin'>
            <button>리스트로 돌아가기</button>
        </Link>
        <h3>진단 참여자 매칭</h3>
    </>
}

export default MatchingUsers;