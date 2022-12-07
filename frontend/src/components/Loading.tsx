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
      style={{width: `100%`, height: `${onlyHeight - 80}px`, transform: `translateY(${antiScroll}px)`}}>
      <Loader>
        <Spinner>
        <Blocker></Blocker>
        </Spinner>

      </Loader>
      
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

const Loader = styled.div`
position: relative;
  width: 140px; 
  height: 150px; 
  min-height: 150px; 
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  overflow: hidden;

`
const Spinner = styled.div`
  position: absolute;
  bottom: -7%;
  left: 25%;
  width: 70px; 
  height: 70px;
  animation: bouncing 0.3s infinite ease-out alternate;
  @keyframes bouncing {
    from {
      margin-bottom: 0px;
    } to {
      margin-bottom: 40px; 
  }}
  
`
const Blocker = styled.div`
  width: 100%;
  height: 100%;
  background-color: orange ;
  
  animation: animator 2.4s infinite linear;
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