import { HeadingXS } from "components/Typography/Headings";
import { TextTertiary, TextSecondary } from "components/Typography/Text";
import { Form } from "react-bootstrap";
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
export default function MisiBlock({ finishedWatching, missions }) {
	return (
		<OuterContainer>
			{finishedWatching ? (
				<div className="d-flex flex-column">
					<HeadingXS as="p" className="text-primary1 mb-3">
						Misi Video Ini:
					</HeadingXS>
					{missions.map((m) => (
						<div key={m.id} className="d-flex align-items-center mb-1">
							<CheckBoxWrapper className="mr-2">
								<Form.Check type="checkbox">
									<Form.Check.Input
										type="checkbox"
										name="allCategories"
										onChange={(e) => {}}
										value="allCategories"
									/>
								</Form.Check>
							</CheckBoxWrapper>
							<TextSecondary>{m.text}</TextSecondary>
						</div>
					))}
				</div>
			) : (
				<StyledTextTertiary className="text-primary1 ">
					Misi akan terbuka setelah kamu selesai menonton video ini
				</StyledTextTertiary>
			)}
		</OuterContainer>
	);
}
