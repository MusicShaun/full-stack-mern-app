import {useState, useEffect} from 'react'
export default function usePerfectWindowHeight(onlyHeight: number) {

  const [setHeight, setIt] = useState(onlyHeight - 80);

  useEffect(() => {
    setIt(onlyHeight - 80)
  }, [onlyHeight])

  return setHeight;
}



