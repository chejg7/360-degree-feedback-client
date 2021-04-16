import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './Survey.module.css';

function Question (props) {
    const { survey, questions } = props;
    const splitedQuestions = questions.filter(question => question['진단명'] === survey);
    console.log(splitedQuestions);

    const handleRadio = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        const nameArr = event.target.name.split(',');
        props.handleClickRadio({
            survey: survey,
            num: nameArr[0],
            category: nameArr[1],
            question: nameArr[2],
            response: event.target.value
        })
    }

    return <div>
        <h3>{survey}</h3>
        {splitedQuestions.map((question) => 
            <form className={styles.form}>
                <div className={styles.text}>
                    <span>{question['번호']}. </span>
                    <span>{question['문항']}</span>
                </div>
                <div className={styles.radioGroup}>
                    <div className={styles.radio}>
                        <input 
                            type='radio'
                            name={[question['번호'], question['카테고리'], question['문항']]}
                            value='1'
                            onClick={handleRadio}
                        />
                        <div>전혀 그렇지 않다</div>
                    </div>
                    <div className={styles.radio}>
                        <input 
                            type='radio'
                            name={[question['번호'], question['카테고리'], question['문항']]}
                            value='2'
                            onClick={handleRadio}
                        />
                        <div>그렇지 않다</div>
                    </div>
                    <div className={styles.radio}>
                        <input 
                            type='radio'
                            name={[question['번호'], question['카테고리'], question['문항']]}
                            value='3'
                            onClick={handleRadio}
                        />
                        <div>약간 그렇지 않다</div>
                    </div>
                    <div className={styles.radio}>
                        <input 
                            type='radio'
                            name={[question['번호'], question['카테고리'], question['문항']]}
                            value='4'
                            onClick={handleRadio}
                        />
                        <div>약간 그렇다</div>
                    </div>
                    <div className={styles.radio}>
                        <input 
                            type='radio'
                            name={[question['번호'], question['카테고리'], question['문항']]}
                            value='5'
                            onClick={handleRadio}
                        />
                        <div>그렇다</div>
                    </div>
                    <div className={styles.radio}>
                        <input 
                            type='radio'
                            name={[question['번호'], question['카테고리'], question['문항']]}
                            value='6'
                            onClick={handleRadio}
                        />
                        <div>매우 그렇다</div>
                    </div>
                </div>
            </form>
        )}
    </div>
}

function Survey (props) {
    const [response, setResponse] = useState([]);
    const history = useHistory();
    const { evaluated, questions } = props.location.state;
    console.log('대상자', evaluated);
    console.log('질문', questions);

    const surveyTitle = evaluated.surveyTitle.split('+')
    console.log('진단', surveyTitle);
    

    const handleClickBack = () => {
        history.goBack();
    }

    const handleSubmit = async () => {
        const fullQuestions = [];
        for (let survey of surveyTitle) {
            for (let question of questions) {
                if (survey === question['진단명']) fullQuestions.push(question);
            }
        }
        if (fullQuestions.length === response.length) {
            await axios.post(process.env.REACT_APP_URL + '/users/response', {
                evaluated: evaluated, 
                data: response
            })
            .then((res) => {
                console.log(res.data);
                history.goBack();
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            });
        } else {
            alert('모든 문항에 답변해 주시길 바랍니다')
        }
    }

    const handleClickRadio = (data) => {
        console.log('서베이로 넘어온 데이터', data);
        setResponse([...response, data]);
        console.log('상태값', response);
    }

    return <div className={styles.container}>
        {/* <button onClick={handleClickBack}>Back</button> */}
        <h3>진단 대상자 : {evaluated.evaluatedName}</h3>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>대상자 직위</th>
                    <th>대상자 본부</th>
                    <th>대상자 부서</th>
                    <th>대상자 팀</th>
                    <th>대상자와의 관계</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{evaluated.evaluatedPosition}</td>
                    <td>{evaluated.evaluatedDivision}</td>
                    <td>{evaluated.evaluatedDepartment}</td>
                    <td>{evaluated.evaluatedTeam}</td>
                    <td>{evaluated.relationToEvaluated}</td>
                </tr>
            </tbody>
        </table>
        {surveyTitle.map((survey, idx) => 
            <Question 
                key={idx} 
                survey={survey} 
                questions={questions} 
                handleClickRadio={handleClickRadio}
            />)}
        <button onClick={handleSubmit}>답변 등록하기</button>
    </div>
}

export default Survey;