import { HeadingXXS } from "components/Typography/Headings";
import { TextTertiary } from "components/Typography/Text";
import styled from "styled-components";
import { dateDiffInDays } from "utils/dateDiffInDays";
import Linkify from "react-linkify";

const StyledTextTertiary = styled(TextTertiary)`
	font-size: 12px;
`;

const PengumumanBlock = ({ currentCourse }) => {
	return (
		<div className="d-flex flex-column w-100">
			{currentCourse.announcement ? (
				<>
					{[...currentCourse.announcement.pengumuman].reverse().map((p) => (
						<div key={p.id} className=" mb-4">
							<HeadingXXS
								style={{ fontSize: "13px" }}
								className="text-info1 mb-2"
							>
								{currentCourse.content_creator.full_name}
							</HeadingXXS>
							<StyledTextTertiary className="text-primary1 mb-2">
								Memposting pengumuman {"-"}{" "}
								<span style={{ fontSize: "11px" }}>
									{dateDiffInDays(new Date(p.date), new Date())}
								</span>
							</StyledTextTertiary>
							<StyledTextTertiary
								className="text-primary1 mt-1"
								style={{ whiteSpace: "pre-line" }}
							>
								<Linkify
									componentDecorator={(decoratedHref, decoratedText, key) => (
										<a target="blank" href={decoratedHref} key={key}>
											{decoratedText}
										</a>
									)}
								>
									{p.text}
								</Linkify>
							</StyledTextTertiary>
							<hr />
						</div>
					))}
				</>
			) : (
				<StyledTextTertiary className="text-primary1 ">
					Belum ada pengumuman
				</StyledTextTertiary>
			)}
		</div>
	);
};

export default PengumumanBlock;
