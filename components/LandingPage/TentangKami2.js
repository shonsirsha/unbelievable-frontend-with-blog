import styled from "styled-components";
import { Image } from "react-bootstrap";
import { TextSecondary } from "components/Typography/Text";
import { HeadingXXL, HeadingMD } from "components/Typography/Headings";
import HalfHalf from "components/HalfHalf/HalfHalf";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledHeadingXXL = styled(HeadingXXL)`
  @media ${mediaBreakpoint.down.lg} {
    font-size: 48px;
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
`;
const PersonContainer = styled.div`
  max-width: ${(props) => (props.nothalfhalf ? `320px` : `100%`)};
  & > p {
    word-break: ${(props) => (props.nothalfhalf ? `break-word` : `unset`)};
  }
  @media ${mediaBreakpoint.down.lg} {
    max-width: 100%;
  }
`;
export default function TentangKami({ professionals }) {
  const notHalfHalf = professionals?.length >= 3;
  const left = (
    <>
      <HeadingMD as="h2" className="mt-1 text-white">
        Dengan Mentor
      </HeadingMD>
      <StyledHeadingXXL as="h2" className="mt-2 text-blue">
        TERBAIK
      </StyledHeadingXXL>
      <HeadingMD as="h2" className="mt-1 text-white">
        di Bidangnya
      </HeadingMD>
    </>
  );

  const right = (
    <>
      {professionals && (
        <div
          className={`mt-lg-${
            notHalfHalf ? `5` : `0`
          } mt-4 d-flex flex-lg-row flex-column ${notHalfHalf && `flex-wrap`}`}
        >
          {professionals.map((p) => (
            <PersonContainer
              nothalfhalf={notHalfHalf}
              key={p.id}
              className="d-flex flex-column align-items-center mr-lg-5 mr-0 mb-5"
            >
              <StyledImage
                alt="speaker"
                src={p.photo ? p.photo.url : `/images/plcholder.png`}
                width={210}
                height={210}
                roundedCircle
              />
              <TextSecondary
                style={{ whiteSpace: "pre-line" }}
                className="mt-lg-5 mt-2  text-white text-center line-break-anywhere"
              >
                {p.description}
              </TextSecondary>
            </PersonContainer>
          ))}
        </div>
      )}
    </>
  );
  return (
    <HalfHalf
      left={left}
      right={right}
      leftLg={left}
      rightLg={notHalfHalf ? 12 : 6}
    />
  );
}
