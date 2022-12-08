import styled from "styled-components"
import { useWindowHeight } from "@react-hook/window-size";
import { useEffect, useState } from "react";


export default function Loading () {

  const onlyHeight = useWindowHeight(); 

  const [antiScroll, setAntiScroll ] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setAntiScroll(window.scrollY)
      
    }
  
  }, [])
  return (

    <Wrapper 
      style={{width: `100%`, height: `${onlyHeight}px`, transform: `translateY(${antiScroll}px)`}}>
      
      <Container >
      <Loader>
        <Spinner>
          <Blocker></Blocker>
        </Spinner>
      </Loader>

      <Loader2>
      <Base />
      </Loader2>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.4);
  left: 0;
  min-height: 90vh;
  min-width: 100%;
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
  /* border: 1px solid black; */
`
const Spinner = styled.div`
  position: absolute;
  bottom: -7%;
  left: 50%;
  transform: translateX(-50%);
  width: 70px; 
  height: 70px;
  animation: bouncing 0.33s infinite 0.33s cubic-bezier(0.28, 0.52, 0.57, 0.99) alternate;

  @keyframes bouncing {
    from {
      margin-bottom: -10px;
    } to {
      margin-bottom: 50px; 
  }}
  
`
const Blocker = styled.div`
  width: 100%;
  height: 100%;
  background-color: orange ;

  animation: animator 2.64s infinite 0s linear;
  @keyframes animator {
    0% {
      transform: rotate(40deg);
    } 25% {
      transform: rotate(130deg);
    } 50% {
      transform: rotate(220deg);
    } 75% {
      transform: rotate(310deg);
    } 100% {
      transform: rotate(400deg);
    }
  }
  
`
const Loader2 = styled.div`
position: absolute;
  width: 100%; 
  height: 100%; 
  overflow: hidden;
`
const Base = styled.div`
  position: absolute;
  bottom: 0; 
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 5px;
  background-color: #7b7760c4;
  border-radius: 100%;
`
