import styled from "styled-components";

const BoxContainer = styled.div`
  position: fixed;
  bottom: 1.5em;
  right: 1.5em;
  transition: 0.35s;
  z-index: 101;
  display: flex;
  padding: 16px 30px;
  flex-direction: column;
  background: #25d366;
  color: white;
  border-radius: 100px;

  @media screen and (max-width: 1024px) {
    bottom: 1em;
    right: 1em;
    padding: 10px 20px;
  }

  .href-white {
    color: white;
  }
`;

export default function Chatbox({ children, ...props }) {
  let whatsappURL = "https://api.whatsapp.com/send?phone=+6287827345829";
  return (
    <BoxContainer>
      <a
        className="href-white"
        target="_blank"
        href={whatsappURL}
        rel="noreferrer"
      >
        {children}
      </a>
    </BoxContainer>
  );
}
