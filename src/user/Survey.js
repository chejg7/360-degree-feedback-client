import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Survey.module.css';

function Question (props) {
    const { survey, questions } = props;
    const splitedQuestions = questions.filter(question => question['진단명'] === survey);
    console.log(splitedQuestions);
    return <div>
        <h5>{survey}</h5>
        {splitedQuestions.map((question) => 
            <div>
                <div>
                    <span>{question['번호']}. </span>
                    <span>{question['문항']}</span>
                </div>
                <div>
                    <input 
                        type='radio'
                        name='radio'
                        value='1'
                    />
                    <div>전혀 그렇지 않다</div>
                </div>
                <div>
                    <input 
                        type='radio'
                        name='radio'
                        value='2'
                    />
                    <div>전혀 그렇지 않다</div>
                </div>
                <div>
                    <input 
                        type='radio'
                        name='radio'
                        value='3'
                    />
                    <div>전혀 그렇지 않다</div>
                </div>
                <div>
                    <input 
                        type='radio'
                        name='radio'
                        value='4'
                    />
                    <div>전혀 그렇지 않다</div>
                </div>
                <div>
                    <input 
                        type='radio'
                        name='radio'
                        value='5'
                    />
                    <div>전혀 그렇지 않다</div>
                </div>
                <div>
                    <input 
                        type='radio'
                        name='radio'
                        value='6'
                    />
                    <div>전혀 그렇지 않다</div>
                </div>
            </div>
            
        )}
    </div>
}

function Survey (props) {
    const history = useHistory();
    const { evaluated, questions } = props.location.state;
    console.log('대상자', evaluated);
    console.log('질문', questions);

    const surveyTitle = evaluated.surveyTitle.split('+')
    console.log('진단', surveyTitle);
    

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
            <Question key={idx} survey={survey} questions={questions} />)}
    </div>
}

export default Survey;