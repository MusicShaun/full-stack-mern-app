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
      style={{width: `100%`, height: `${onlyHeight - 160}px`, transform: `translateY(${antiScroll}px)`}}>
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

`;

const Loader = styled.div`
position: relative;
  width: 100px; 
  height: 150px; 
  /* border: 1px grey solid; */
  border-bottom-right-radius: 45%;
  border-bottom-left-radius: 45%;
  overflow: hidden;

`
const Spinner = styled.div`
  position: absolute;
  bottom: 0;
  left: 19%;
  width: 60px; 
  height: 60px;
  animation: bouncing 0.5s infinite ease-out alternate;
  @keyframes bouncing {
    from {
      margin-bottom: 0px;
    } to {
      margin-bottom: 70px; 
  }}
  
`
const Blocker = styled.div`
  width: 100%;
  height: 100%;
  background-color: orange ;
  
  animation: animator 2s infinite linear;
  @keyframes animator {
    0% {
      transform: rotate(45deg);
    } 25% {
      transform: rotate(135deg);
    } 50% {
      transform: rotate(225deg);
    } 75% {
      transform: rotate(315deg);
    } 100% {
      transform: rotate(405deg);
    }
  }
  
`