import { AxiosError } from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import {
	apiPutAdminInfo,
	apiPutStudentInfo,
	apiPutTeacherInfo,
} from '../../api/user';
import Btn from '../../common/Btn';
import UserContext from '../../context/user';
import routes from '../../routes';
import EmptyMsg from '../auth/EmptyMsg';
import ErrorMsg from '../auth/ErrorMsg';
import FormBox from '../auth/FormBox';
import FormBtn from '../auth/FormBtn';
import FormInput from '../auth/FormInput';

type EditProfileInput = {
	result: string;
	email: string;
	phoneNumber: string;
	guardianPhone?: string;
};

type PropType = {
	toggleMode: (mode: string) => void;
	changeUserData: (_: object) => void;
};

function EditProfileForm({ toggleMode, changeUserData }: PropType) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		clearErrors,
	} = useForm<EditProfileInput>({
		mode: 'all',
	});
	const { userStat, userId } = useContext(UserContext);
	const navigate = useNavigate();

	const onValidSubmit = () => {
		const values = getValues();
		const user = {
			email: values.email,
			phone: values.phoneNumber,
		};
		const guardianPhone = values.guardianPhone || '';
		try {
			switch (userStat) {
				case 'ST':
					apiPutStudentInfo(userId, user, guardianPhone);
					break;
				case 'TE':
					apiPutTeacherInfo(userId, user);
					break;
				case 'SA':
					apiPutAdminInfo(userId, user);
					break;
				default:
					break;
			}
			changeUserData({ user, guardianPhone });
			toggleMode('profile');
		} catch (e) {
			const error = e as AxiosError;
			if (error?.response?.status === 401) {
				navigate(routes.login);
			}
		}
	};

	const emailError = errors.email?.message ? (
		<ErrorMsg message={errors.email?.message} />
	) : (
		<EmptyMsg />
	);

	const phoneNumberError = errors.phoneNumber?.message ? (
		<ErrorMsg message={errors.phoneNumber?.message} />
	) : (
		<EmptyMsg />
	);

	const guardianPhoneError = errors.guardianPhone?.message ? (
		<ErrorMsg message={errors.guardianPhone?.message} />
	) : (
		<EmptyMsg />
	);

	return (
		<FormBox>
			<form onSubmit={handleSubmit(onValidSubmit)}>
				<FormInput htmlFor='email'>
					<span>
						<BiUser />
					</span>
					<input
						{...register('email', {
							pattern: {
								value: /^\w*@(\w*.\w*)$/,
								message: '????????? ????????? ???????????????.',
							},
						})}
						type='text'
						placeholder='?????????'
						onInput={() => clearErrors()}
					/>
				</FormInput>
				{emailError}
				<FormInput htmlFor='phoneNumber'>
					<span>
						<BiUser />
					</span>
					<input
						{...register('phoneNumber', {
							pattern: {
								value: /^\d*$/,
								message: '????????? ???????????????.',
							},
						})}
						type='text'
						placeholder='????????????'
						onInput={() => clearErrors()}
					/>
				</FormInput>
				{phoneNumberError}
				{userStat === 'ST' && (
					<>
						<FormInput htmlFor='guardianPhone'>
							<span>
								<BiUser />
							</span>
							<input
								{...register('guardianPhone', {
									pattern: {
										value: /^\d*$/,
										message: '????????? ???????????????.',
									},
								})}
								type='text'
								placeholder='????????? ????????????'
								onChange={() => clearErrors()}
							/>
						</FormInput>
						{guardianPhoneError}
					</>
				)}
				<FormBtn value='??????' disabled={false} />
				<Btn onClick={() => toggleMode('profile')}>??????</Btn>
			</form>
		</FormBox>
	);
}

export default EditProfileForm;
