import { useState, useEffect, useContext, memo } from "react";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextTertiary, TextSecondary } from "components/Typography/Text";
import { Button } from "react-bootstrap";
import { BsCheckLg } from "react-icons/bs";
import styled from "styled-components";
import CourseContext from "context/CourseContext";
import Loading from "components/Loading/Loading";
const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
import Linkify from "react-linkify";

const CheckBoxWrapper = styled.div`
	display: flex;
	min-height: 28px;
	input[type="checkbox"] {
		width: 24px !important;
		height: 24px !important;
		appearance: none;
		position: static;
		outline: none;
		box-shadow: none;
		background: #dbdbdb;
		border-radius: 100%;
		cursor: pointer;
	}

	input[type="checkbox"]:checked {
		background: #e8e8e8;
	}
`;
const OuterContainer = styled.div`
	min-height: 140px;
`;

const SaveBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 8px 24px;

	width: 148px;
`;

const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 12px;
`;

const CheckedIcon = styled(BsCheckLg)`
	position: absolute;
	left: 6px;
	width: 22px;
	height: 22px;
	pointer-events: none;
	color: ${(props) => (props.done ? `#798989` : `#0AC7CE`)};
`;

const MisiBlock = ({
	finishedWatching,
	loading,
	setMissionIdsToAPI,
	setMissionHook,
}) => {
	const [missionIds, setMissionIds] = useState([]);
	const [alreadySetIds, setAlreadySetIds] = useState([]);

	const {
		missionsCtx,
		setMissionsCtx,
		missionsCompleted,
		setPersistedMissionIds,
		persistedMissionIds,
		missionIdsDoneFromAPI,
		missionSaveLoading,
		setMissionSaveLoading,
	} = useContext(CourseContext);

	// const [checkedState, setCheckedState] = useState(
	// 	new Array(missionsCtx.length).fill(false)
	// );
	useEffect(() => {
		let ary = [];

		missionsCtx.forEach((m) => {
			if (m.completed) {
				ary.push(m.id);
			}
		});
		setMissionIds(ary);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const missionDone = (mission) => {
		return (
			alreadySetIds.includes(mission.id) ||
			persistedMissionIds.includes(mission.id) ||
			missionIdsDoneFromAPI.includes(mission.id)
		);
	};

	return (
		<OuterContainer>
			{finishedWatching ? (
				<div className="d-flex flex-column">
					<HeadingXS as="p" className="text-primary1 mb-1">
						Misi Video Ini
					</HeadingXS>
					{(missionsCtx || missionsCtx.length === 0) && (
						<TextTertiary className="text-gray mb-3">
							Kerjakan (centang dan simpan) misi-misi dibawah ini untuk
							melanjutkan ke video selanjutnya.
						</TextTertiary>
					)}

					{loading ? (
						<Loading className="mt-4" fixed={false} />
					) : (
						<div className="d-flex flex-column ">
							{(!missionsCtx || missionsCtx.length === 0) && (
								<TextTertiary className="text-gray mb-3 text-center">
									Video ini tidak memiliki misi.
								</TextTertiary>
							)}
							{missionsCtx.map((m, _) => (
								<div key={m.id} className="d-flex align-items-center mb-2">
									<CheckBoxWrapper
										done={missionDone(m)}
										className="mr-2 position-relative"
									>
										{m.completed && <CheckedIcon done={missionDone(m)} />}
										<input
											type="checkbox"
											checked={m.completed}
											onChange={(e) => {
												const checked = e.target.checked;
												if (
													!alreadySetIds.includes(m.id) &&
													!persistedMissionIds.includes(m.id) &&
													!missionIdsDoneFromAPI.includes(m.id)
												) {
													if (checked) {
														if (!missionIds.includes(m.id)) {
															setMissionIds([...missionIds, m.id]);
														}
													} else if (!checked) {
														if (missionIds.includes(m.id)) {
															setMissionIds(
																missionIds.filter((id) => id !== m.id)
															);
														}
													}
												}
											}}
											onClick={() => {
												if (
													!alreadySetIds.includes(m.id) &&
													!persistedMissionIds.includes(m.id) &&
													!missionIdsDoneFromAPI.includes(m.id)
												) {
													setMissionsCtx(
														[...missionsCtx].map((object) => {
															if (object.id === m.id) {
																return {
																	...object,
																	completed: !m.completed,
																};
															} else return object;
														})
													);
												}
											}}
										/>
									</CheckBoxWrapper>
									<TextSecondary>
										<Linkify
											componentDecorator={(
												decoratedHref,
												decoratedText,
												key
											) => (
												<a target="blank" href={decoratedHref} key={key}>
													{decoratedText}
												</a>
											)}
										>
											{m.text}
										</Linkify>
									</TextSecondary>
								</div>
							))}

							{missionsCtx.length > 0 && !missionsCompleted && !loading && (
								<SaveBtn
									disabled={missionSaveLoading}
									className="bg-primary1 mt-3 "
									onClick={() => {
										if (!missionSaveLoading) {
											setMissionSaveLoading(true);
											setMissionIdsToAPI(missionIds);
											setAlreadySetIds(missionIds);
											setPersistedMissionIds(missionIds);
											setMissionHook(true);
										}
									}}
								>
									<StyledHeadingXXS as="p">
										{missionSaveLoading ? "Menyimpan..." : "Simpan"}
									</StyledHeadingXXS>
								</SaveBtn>
							)}
						</div>
					)}
				</div>
			) : (
				<StyledTextTertiary className="text-primary1 ">
					Misi akan terbuka setelah kamu selesai menonton video ini
				</StyledTextTertiary>
			)}
		</OuterContainer>
	);
};

export default memo(MisiBlock);
