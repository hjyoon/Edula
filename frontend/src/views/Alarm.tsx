import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	apiDeleteNotification,
	apiGetNotificationCnt,
	apiGetNotifications,
	apiGetTotalNotificationCnt,
	apiPatchNotification,
} from '../api/notice';
import StyledDeleteBtn from '../components/friend/StyledDeleteBtn';
import routes from '../routes';
import Pagination from '../components/class/ArticlePagination';
import PageTitle from '../components/PageTitle';

const StyledUpContainer = styled.div`
	margin: 0px 0px 0px 10em;
`;
const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
	margin: 1em 1em;
	color: ${props => props.theme.fontColor};
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${props => props.theme.fontColor};
	font-size: 1.5em;
`;

const ReadNotification = styled.span`
	opacity: 0.5;
`;

const StyleReadBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.subBgColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
	font-size: 1rem;
`;
const StyledDelBtn = styled(StyledDeleteBtn)`
	background: ${props => props.theme.pointColor};
	color: ${props => props.theme.fontColor};
	box-shadow: 0 1px 3px black;
	font-size: 1rem;
`;
interface NotificationDataType {
	id: number;
	fromUser: {
		id: number;
		username: string;
		firstName: string;
		status: string;
	};
	lecture: {
		id: number;
		name: string;
		shcool: string;
	};
	name: string;
	timeList: string;
	shcool: string;
	studentList: number[];
	notificationType: string;
	content: string;
	read: boolean;
}

function Alarm() {
	const [totalCnt, setTotalCnt] = useState(0);
	const [unreadCnt, setUnreadCnt] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const [notifications, setNotifications] = useState(
		[] as Array<NotificationDataType>
	);

	const getNotifications = () => {
		apiGetNotifications(page.toString(), limit.toString())
			.then(res => {
				setNotifications(res.data?.notifications);
				setTotal(res.data?.totalCount);
			})
			.catch(() => {});
	};
	useEffect(() => {
		getNotifications();
	}, [page, limit]);

	const getTotalCnt = () => {
		apiGetTotalNotificationCnt().then(res => {
			setTotalCnt(res.data.count);
		});
	};

	const getUnreadCnt = () => {
		apiGetNotificationCnt().then(res => {
			setUnreadCnt(res.data.count);
		});
	};

	useEffect(() => {
		getTotalCnt();
		getUnreadCnt();
	}, []);

	return (
		<StyledUpContainer>
			<PageTitle title={`${unreadCnt}?????? ????????? ????????????`} />
			<StyledTitle>??? ??????</StyledTitle>
			<p>
				??? ?????? ??????: {unreadCnt}/ ?????? ??????: {totalCnt}
			</p>

			{notifications.length !== 0 && (
				<>
					<label htmlFor='limit'>
						????????? ??? ????????? ?????? ???:&nbsp;
						<select
							value={limit}
							onChange={({ target: { value } }) => setLimit(Number(value))}
						>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='12'>12</option>
							<option value='20'>20</option>
						</select>
					</label>
					<StyleReadBtn
						onClick={e => {
							e.preventDefault();

							try {
								apiPatchNotification('0');
								window.location.reload();
							} catch (error) {
								// console.log(error);
							}
						}}
					>
						?????? ??????
					</StyleReadBtn>
					<StyledDelBtn
						onClick={e => {
							e.preventDefault();

							try {
								apiDeleteNotification('0');
								window.location.reload();
							} catch (error) {
								// console.log(error);
							}
						}}
					>
						?????? ??????
					</StyledDelBtn>
				</>
			)}

			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'FQ')
					.map(noti => (
						<StyledLink key={noti.id} to={routes.friend}>
							{noti.content === null && noti.read && (
								<p>
									<ReadNotification>
										{noti.fromUser?.username}({noti.fromUser?.firstName || '?????? ??????'}
										)?????? ?????? ????????? ????????????! ????
									</ReadNotification>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
							{noti.content === null && !noti.read && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName || '?????? ??????'}
									)?????? ?????? ????????? ????????????! ????
									<StyleReadBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiPatchNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyleReadBtn>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
							{noti.content === 'AC' && noti.read && (
								<p>
									<ReadNotification>
										{noti.fromUser?.username}({noti.fromUser?.firstName || '?????? ??????'}
										)???(???) ?????? ????????? ???????????????! ????
									</ReadNotification>

									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
							{noti.content === 'AC' && !noti.read && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName || '?????? ??????'}
									)???(???) ?????? ????????? ???????????????! ????
									<StyleReadBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiPatchNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyleReadBtn>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
							{noti.content === 'RF' && noti.read && (
								<p>
									<ReadNotification>
										{noti.fromUser?.username}({noti.fromUser?.firstName || '?????? ??????'}
										)???(???) ?????? ????????? ???????????????. ????
									</ReadNotification>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
							{noti.content === 'RF' && !noti.read && (
								<p>
									{noti.fromUser?.username}({noti.fromUser?.firstName || '?????? ??????'}
									)???(???) ?????? ????????? ???????????????. ????
									<StyleReadBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiPatchNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyleReadBtn>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
						</StyledLink>
					))}
			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HC')
					.map(noti => (
						<StyledLink to={`/lecture/${noti.lecture?.id}`} key={noti.id}>
							{noti.read && (
								<p>
									<ReadNotification>
										{noti.lecture?.name}????????? {noti.content} ?????? ????????? ???????????????!
									</ReadNotification>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
							{!noti.read && (
								<p>
									{noti.lecture?.name}????????? {noti.content} ?????? ????????? ???????????????!
									<StyleReadBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiPatchNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyleReadBtn>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
						</StyledLink>
					))}
			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HU')
					.map(noti => (
						<StyledLink to={`/lecture/${noti.lecture?.id}`} key={noti.id}>
							{noti.read && (
								<p>
									<ReadNotification>
										{noti.lecture?.name}????????? {noti.content} ????????? ??????????????????!
									</ReadNotification>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
							{!noti.read && (
								<p>
									{noti.lecture?.name}????????? {noti.content} ????????? ??????????????????!
									<StyleReadBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiPatchNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyleReadBtn>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
						</StyledLink>
					))}
			{notifications &&
				notifications
					.filter(notification => notification.notificationType === 'HS')
					.map(noti => (
						<StyledLink to={`/lecture/${noti.lecture?.id}`} key={noti.id}>
							{noti.read && (
								<p>
									<ReadNotification>
										{noti.lecture?.name} ????????? {noti.fromUser?.username}(
										{noti.fromUser?.firstName || '?????? ??????'})???(???) {noti.content}
										????????? ???????????????!
									</ReadNotification>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
							{!noti.read && (
								<p>
									{noti.lecture?.name} ????????? {noti.fromUser?.username}(
									{noti.fromUser?.firstName || '?????? ??????'})???(???) {noti.content}
									????????? ???????????????!
									<StyleReadBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiPatchNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyleReadBtn>
									<StyledDelBtn
										onClick={e => {
											e.preventDefault();

											try {
												apiDeleteNotification(noti.id.toString());
												window.location.reload();
											} catch (error) {
												// console.log(error);
											}
										}}
									>
										??????
									</StyledDelBtn>
								</p>
							)}
						</StyledLink>
					))}
			{notifications.length === 0 && (
				<StyledTitle>????????? ????????? ?????????~</StyledTitle>
			)}

			{notifications.length !== 0 && (
				<footer>
					<Pagination total={total} limit={limit} page={page} setPage={setPage} />
				</footer>
			)}
		</StyledUpContainer>
	);
}

export default Alarm;
