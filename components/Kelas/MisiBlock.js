import { useState, useEffect, useContext, memo } from "react";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextTertiary, TextSecondary } from "components/Typography/Text";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import CourseContext from "context/CourseContext";
import Loading from "components/Loading/Loading";
const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;
const CheckBoxWrapper = styled.div`
	display: flex;
	min-height: 28px;
	input[type="checkbox"] {
		width: 20px !important;
		height: 20px !important;
		-webkit-appearance: none;
		-moz-appearance: none;
		-o-appearance: none;
		appearance: none;
		position: static;
		outline: none;
		box-shadow: none;
		background: #dbdbdb;
		border-radius: 4px;
	}

	input[type="checkbox"]:checked {
		background: #${(props) => (props.done ? `7e8298` : `171b2d`)};
	}

	input[type="checkbox"]:checked:after {
		content: "✓";
		font-size: 16px;
		line-height: 1rem;
		padding-left: 5px;
		padding-top: 2px;
		color: #fff;
	}
`;
const OuterContainer = styled.div`
	min-height: 140px;
`;

const SaveBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 8px 24px;

	width: 116px;
`;

const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 12px;
`;

const MisiBlock = ({
	finishedWatching,
	loading,
	setMissionIdsToAPI,
	setMissionHook,
	missions,
}) => {
	const [missionIds, setMissionIds] = useState([]);
	const [alreadySetIds, setAlreadySetIds] = useState([]);
	const [lM, setLM] = useState(missions);
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

	const [loadingSave, setLoadingSave] = useState(false);
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
		console.log(missions);
		setMissionIds(ary);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
							{lM.map((m, ix) => (
								<div
									key={m.id}
									className="d-flex align-items-center dada mb-1"
									style={{ paddingLeft: "4px" }}
								>
									<CheckBoxWrapper
										done={
											alreadySetIds.includes(m.id) ||
											persistedMissionIds.includes(m.id) ||
											missionIdsDoneFromAPI.includes(m.id)
										}
										className="mr-2"
									>
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
											// checked={checkedState[ix]}
											onClick={() => {
												if (
													!alreadySetIds.includes(m.id) &&
													!persistedMissionIds.includes(m.id) &&
													!missionIdsDoneFromAPI.includes(m.id)
												) {
													setLM(
														[...lM].map((object) => {
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
										{/* 
										<Form.Check type="checkbox">
											<Form.Check.Input
												type="checkbox"
												name={m.id}
												checked={m.completed}
												onClick={() => {
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
											/>
										</Form.Check> */}
									</CheckBoxWrapper>

									<TextSecondary>{m.text}</TextSecondary>
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
											console.log(missionIds);
										}
									}}
								>
									<StyledHeadingXXS as="p">Simpan</StyledHeadingXXS>
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
