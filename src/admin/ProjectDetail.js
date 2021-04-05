import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './ProjectDetail.module.css';

function ProjectDetail () {
    const location = useLocation();
    const project = location.state.project;
    console.log(project);
    return <div className={styles.container}>
        <Link to='/admin'>
            <button>리스트로 돌아가기</button>
        </Link>
        <button>참여자 정보 업데이트</button>
        <button>진단 문항 업데이트</button>
        <button>프로젝트 삭제하기</button>
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