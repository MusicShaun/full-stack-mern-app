import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hook"
import { BlogShape, deleteBlog, selectBlogsStatus, selectDraftBlogs } from "../../wall/wallSlice"
import { Box, Button} from "@mui/material"
import Card from "../../../components/Card"
import { selectUser } from "../../users/usersSlice"


function DraftsList() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const usersDraftsSelector: BlogShape[] | object[] = useAppSelector(selectDraftBlogs)
  const user = useAppSelector(selectUser)
  const status = useAppSelector(selectBlogsStatus)
  let closingWindow = status === 'post deleted'
  
  function handleDeletePost(_id: string, token: string) {
    dispatch(deleteBlog({_id, token}))
  }

  function handleUpdaterButton(_id: string) {
    navigate({
    pathname: `update-post`, 
    search: `?id=${ _id }`})
  }

  let canUpdate = usersDraftsSelector.length > 0 
  
  let contents = canUpdate && 
    usersDraftsSelector.map((item: any, index: number) => {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            filter: closingWindow ? 'blur(5px)' : 'null', 
          }}
          key={index}>
          <Card  
            content={item}
            pinned={false}   
            />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 6, mt: 1,
            }}>

            <Button variant='contained'
              onClick={() => handleUpdaterButton(item._id)} 
              sx={{
                bgcolor: 'success.main',
                boxShadow: 4,
                ":hover": { transform: 'scale(1.05)', boxShadow: 5},
            }}
            >
            Update Blog
            </Button>
            <Button 
              onClick={() => handleDeletePost(item._id, user.token!)}
              variant='contained'
              sx={{
                bgcolor: 'error.main',
                boxShadow: 5,
                ":hover": { transform: 'scale(1.05)', boxShadow: 4},             
            }}
            >Delete
            </Button>
          </Box> 
        </Box>)
      })              

  return (
    <>{contents}</>
  )
}

export default DraftsList