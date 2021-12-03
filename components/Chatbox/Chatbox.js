import styled from "styled-components";

const BoxContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  transition: 0.35s;
  z-index: 101;
  display: flex;
  padding: 16px 30px;
  flex-direction: column;
  background: #25d366;
  color: white;
  border-radius: 50px;

  .href-white {
    color: white;
  }
`;

export default function Chatbox({ children, ...props }) {
  let whatsappURL = "https://api.whatsapp.com/send?phone=+6287827345829";
  return (
    <BoxContainer>
      <a className="href-white" target="_blank" href={whatsappURL}>
        {children}
      </a>
    </BoxContainer>
  );
}
