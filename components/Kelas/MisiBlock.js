import { useState, useEffect } from "react";
import { HeadingXS, HeadingXXS } from "components/Typography/Headings";
import { TextTertiary, TextSecondary } from "components/Typography/Text";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
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
		outline: none;
		box-shadow: none;
		background: #dbdbdb;
		border-radius: 4px;
	}

	input[type="checkbox"]:checked {
		background: #171b2d;
	}

	input[type="checkbox"]:checked:after {
		content: "✓";
		position: absolute;
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

const EnrollBtn = styled(Button)`
	border-radius: 40px;
	border: none;
	padding: 8px 24px;

	width: 116px;
`;

const StyledHeadingXXS = styled(HeadingXXS)`
	font-size: 12px;
`;

export default function MisiBlock({ finishedWatching, missions, loading }) {
	const [missionsState, setMissionsState] = useState(missions);
	useEffect(() => {
		setMissionsState(missions);
	}, [missions]);
	return (
		<OuterContainer>
			{finishedWatching ? (
				<div className="d-flex flex-column align-items-center">
					<HeadingXS as="p" className="text-primary1 mb-1">
						Misi Video Ini
					</HeadingXS>
					<TextTertiary className="text-gray mb-3">
						Jalankan (centang dan simpan) misi-misi dibawah ini untuk
						melanjutkan ke video selanjutnya.
					</TextTertiary>
					{loading ? (
						<TextSecondary>Menunggu...</TextSecondary>
					) : (
						<div className="d-flex flex-column ">
							{missionsState.map((m) => (
								<div key={m.id} className="d-flex align-items-center mb-1">
									<CheckBoxWrapper className="mr-2">
										<Form.Check type="checkbox">
											<Form.Check.Input
												type="checkbox"
												name={m.id}
												checked={m.completed}
												onClick={() => {
													setMissionsState(
														[...missionsState].map((object) => {
															if (object.id === m.id) {
																return {
																	...object,
																	completed: !m.completed,
																};
															} else return object;
														})
													);
												}}
												onChange={(e) => {}}
											/>
										</Form.Check>
									</CheckBoxWrapper>
									<TextSecondary>{m.text}</TextSecondary>
								</div>
							))}
							<EnrollBtn
								className="bg-primary1 mt-3 align-self-center"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<StyledHeadingXXS as="p">Simpan</StyledHeadingXXS>
							</EnrollBtn>
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
}
