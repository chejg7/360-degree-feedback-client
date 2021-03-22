import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CreateProject() {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [managerName, setManagerName] = useState('');
    const [managerEmail, setManagerEmail] = useState('');
    const [managerTel, setManagerTel] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);

    const handleSubmit = async () => {
        await axios.post('http://localhost:4000/createproject', {
            title: title,
            company: company,
            managerName: managerName,
            managerEmail: managerEmail,
            managerTel: managerTel,
            startDate: startDate,
            finishDate: finishDate
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => alert(err));
    }

    const onChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        switch (inputName) {
            case 'title' : setTitle(inputValue);
            case 'company' : setCompany(inputValue);
            case 'managerName' : setManagerName(inputValue);
            case 'managerEmail' : setManagerEmail(inputValue);
            case 'managerTel' : setManagerTel(inputValue);
            case 'startDate' : setStartDate(inputValue);
            case 'finishDate' : setFinishDate(inputValue);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    }

    return <>
        <h3>프로젝트 등록</h3>
        <form onSubmit={onSubmit}>
            <div>
                <label>프로젝트명 : 
                    <input 
                        name="title" 
                        type="text" 
                        required 
                        value={title} 
                        onChange={onChange} />
                    </label>
                </div>
            <div>
                <label>기업명 : 
                    <input 
                        name="company" 
                        type="text" 
                        required 
                        value={company} 
                        onChange={onChange} />
                </label>
            </div>
            <div>
                <label>담당자 이름 : 
                    <input 
                        name="managerName" 
                        type="text" 
                        required 
                        value={managerName} 
                        onChange={onChange} />
                </label>
            </div>
            <div>
                <label>담당자 이메일 : 
                    <input 
                        name="managerEmail" 
                        type="email" 
                        required 
                        value={managerEmail} 
                        onChange={onChange} />
                </label>
            </div>
            <div>
                <label>담당자 연락처 : 
                    <input 
                        name="managerTel" 
                        type="tel" 
                        required 
                        value={managerTel} 
                        onChange={onChange} />
                </label>
            </div>
            <div>
                <label>시작일 : 
                    <input 
                        name="startDate" 
                        type="date" 
                        required 
                        value={startDate} 
                        onChange={onChange} />
                </label>
            </div>
            <div>
                <label>완료일 : 
                    <input 
                        name="finishDate" 
                        type="date" 
                        required 
                        value={finishDate} 
                        onChange={onChange} />
                </label>
            </div>
            <div>
                <input type="submit" value="등록하기"/>
            </div>
        </form>
        </>
}

export default CreateProject;