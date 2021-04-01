import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function ProjectDetail () {
    const location = useLocation();
    const project = location.state.project;
    console.log(project);
    return <>
        <Link to='/admin'>
            <button>리스트로 돌아가기</button>
        </Link>
        <button>참여자 정보 업데이트</button>
        <button>진단 문항 업데이트</button>
        <button>프로젝트 삭제하기</button>
        <h3>프로젝트명 : {project.projectTitle}</h3>
        <div>기업명 : {project.company}</div>
        <div>관리자 이름 : {project.managerName}</div>
        <div>관리자 이메일 : {project.managerEmail}</div>
        <div>관리자 휴대폰 : {project.managerMobile}</div>
    </>
};

export default ProjectDetail;