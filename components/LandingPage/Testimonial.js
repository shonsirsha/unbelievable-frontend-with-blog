import styled from "styled-components";
import { TextPrimary, TextTertiary } from "components/Typography/Text";
import { Image, Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";

import {
	HeadingSM,
	HeadingMD,
	HeadingXS,
} from "components/Typography/Headings";

const StyledHeadingXS = styled(HeadingXS)`
	font-size: 22px;
	margin-top: 96px;
`;

const OuterContainer = styled.div`
	display: flex;
	padding: 160px 0;
`;
const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 350px;
	padding: 32px;
	border-radius: 32px;
	width: 270px;
	align-items: center;
	position: relative;
	img {
		position: absolute;
		top: -50px;
	}
`;

const StyledSlider = styled(Slider)`
	.slick-track {
		margin: auto;
	}
	.slick-list {
		height: 490px;
		padding-top: 90px;
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
		left: 174px;
	}

	.slick-next {
		right: 240px;
	}
`;
export default function MulaiSekarang() {
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
						<HeadingMD className="text-center">
							Testimoni Member yang sudah Join Batch 1
						</HeadingMD>
					</Col>

					<Col lg={12} className="mt-4">
						<StyledSlider {...settings}>
							<TestimonialCard />
							<TestimonialCard />
						</StyledSlider>
					</Col>
				</Row>
			</Container>
		</OuterContainer>
	);
}
const TestimonialCard = () => {
	return (
		<CardBody className="shadow bg-tan">
			<Image src="/images/plcholder.png" width={160} roundedCircle />

			<StyledHeadingXS>Mega, Pelajar</StyledHeadingXS>
			<TextTertiary className="mt-3 text-center">
				blablablabla isinya testimoni yang bagus bagus bagus yang menyakinkan
				sekali woh
			</TextTertiary>
		</CardBody>
	);
};
