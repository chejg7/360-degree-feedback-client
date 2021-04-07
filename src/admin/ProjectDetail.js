import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './ProjectDetail.module.css';

function ProjectDetail () {
    const history = useHistory();
    const location = useLocation();
    const project = location.state.project;
    const projects = location.state.projects;
    console.log('넘어온 개별 프로젝트 데이터', project);
    console.log('넘어온 전체 프로젝트 데이터', projects);

    const handleFinishProject = async () => {
        await axios.post('http://localhost:4000/project/finish', {
            projectTitle: project.projectTitle
        })
        .then((res) => {
            console.log(res.data);
        });
    }

    const handleStartProject = () => {

    }

    const handleDownloadResult = () => {

    }

    const handleRemoveProject = async () => {
        await axios.post('http://localhost:4000/project/remove', {
            projectTitle: project.projectTitle
        })
        .then((res) => {
            console.log(res.data);
        });
        history.push('/admin');
    }

    return <div className={styles.container}>
        <Link to='/admin'>
            <button>리스트로 돌아가기</button>
        </Link>
        <button onClick={handleFinishProject}>프로젝트 완료</button>
        <button onClick={handleStartProject}>프로젝트 재시작</button>
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