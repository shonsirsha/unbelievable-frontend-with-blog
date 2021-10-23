import styled from "styled-components";
import { TextTertiary } from "components/Typography/Text";
import { Image, Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { HeadingXS, HeadingMD } from "components/Typography/Headings";
import { mediaBreakpoint } from "utils/breakpoints";
const StyledHeadingXS = styled(HeadingXS)`
	font-size: 22px;
	margin-top: 96px;
`;

const StyledHeadingMD = styled(HeadingMD)`
	@media ${mediaBreakpoint.down.lg} {
		font-size: 32px;
		line-height: 34px;
	}
`;

const OuterContainer = styled.div`
	display: flex;
	padding: 160px 0;
	padding-bottom: 24px;

	@media ${mediaBreakpoint.down.lg} {
		padding: 48px 0;
	}
`;
const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 350px;
	padding: 32px;
	border-radius: 32px;
	width: 85%;
	align-items: center;
	position: relative;
	img {
		position: absolute;
		top: -50px;
	}
`;

const StyledSlider = styled(Slider)`
	width: 100%;
	max-width: 100%;
	.slick-track {
		margin: auto;
	}
	.slick-list {
		padding-top: 90px;
		padding-bottom: 24px;
	}

	.slick-slide > div {
		display: flex;
		justify-content: center;
	}

	.slick-dots li button:before {
		font-size: 12px;
	}

	.slick-dots li button:before {
		color: #e8bc52;
	}

	.slick-prev:before,
	.slick-next:before {
		color: #e8bc52;
	}
	.slick-prev:before,
	.slick-next:before {
		font-size: 48px;
	}

	.slick-prev {
		z-index: 88;
		left: -64px;
	}

	.slick-next {
		right: -56px;
		z-index: 88;
	}

	.slick-arrow {
		width: 48px;
		height: 48px;
		margin-top: 48px;
	}

	@media ${mediaBreakpoint.down.md} {
		.slick-next,
		.slick-prev {
			display: none !important;
		}
	}
`;
const StyledImage = styled(Image)`
	object-fit: cover;
`;
export default function Testimonial({ testimonials }) {
	console.log(testimonials);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<OuterContainer>
			<Container>
				<Row>
					<Col lg={12}>
						<StyledHeadingMD className="text-center">
							Testimoni Member yang Sudah Join Batch 1
						</StyledHeadingMD>
					</Col>

					<Col lg={12} className="d-flex justify-content-center mt-4">
						<StyledSlider {...settings}>
							{testimonials &&
								testimonials.map((t, ix) => (
									<TestimonialCard
										photo={t.photo}
										key={ix}
										name={t.name}
										content={t.content}
									/>
								))}
						</StyledSlider>
					</Col>
				</Row>
			</Container>
		</OuterContainer>
	);
}
const TestimonialCard = ({ name, content, photo }) => {
	return (
		<CardBody className="shadow bg-tan">
			<StyledImage
				alt="placeholder"
				src={photo ? photo.url : `/images/plcholder.png`}
				width={160}
				height={160}
				roundedCircle
			/>

			<StyledHeadingXS>{name}</StyledHeadingXS>
			<TextTertiary className="mt-3 text-center">{content}</TextTertiary>
		</CardBody>
	);
};
