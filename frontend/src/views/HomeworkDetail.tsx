import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledTitle from '../components/class/StyledTitle';
import StyledContent from '../components/class/StyledContent';
import StyledButton from '../components/class/StyledButton';
import { apiDeleteHomework, apiGetHomeworkDetail } from '../api/homework';
import UserContext from '../context/user';
import StyledDeleteBtn from '../components/friend/StyledDeleteBtn';

const StyleUpdateBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.borderColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
`;
const StyleDeleteBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.warningColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
`;
const StyleSubmitBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.bgColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1em;
	color: ${props => props.theme.fontColor};
`;

const StyledContainer = styled.div`
	font-size: 1em;
	text-align: center;
	margin: 1em;
	background: ${props => props.theme.subBgColor};
	color: ${props => props.theme.fontColor};
	padding: 1em 1em 1em 2em;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.125);
	border-radius: 10px;
`;

interface HomeworkDataType {
	content: string;
	createdAt: string;
	deadline: string;
	id: number;
	lecture: number;
	title: string;
	writer: number;
}

function HomeworkDetail() {
	const { userStat } = useContext(UserContext);
	const { lectureId, homeworkId } = useParams();
	const navigate = useNavigate();

	const [homeworkData, setHomeworkData] = useState({} as HomeworkDataType);

	if (homeworkId && lectureId) {
		useEffect(() => {
			apiGetHomeworkDetail(lectureId, homeworkId).then(res => {
				setHomeworkData(res.data);
			});
		}, []);
	}

	// 글쓴이 본인인지 확인해서 삭제, 수정 버튼 보이도록. 삭제 함수 따로 위로 빼기

	return (
		<StyledContainer>
			<StyledTitle>{homeworkData.title}</StyledTitle>
			<StyledContent>
				마감 기한: {homeworkData.deadline?.slice(0, 10)}{' '}
				{homeworkData.deadline?.slice(11)}
			</StyledContent>
			<StyledContent>{homeworkData.content}</StyledContent>
			{userStat === 'TE' && (
				<span>
					<StyledLink to={`/${lectureId}/homeworkUpdate/${homeworkId}`}>
						<StyleUpdateBtn>수정</StyleUpdateBtn>
					</StyledLink>
					<StyleDeleteBtn
						type='button'
						value='삭제'
						onClick={e => {
							e.preventDefault();
							if (lectureId && homeworkId) {
								try {
									apiDeleteHomework(lectureId, homeworkId)
										.then(() => {})
										.catch(() => {});

									navigate(`/lecture/${lectureId}`);
								} catch (error) {
									// console.log(error);
								}
							}
						}}
					>
						삭제
					</StyleDeleteBtn>
				</span>
			)}
			<StyledLink to={`/${lectureId}/homework/${homeworkId}/submit`}>
				<StyleSubmitBtn>과제 제출</StyleSubmitBtn>
			</StyledLink>
		</StyledContainer>
	);
}

export default HomeworkDetail;
