import React, { useState, useEffect } from 'react';
import { Route, Link, useHistory, BrowserRouter as Router} from 'react-router-dom';
import styles from './ProjectList.module.css';
import axios from 'axios';

function ProjectItem(props) {
    const { project, idx, projects } = props;
    const history = useHistory();

    const handleItemClick = () => {
        console.log('클릭한 개별 프로젝트 데이터', project);
        console.log('전체 프로젝트 데이터', projects)
        history.push({
            pathname: '/admin/project',
            state: { 
                project: project,
                projects: projects
            }
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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        const result = await axios.get('http://localhost:4000/project');
        setProjects(result.data);
        setIsLoaded(true);
        console.log('프로젝트 데이터', projects);
    },[])

    return <div className={styles.container}>
        <div className={styles.title}>
            <h3>진단 프로젝트 리스트</h3>
            <Link to='/admin/create-project'>
                <button>프로젝트 등록</button>
            </Link>
            {/* <Link to='/admin/matching-users'>
                <button>진단자 매칭</button>
            </Link> */}
        </div>
        {!isLoaded ? <div>진단 데이터를 읽어오는 중입니다...</div> : (
            projects.length === 0 ? <div>현재 등록된 진단 프로젝트가 없습니다</div> :
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
                    {projects.map((project, idx, projects) => (
                        <ProjectItem key={idx} project={project} idx={idx} projects={projects}/>
                    ))}
                </tbody>
            </table>
            )
        }
    </div>
}

export default ProjectList;