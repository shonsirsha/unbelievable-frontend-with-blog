//misc as in Miscellaneous
import styled from "styled-components";
import { HeadingXXS } from "components/Typography/Headings";
import PengumumanBlock from "./PengumumanBlock";
import MisiBlock from "./MisiBlock";

const MiscHeaderContainer = styled.div`
	display: flex;
	border-bottom: 1px #d1d1d1 solid;
	align-items: center;
	padding: 24px;
	background: #fff;
	padding-bottom: 24px;
`;

const StyledHeadingXXS = styled(HeadingXXS)`
	${(props) => props.opened && `text-decoration: underline;`}
`;
const MiscBodyContainer = styled.div`
	padding: 24px 32px;
	background: #fff;
	overflow-y: auto;
`;
const MiscContainer = ({
	setRenderedDescContext,
	setCurrentlyOpened,
	setMissionIdsToAPI,
	setMissionHook,
	videoDesc,
	currentCourse,
	currentlyOpened,
	renderedDescContext,
	finishedWatching,
}) => {
	return (
		<>
			<MiscHeaderContainer className="justify-content-sm-start justify-content-between">
				<StyledHeadingXXS
					opened={currentlyOpened === "desc"}
					onClick={() => {
						setRenderedDescContext(<>{videoDesc}</>);
						setCurrentlyOpened("desc");
					}}
					role="button"
					as="p"
					className="text-center text-primary1 mx-sm-2 mx-0"
				>
					Tentang course
				</StyledHeadingXXS>
				<StyledHeadingXXS
					opened={currentlyOpened === "pengumuman"}
					onClick={() => {
						setRenderedDescContext(
							<PengumumanBlock currentCourse={currentCourse} />
						);
						setCurrentlyOpened("pengumuman");
					}}
					role="button"
					as="p"
					className="text-center text-primary1 mx-sm-2 mx-0"
				>
					Pengumuman
				</StyledHeadingXXS>
				<StyledHeadingXXS
					opened={currentlyOpened === "misi"}
					onClick={() => {
						setRenderedDescContext(
							<MisiBlock
								finishedWatching={finishedWatching}
								setMissionIdsToAPI={setMissionIdsToAPI}
								setMissionHook={setMissionHook}
							/>
						);
						setCurrentlyOpened("misi");
					}}
					role="button"
					as="p"
					className="text-center text-primary1 mx-sm-2 mx-0"
				>
					Misi
				</StyledHeadingXXS>
			</MiscHeaderContainer>
			<MiscBodyContainer>{renderedDescContext}</MiscBodyContainer>
		</>
	);
};

export default MiscContainer;
