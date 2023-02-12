const useFilterBlogsWithSearchArray = (postsState: any, payload: string) => {
  let help = []
  payload = payload.toLowerCase()
  for (let i = 0; i < postsState.length; i++) {
    if (postsState[i]['tag'].toLowerCase().includes(payload)) help.push(postsState[i])
    else if (postsState[i]['tag2'].toLowerCase().includes(payload))  help.push(postsState[i])
    else if (postsState[i]['header'].toLowerCase().includes(payload))  help.push(postsState[i])
    else if (postsState[i]['body'].toLowerCase().includes(payload))  help.push(postsState[i])
    else if (postsState[i]['firstName'].toLowerCase().includes(payload))  help.push(postsState[i])
    else if (postsState[i]['lastName'].toLowerCase().includes(payload))  help.push(postsState[i])
  }
  return help
}
export default useFilterBlogsWithSearchArray