import { useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../../../app/hook"
import { BlogShape, deleteBlog, selectBlogsById, selectBlogsStatus } from "../../wall/wallSlice"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Card from "../../../components/Card"
import { UserType, selectUser } from "../../users/usersSlice"
import { useEffect, useState } from "react"

function YourPostsList() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const usersPostedBlogs: BlogShape[] | object[] = useSelector(selectBlogsById)
  const user: UserType = useAppSelector(selectUser)
  const status: string = useAppSelector(selectBlogsStatus)
  let closingWindow = status === 'post deleted' || status === 'update successful'

  const [displayBlogsCheck, setDisplayBlogsCheck] = useState(false)
  const [filterContents, setFilterContents ] = useState(usersPostedBlogs.filter((post: any) => post.isDraft === false))
  
  useEffect(() => {
    setDisplayBlogsCheck(Object.keys(usersPostedBlogs).length !== 0)
    setFilterContents(usersPostedBlogs.filter((post: any) => post.isDraft === false)) 
  }, [usersPostedBlogs])

  function handleUpdaterButton(_id: string) {
    navigate({
      pathname: 'update-post',    
      search: `?id=${_id}`
    })
  }

  function handleDeletePost(_id: string, token: string) {
    dispatch(deleteBlog({_id, token}))
  }


  let contents
  if (displayBlogsCheck) {
  contents = filterContents.map((item: any, index: number) => { 
      return ( 
        <Box key={index + 500} sx={{
          display: 'flex',
          flexDirection: 'column',
          filter: closingWindow ? 'blur(5px)' : 'null',
        }}> 
          <Card content={item} pinned={false} />
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 6,
            mt: 1,
          }}>
            <Button variant='contained'
              onClick={() => handleUpdaterButton(item._id)}
              sx={{
                bgcolor: 'success.main',
                boxShadow: 4,
                ":hover": {
                  transform: 'scale(1.05)',
                  boxShadow: 5
                },
              }}
            >Update Blog
            </Button>
            <Button onClick={() => handleDeletePost(item._id, user.token!)}
              variant='contained' sx={{
                bgcolor: 'error.main',
                boxShadow: 5,
                  ":hover": { transform: 'scale(1.05)', boxShadow: 4 }, 
                }}
            >Delete
            </Button>
          </Box> 
        </Box>
       )
    })
  }

  return (<>
    {contents}
  </>)
}

export default YourPostsList