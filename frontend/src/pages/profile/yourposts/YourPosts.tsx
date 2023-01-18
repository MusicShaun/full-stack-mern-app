import { useEffect  } from 'react'
import { Typography, Button, Box } from "@mui/material";
import Card from "../../../components/Card";
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import YourPostsFinish from './YourPostsCloser';
import { showUpdateFalse, showUpdateTrue } from '../../../features/showUpdateSlice';
import { deleteBlog } from '../../../actions/blogActions';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { getBlogByID } from '../../../actions/blogActions';



export default function YourPosts() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const closePopUpWindow = useAppSelector(state => state.booleanPopUpWindow);
  const updateSelector = useAppSelector(state => state.showUpdateSlice)
  const loading = useAppSelector(state => state.loadingState.value.booly)
  const profileBlogs = useAppSelector(state => state.profileBlogState.value)


  useEffect(() => {
    dispatch(getBlogByID())
    // eslint-disable-next-line 
  }, [])

  async function handleUpdaterButton(index: number) {
    navigate('updatepost')
    dispatch(showUpdateTrue(index))
  }

  async function handleDeletePost(postID: any) {
    try {
      dispatch(deleteBlog(postID))
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(getBlogByID())
    }
  }


  // escape key
  useEffect(() => { //! this somehow brings me to draft posts nauyght
    function escape(e: any){
      if (e.key === 'Escape'){
        dispatch(showUpdateFalse())
      }
    }
    window.addEventListener('keyup', (e) => escape(e)) ;
    return () => window.removeEventListener('keyup',  (e) => escape(e)) ;
    // eslint-disable-next-line
  }, [] )

  return (
    <Box sx={{ position: 'relative', width: '92%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >


  {loading && <Loading /> }
  {closePopUpWindow.value && <YourPostsFinish />}

    <Typography variant='h1' textAlign='center' 
        sx={{filter: closePopUpWindow.value ? 'blur(5px)' : 'null', 
            mt: {xs: 1, md: 4}, 
            mb: {xs: 1, md: 4},
            }}>
        {Object.keys(profileBlogs).length !== 0  ? 'Your Posts' : 'You havent made any posts'}
      </Typography>
      <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap:!updateSelector.value.bool ? 4 : 0,
              mb: !updateSelector.value.bool ? 10 : 0,
              }}>

      {Object.keys(profileBlogs).length !== 0 && !updateSelector.value.bool && //* Check if object empty then hide if updating
        profileBlogs.filter((item:any) => item.isDraft === false)  // check if draft
                    .map((item: any, index: number) => {
          return (<Box key={index + 500} sx={{display: 'flex', flexDirection: 'column'}}>
                <Card
                   
                  content={item}
                  pinned={false}
                />
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 6, mt: 1, }}>

                  <Button variant='contained'
                    onClick={() => handleUpdaterButton(index)} 
                    sx={{ bgcolor: 'success.main', boxShadow: 4,
                    ":hover": { transform: 'scale(1.05)', boxShadow: 5},
                  }}
                    
                  >Update Blog</Button>
                  <Button 
                    onClick={() => handleDeletePost(item._id)}
                    variant='contained' sx={{ bgcolor: 'error.main', boxShadow: 5,
                                      ":hover": { transform: 'scale(1.05)', boxShadow: 4},
                                      
                                    }}
                  >Delete</Button>
                </Box>
                </Box>)
        })
      }
      </Box>
      <Outlet context={{profileBlogs}}/>
  </Box>
  )
}
