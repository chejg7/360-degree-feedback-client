import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import XLSX from 'xlsx';
import styles from './ProjectDetail.module.css';

function Responses ({ list, handleDownloadResult }) {
    //응답을 본 컴포넌트가 아니라 상위 컴포넌트에서 읽어와서 프롭스로 전달하는 것으로 로직 변경
    // const [responses, setResponses] = useState([]);
    // console.log('프로젝트 타이틀', props.projectTitle)

    // useEffect(async () => {
    //     await axios.post('http://localhost:4000/responses', {
    //         projectTitle: props.projectTitle
    //     })
    //     .then(res => {
    //         console.log('받아온 응답 데이터', res.data)
    //         setResponses(res.data);
    //     });
    // }, [])

    return <div className={styles.container}>
        <div className={styles.listTitle}>
            <div>진단 참여자 리스트</div>
            <button onClick={handleDownloadResult}>결과 다운로드</button>
        </div>
        <table className={styles.list}>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>직위</th>
                    <th>본부</th>
                    <th>부서</th>
                    <th>팀</th>
                    <th>이메일</th>
                    <th>휴대폰</th>
                    <th>등록된 진단</th>
                    <th>완료한 진단</th>
                    <th>완료율(%)</th>
                </tr>
            </thead>
            <tbody>
                {list.map((el, idx) => <tr>
                    <td>{idx + 1}</td>
                    <td>{el.evaluatorName}</td>
                    <td>{el.evaluatorPosition}</td>
                    <td>{el.evaluatorDivision}</td>
                    <td>{el.evaluatorDepartment}</td>
                    <td>{el.evaluatorTeam}</td>
                    <td>{el.evaluatorEmail}</td>
                    <td>{el.evaluatorMobile}</td>
                    <td>{el.isSigned}</td>
                    <td>{el.isCompleted}</td>
                    <td>{Math.round(el.isCompleted / el.isSigned * 100)}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
}

function ProjectDetail () {
    const history = useHistory();
    const location = useLocation();
    const project = location.state.project;
    const projects = location.state.projects;
    console.log('넘어온 개별 프로젝트 데이터', project);
    console.log('넘어온 전체 프로젝트 데이터', projects);

    const [responses, setResponses] = useState([]);

    useEffect(async () => {
        await axios.post('http://ec2-3-35-210-192.ap-northeast-2.compute.amazonaws.com:3000/responses', {
            projectTitle: project.projectTitle
        })
        .then(res => {
            console.log('받아온 응답 데이터', res.data)
            setResponses(res.data);
        });
    }, [])

    const handleFinishProject = async () => {
        await axios.post('http://ec2-3-35-210-192.ap-northeast-2.compute.amazonaws.com:3000/project/finish', {
            projectTitle: project.projectTitle
        })
        .then((res) => {
            console.log(res.data);
            alert('프로젝트를 성공적으로 완료하였습니다');
        });
    }

    const handleRestartProject = async () => {
        await axios.post('http://ec2-3-35-210-192.ap-northeast-2.compute.amazonaws.com:3000/project/restart', {
            userInfo: project.userInfo,
            projectTitle: project.projectTitle
        })
        .then((res) => {
            console.log(res.data);
            alert('프로젝트를 성공적으로 재시작하였습니다');
        })
    }

    const handleDownloadResult = () => {
        const newResponses = responses.map(res => {
            const newObj = {...res};
            if (res.response) {
                for (let el of res.response) {
                    const key = el.survey + el.num;
                    const val = el.response;
                    newObj[key] = val;
                }
            }
            return newObj;
        })
        console.log('엑셀로 저장하기 위한 json', newResponses);
        const workbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.json_to_sheet(newResponses);
        XLSX.utils.book_append_sheet(workbook, newWorksheet, 'DATA');
        XLSX.writeFile(workbook, '진단 결과 데이터.xlsx');
    }

    const list = responses.reduce((acc, cur) => {
        const idx = acc.findIndex(el => el.evaluatorEmail === cur.evaluatorEmail);
        
        if (idx > -1) {
            acc[idx].isSigned++;
            if (cur.response) acc[idx].isCompleted++;
        } else {
            const copied = {...cur};
            copied.isSigned = 1;
            copied.isCompleted = cur.response ? 1 : 0;
            acc.push(copied);
        }

        return acc;
    }, []);
    console.log('리스트 정보', list);
    
    let isCompletedSum = 0;
    let isSignedSum = 0;
    for (let el of list) {
        isCompletedSum = isCompletedSum + el.isCompleted;
        isSignedSum = isSignedSum + el.isSigned;
    };

    const handleRemoveProject = async () => {
        await axios.post(process.env.REACT_APP_URL + '/project/remove', {
            projectTitle: project.projectTitle
        })
        .then((res) => {
            console.log(res.data);
            alert('프로젝트를 성공적으로 삭제하였습니다')
        });
        history.push('/admin');
    }

    return (
        <div>
            <div className={styles.container}>
                {/* <div className={styles.backBtn}>
                    <Link to='/admin'>
                        <button>Back</button>
                    </Link>
                </div> */}
            
            <div className={styles.projectTitle}>
                <div>{project.projectTitle}</div>
                <div className={styles.titleBtn}>
                    <button onClick={handleFinishProject}>프로젝트 완료</button>
                    <button onClick={handleRestartProject}>프로젝트 재시작</button>
                    <button onClick={handleRemoveProject}>프로젝트 삭제</button>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>기업명</th>
                        <th>관리자 이름</th>
                        <th>관리자 이메일</th>
                        <th>관리자 휴대폰</th>
                        <th>진단 참여인원</th>
                        <th>전체 참여율(%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{project.company}</td>
                        <td>{project.managerName}</td>
                        <td>{project.managerEmail}</td>
                        <td>{project.managerMobile}</td>
                        <td>{list.length}</td>
                        <td>{Math.round(isCompletedSum / isSignedSum * 100)}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        {/* <Responses projectTitle={project.projectTitle} /> */}
        {!responses.length ? 
            <div className={styles.caption}>진단 참여자 정보를 읽어오는 중입니다...</div> : 
            <Responses list={list} handleDownloadResult={handleDownloadResult} />}
        </div>
    )
};

export default ProjectDetail;