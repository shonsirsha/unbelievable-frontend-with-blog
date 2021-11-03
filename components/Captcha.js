import React from "react";
import { RECAPTCHA_SITE_KEY } from "config";
import ReCAPTCHA from "react-google-recaptcha";
const Captcha = ({ reRef = null }) => {
	return (
		<ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} size="invisible" ref={reRef} />
	);
};

export default Captcha;
