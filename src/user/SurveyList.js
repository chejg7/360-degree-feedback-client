import React from 'react';
import styles from './SurveyList.module.css';

function SurveyItem ({survey}) {
    return <tr>
        <td>{survey.evaluatedName}</td>
        <td>{survey.evaluatedPosition}</td>
        <td>{survey.evaluatedDivision}</td>
        <td>{survey.evaluatedDepartment}</td>
        <td>{survey.evaluatedTeam}</td>
        <td>{survey.response ? survey.updatedAt : '미완료'}</td>
        <td>{survey.response ? 
            <button>다시하기</button>
            : <button>진단하기</button>}
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
                    {project.evaluatedInfo.map((survey, idx) => (
                        <SurveyItem key={idx} survey={survey} />
                    ))}
                </tbody>
            </table>
        </div>)}
    </div>
}

export default SurveyList;