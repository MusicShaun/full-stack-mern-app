import { CircularProgress } from '@mui/material';
import styled from 'styled-components';


export default function Loader() {




  return (
    <Wrapper >
    <CircularProgress />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  
  position:absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`