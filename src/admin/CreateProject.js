import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './CreateProject.module.css';
import axios from 'axios';
import XLSX from 'xlsx';

function CreateProject() {
    const history = useHistory();

    const [projectTitle, setProjectTitle] = useState('');
    const [company, setCompany] = useState('');
    const [managerName, setManagerName] = useState('');
    const [managerEmail, setManagerEmail] = useState('');
    const [managerMobile, setManagerMobile] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [questions, setQuestions] = useState(null);

    const handleSubmit = async () => {
        await axios.post('http://localhost:4000/project/create', {
            projectTitle: projectTitle,
            company: company,
            managerName: managerName,
            managerEmail: managerEmail,
            managerMobile: managerMobile,
            startDate: startDate,
            finishDate: finishDate,
            userInfo: userInfo,
            questions: questions
        })
        .then((res) => {
            console.log(res.data);
            history.push('/admin');
        })
        .catch((err) => {
            alert(err);
            console.log(err);
        });
    }

    const onChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log('inputName:', inputName, 'inputValue', inputValue);
        switch (inputName) {
            case 'projectTitle' : setProjectTitle(inputValue);
            break;
            case 'company' : setCompany(inputValue);
            break;
            case 'managerName' : setManagerName(inputValue);
            break;
            case 'managerEmail' : setManagerEmail(inputValue);
            break;
            case 'managerMobile' : setManagerMobile(inputValue);
            break;
            case 'startDate' : setStartDate(inputValue);
            break;
            case 'finishDate' : setFinishDate(inputValue);
        }
    }

    const handleExcelFile = (event) => {
        const inputName = event.target.name;
        const fileList = event.target.files;
        const file = fileList[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const table = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(table);
            console.log('엑셀 데이터', json);
            switch (inputName) {
                case 'userInfo' : setUserInfo(json);
                break;
                case 'questions' : setQuestions(json);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    }

    return <>
        <Link to='/admin'>
            <button>리스트로 돌아가기</button>
        </Link>
        <h3>프로젝트 등록</h3>
        <form onSubmit={onSubmit} className={styles.createForm}>
            <div>
                <label>프로젝트명</label>
                    <input 
                        name="projectTitle" 
                        type="text" 
                        required 
                        value={projectTitle} 
                        onChange={onChange} />
                    
                </div>
            <div>
                <label>기업명</label> 
                    <input 
                        name="company" 
                        type="text" 
                        required 
                        value={company} 
                        onChange={onChange} />
                
            </div>
            <div>
                <label>담당자 이름</label> 
                    <input 
                        name="managerName" 
                        type="text" 
                        required 
                        value={managerName} 
                        onChange={onChange} />
                
            </div>
            <div>
                <label className={styles.label}>담당자 이메일</label> 
                    <input 
                        name="managerEmail" 
                        type="email" 
                        required 
                        value={managerEmail} 
                        onChange={onChange} />
                
            </div>
            <div>
                <label className={styles.label}>담당자 연락처</label>
                    <input 
                        name="managerMobile" 
                        type="tel" 
                        required 
                        value={managerMobile} 
                        onChange={onChange} />
                
            </div>
            <div>
                <label className={styles.label}>시작일</label> 
                    <input 
                        name="startDate" 
                        type="date" 
                        required 
                        value={startDate} 
                        onChange={onChange} />
                
            </div>
            <div>
                <label className={styles.label}>완료일</label>
                    <input 
                        name="finishDate" 
                        type="date" 
                        required 
                        value={finishDate} 
                        onChange={onChange} />
                
            </div>
            <div>
                <label className={styles.label}>진단 참여자 명단</label>  
                    <input 
                        name="userInfo" 
                        type="file" 
                        required 
                        accept=".xlsx"
                        onChange={handleExcelFile} />
                
            </div>
            <div>
                <label>진단 문항</label>
                    <input 
                        name="questions" 
                        type="file" 
                        accept=".xlsx"
                        required 
                        onChange={handleExcelFile} />
                
            </div>
            <div>
                <button>등록하기</button>
            </div>
        </form>
        </>
}

export default CreateProject;