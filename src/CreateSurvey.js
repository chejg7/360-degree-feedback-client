import React, { useState } from 'react';

function CreateSurvey() {
    const [title, setTitle] = useState('');

    const onChange = (event) => {
        setTitle(event.target.value);
    }

    return <>
        <h3>진단 등록</h3>
        <div>
            <label>
                진단명 : 
            <input name='title' type='text' required value={title} onChange={onChange} />
            </label>
        </div>
        <div>
            <p>진단 문항이 포함된 엑셀 파일을 업로드할 수 있습니다</p>
            <button>파일 업로드</button>
        </div>
        <div>
            <p>기존의 진단을 복사한 뒤 수정할 수 있습니다</p>
            <button>진단 복사</button>
        </div>
        <div>
            <p>개별 문항을 직접 입력하여 진단을 생성하실 수 있습니다</p>
            <button>문항 추가</button>
        </div>
        <div>
            <p>최종적으로 진단을 등록합니다</p>
            <button>진단 생성</button>
        </div>
    </>
}

export default CreateSurvey;