import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Survey.module.css';

function Question (props) {
    const { survey, questionsObj } = props;

    return <div>
        <h5>{survey}</h5>
    </div>
}

function Survey (props) {
    const history = useHistory();
    const { evaluated, questions } = props.location.state;
    console.log('대상자', evaluated);
    console.log('질문', questions);

    const surveyTitle = evaluated.surveyTitle.split('+')
    console.log('진단', surveyTitle);
    const questionsObj = {};
    for (let question of questions) {
        
    }

    const handleClick = () => {
        history.goBack();
    }

    return <div>
        <h3>Survey</h3>
        <button onClick={handleClick}>리스트로 돌아가기</button>
        <h5>진단 대상자 : {evaluated.evaluatedName}</h5>
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
            <Question key={idx} survey={survey} questionsObj={questionsObj} />)}
    </div>
}

export default Survey;