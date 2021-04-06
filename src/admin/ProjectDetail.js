import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './ProjectDetail.module.css';

function ProjectDetail () {
    const location = useLocation();
    const project = location.state.project;
    console.log('넘어온 프로젝트 데이터', project);

    const handleFinishProject = () => {

    }

    const handleDownloadResult = () => {

    }

    const handleRemoveProject = () => {

    }

    return <div className={styles.container}>
        <Link to='/admin'>
            <button>리스트로 돌아가기</button>
        </Link>
        <button onClick={handleFinishProject}>프로젝트 완료</button>
        <button onClick={handleDownloadResult}>결과 다운로드</button>
        <button onClick={handleRemoveProject}>프로젝트 삭제</button>
        <h3>{project.projectTitle}</h3>
        <table className={styles.table}>
            <tr>
                <th>기업명</th>
                <td>{project.company}</td>
            </tr>
            <tr>
                <th>관리자 이름</th>
                <td>{project.managerName}</td>
            </tr>
            <tr>
                <th>관리자 이메일</th>
                <td>{project.managerEmail}</td>
            </tr>
            <tr>
                <th>관리자 휴대폰</th>
                <td>{project.managerMobile}</td>
            </tr>
        </table>
    </div>
};

export default ProjectDetail;