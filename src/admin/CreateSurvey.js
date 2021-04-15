import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import XLSX from 'xlsx';

function CreateSurvey() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState('');

    const handleSubmit = async () => {
        await axios.post(process.env.REACT_APP_URL + '/createsurvey', {
            title: title,
            questions: questions
        })
        .then((res) => {
            console.log(res.data);
            history.push('/admin');
        })
        .catch((err) => alert(err));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    }

    const onChange = (event) => {
        setTitle(event.target.value);
        console.log(title);
    }

    const handleExcelFile = (event) => {
        const fileList = event.target.files;
        const file = fileList[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const table = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(table);
            console.log('엑셀 데이터 json', json);
            setQuestions(json);
        };
        reader.readAsArrayBuffer(file);
    }

    return <>
        <h3>진단 등록</h3>
        <div>
            <label>
                진단명 : 
                <input
                    name='title' 
                    type='text' 
                    required 
                    value={title} 
                    onChange={onChange} />
            </label>
        </div>
        <div>
            <p>진단 문항이 포함된 엑셀 파일을 업로드할 수 있습니다</p>
            <label>
                진단 파일 : 
                <input 
                    name="questions" 
                    type="file" 
                    accept=".xlsx"
                    required 
                    onChange={handleExcelFile} />
            </label>
        </div>
        {/* <div>
            <p>기존의 진단을 복사한 뒤 수정할 수 있습니다</p>
            <button>진단 복사</button>
        </div>
        <div>
            <p>개별 문항을 직접 입력하여 진단을 생성하실 수 있습니다</p>
            <button>문항 추가</button>
        </div> */}
        <div>
            <p>최종적으로 진단을 등록합니다</p>
            <button onSubmit={onSubmit}>진단 생성</button>
        </div>
    </>
}

export default CreateSurvey;