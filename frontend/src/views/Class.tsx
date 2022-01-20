import styled from 'styled-components';
import Board from '../components/class/board';
import TopNavBar from '../components/navbar/TopNavBar';
import HomeworkViewer from '../components/class/homeworkViewer';
import Intro from '../components/class/intro';

const StyledContainer = styled.section`
	width: 1366px;
	height: 768px;
	display: grid;
	grid:
		'homework board' auto
		'. intro' 1fr
		/ auto 1fr;
	gap: 8px;
	align-content: center;
`;

const StyledHomeworkViewer = styled(HomeworkViewer)`
	grid-area: homework;
`;

const StyledBoard = styled(Board)`
	grid-area: board;
`;

const StyledIntro = styled(Intro)`
	grid-area: intro;
`;

function Class() {
	return (
		<>
			<TopNavBar />
			<StyledContainer>
				<div>g</div>
				<StyledIntro />
				<StyledHomeworkViewer />
				<StyledBoard />
			</StyledContainer>
		</>
	);
}

export default Class;