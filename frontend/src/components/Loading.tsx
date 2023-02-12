import styled from "styled-components"

export default function Loading () {

  return (

    <Wrapper >
      
      <Container >
      <Loader>
        <Spinner>
          <Blocker></Blocker>
        </Spinner>
      </Loader>

        <Loader2>
        <BlurWhite />
          <Base />

        </Loader2>

      </Container>


    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  opacity: 1;
  background-color: #f1ecec85;
`;


const Container = styled.div`
  position: relative;
  width: 140px; 
  height: 150px; 
  min-height: 150px; 
`
const Loader = styled.div`
position: absolute;
  width: 100%; 
  height: 100%; 
  border-radius: 55% 45% 50% 50% / 68% 68% 32% 32% ;
  overflow: hidden;
`
const Spinner = styled.div`
  position: absolute;
  bottom: -7%;
  left: 50%;
  margin-bottom: 60px;
  transform: translateX(-50%);
  width: 70px; 
  height: 70px;
  animation: bouncing 0.5s infinite cubic-bezier(0.5, 0.25, 0.91, 0.63) alternate;

  @keyframes bouncing {
    from {
      margin-bottom: 60px;
    } to {
      margin-bottom: -15px; 
  }}
  
`
const Blocker = styled.div`
  width: 100%;
  height: 100%;
  background-color: orange ;

  animation: animator 2s infinite 0s cubic-bezier(0.31, 0.68, 1, 1.03);
  @keyframes animator {
    0% {
      transform: rotate(40deg);
    } 100% {
      transform: rotate(400deg);
    }
  }
  
`
const Loader2 = styled.div`
position: absolute;
  width: 100%; 
  height: 100%; 
`
const Base = styled.div`
  position: absolute;
  bottom: 0; 
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 5px;
  border-radius: 100%;
  background-color: grey
`
const BlurWhite = styled.div`
  width: 400%;
  height: 200%;
  transform: translate(-37.5%, -15%);
  position: absolute; 
  background-color: #ffffff9a;
  border-radius: 50%;
  filter: blur(35px);
  z-index: -1;
`