import { Fragment, useContext, useEffect, useState } from 'react';
import { MdCancel, MdModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetTeachers } from '../../api/school';
import { apiCreateUsers, apiDeleteUser } from '../../api/schoolAdmin';
import Btn from '../../common/Btn';
import IconBtn from '../../common/IconBtn';
import Container from '../../components/admin/Container';
import TIContainer from '../../components/admin/TopInputContainer';
import TITitle from '../../components/admin/TopInputTitle';
import TIWrapper from '../../components/admin/TopInputWrapper';
import UserForm from '../../components/admin/UserForm';
import FormInput from '../../components/auth/FormInput';
import PageTitle from '../../components/PageTitle';
import MediumTel from '../../components/table/MTel';
import SmallTel from '../../components/table/STel';
import Table from '../../components/table/Table';
import Tbody from '../../components/table/Tbody';
import Tel from '../../components/table/Tel';
import UserContext from '../../context/user';
import routes from '../../routes';

const SLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

interface Classroom {
	id: number;
	classGrade: number;
	classNum: number;
	school: number;
}

interface School {
	id: number;
	name: string;
	abbreviation: string;
}

interface User {
	id: number;
	username?: string;
	firstName?: string;
	status?: string;
	email?: string;
	phone?: string;
}

interface Teacher {
	classroom?: Classroom;
	school?: School;
	user: User;
}

function TeacherManager() {
	const { schoolId } = useContext(UserContext);
	const [teachers, setTeachers] = useState([] as Teacher[]);
	const [editTarget, setEditTarget] = useState({} as Teacher);
	const [editMode, setEditMode] = useState(false);

	const getTeachers = () => {
		apiGetTeachers(schoolId).then(res => {
			setTeachers(res.data);
		});
	};

	const deleteTeacher = async (teacherId: string) => {
		await apiDeleteUser(teacherId);
		getTeachers();
	};

	const createTeachers = async () => {
		const count = document.getElementById('count') as HTMLInputElement;

		await apiCreateUsers({
			studentCreationCountList: {},
			teacherCreationCount: parseInt(count.value, 10),
		});
		getTeachers();
	};

	useEffect(() => {
		if (schoolId) {
			getTeachers();
		}
	}, [schoolId]);

	useEffect(() => {
		setEditMode(false);
		setEditTarget({} as Teacher);
	}, [teachers]);

	return (
		<Container>
			<PageTitle title='?????? ??????' />
			<TIContainer>
				<TIWrapper>
					<TITitle>?????? ??????</TITitle>
					<FormInput>
						<input type='text' id='count' placeholder='?????? ???' />
					</FormInput>
					<Btn onClick={() => createTeachers()}>??????</Btn>
				</TIWrapper>
			</TIContainer>
			<Table>
				<Tbody>
					<SmallTel value='??????' />
					<SmallTel value='???' />
					<MediumTel value='?????????' />
					<MediumTel value='??????' />
					<Tel value='?????????' />
					<Tel value='????????????' />
				</Tbody>
				{teachers.map(e => (
					<Fragment key={e.user.id}>
						<Tbody>
							<SmallTel value={e?.classroom?.classGrade || '-'} />
							<SmallTel value={e?.classroom?.classNum || '-'} />
							<MediumTel value={e.user?.username || '-'} />
							<SLink to={`${routes.profile}/${e.user.id}`}>
								<MediumTel value={e.user?.firstName || '-'} />
							</SLink>
							<Tel value={e.user?.email || '-'} />
							<Tel value={e.user?.phone || '-'} />
							<IconBtn
								onClick={() => {
									setEditTarget(e);
									setEditMode(true);
								}}
							>
								<MdModeEdit />
							</IconBtn>
							<IconBtn onClick={() => deleteTeacher(e.user.id.toString())}>
								<MdCancel />
							</IconBtn>
						</Tbody>
						{editTarget === e && editMode && (
							<UserForm targetUser={e} getUsers={getTeachers} />
						)}
					</Fragment>
				))}
			</Table>
		</Container>
	);
}

export default TeacherManager;
