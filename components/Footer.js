import styles from "./Footer.module.css";
import Image from "next/image";
export default function Footer() {
	return (
		<>
			<footer className={styles.footer}>
				<Image
					width={"20px"}
					height={"20px"}
					src="/netliheart.svg"
					alt="Netlify Logo"
					className={styles.logo}
				/>
				Three-Sigma Technologies | Unbelieveable.id Developer Preview
			</footer>
		</>
	);
}
