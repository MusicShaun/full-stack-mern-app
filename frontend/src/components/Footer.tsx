import styled from 'styled-components';


export default function Footer() {


  return (
    <Wrapper>
      <div>LOGO</div>
      <IconContainer>
        <div>icon</div>
        <div>icon</div>
        <div>icon</div>
      </IconContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 300px;
  background-color: lightgrey;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
const IconContainer = styled.div`
  display: flex;
`