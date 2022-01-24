import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Wrapper = styled.div`
	max-width: 300px;
	width: 100%;
	padding: 10px;
	background-color: ${props => props.theme.subBgColor};
	border-radius: 3px;
`;

type PropType = {
	children: ReactNode;
};

function AuthLayout({ children }: PropType) {
	return (
		<Container>
			<Wrapper>{children}</Wrapper>
		</Container>
	);
}

export default AuthLayout;
