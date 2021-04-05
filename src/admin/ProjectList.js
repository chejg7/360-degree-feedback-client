import React, { useState, useEffect } from 'react';
import { Route, Link, useHistory, BrowserRouter as Router} from 'react-router-dom';
import styles from './ProjectList.module.css';
import axios from 'axios';

function ProjectItem(props) {
    const { project, idx } = props;
    const history = useHistory();

    const handleItemClick = (event) => {
        console.log('클릭한 개별 프로젝트 데이터', project);
        history.push({
            pathname: '/admin/project',
            state: { project: project }
        });
    }

    return (
        <>
        <tr>
            <td>{idx}</td>
                <td>{project.projectTitle}</td>
                <td>{project.company}</td>
                <td>{project.managerName}</td>
                <td>{project.managerEmail}</td>
                <td>{project.managerMobile}</td>
                <td>{project.startDate.substring(0, 10)}</td>
                <td>{project.finishDate.substring(0, 10)}</td>
                <td><button 
                    onClick={handleItemClick}
                    value={project}
                    >관리</button></td>
        </tr>
        </>
    )
}

function ProjectList() {
    const [projects, setProjects] = useState(null);

    useEffect(async () => {
        const result = await axios.get('http://localhost:4000/getprojects');
        setProjects(result.data);
        console.log('프로젝트 데이터', projects);
    },[])

    return <>
        <Link to='/admin/create-project'>
            <button>프로젝트 등록</button>
        </Link>
        <Link to='/admin/matching-users'>
            <button>진단자 매칭</button>
        </Link>
        <h3>진단 프로젝트 리스트</h3>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>프로젝트명</th>
                    <th>회사명</th>
                    <th>담당자 이름</th>
                    <th>담당자 이메일</th>
                    <th>담당자 연락처</th>
                    <th>시작일</th>
                    <th>종료일</th>
                    <th>기능</th>
                </tr>
            </thead>
            <tbody>
                {projects ? projects.map((project, idx) => (
                    <ProjectItem project={project} idx={idx}/>
                )) : <div>진단 데이터를 읽어오는 중입니다...</div>}
            </tbody>
        </table>
    </>
}

export default ProjectList;