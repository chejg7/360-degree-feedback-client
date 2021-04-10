import React from 'react';
import { Route, Link, useHistory, BrowserRouter as Router} from 'react-router-dom';
import styles from './SurveyList.module.css';

function SurveyItem (props) {
    const history = useHistory();
    const evaluated = props.evaluated;
    const questions = props.questions;

    const handleClick = () => {
        history.push({
            pathname: '/user/survey',
            state: { 
                evaluated: evaluated,
                questions: questions
            }
        })
    }

    return <tr>
        <td>{evaluated.evaluatedName}</td>
        <td>{evaluated.evaluatedPosition}</td>
        <td>{evaluated.evaluatedDivision}</td>
        <td>{evaluated.evaluatedDepartment}</td>
        <td>{evaluated.evaluatedTeam}</td>
        <td>{evaluated.response ? evaluated.updatedAt : '미완료'}</td>
        {/* <td>{evaluated.response ? 
            <button>다시하기</button>
            : <button>진단하기</button>}
        </td> */}
        <td><button onClick={handleClick}>
                {evaluated.response ? '다시하기' : '진단하기'}
            </button>
        </td>
    </tr>
}

function SurveyList ({projects}) {
    console.log('서베이리스트 컴포넌트로 넘어온 데이터', projects);

    return <div>
        {projects.map((project) => <div>
            <h4>{project.projectTitle}</h4>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>대상자</th>
                        <th>직위</th>
                        <th>본부</th>
                        <th>부서</th>
                        <th>팀</th>
                        <th>완료시간</th>
                        <th>기능</th>
                    </tr>
                </thead>
                <tbody>
                    {project.evaluatedInfo.map((evaluated, idx) => (
                        <SurveyItem 
                            key={idx} 
                            evaluated={evaluated} 
                            questions={project.questions}
                        />
                    ))}
                </tbody>
            </table>
        </div>)}
    </div>
}

export default SurveyList;