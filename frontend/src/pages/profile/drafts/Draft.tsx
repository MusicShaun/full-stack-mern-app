import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { deleteBlog } from '../../../actions/blogActions';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import Card from '../../../components/Card';
import Loader from '../../../components/Loader';
import { deleteDraftPosts, getDraftPosts } from '../../../features/draftPostsSlice';
import { showUpdateTrue } from '../../../features/showUpdateSlice';
import YourPostsFinish from '../yourposts/YourPostsCloser';

export default function Draft() {

  const dispatch = useAppDispatch();
  const updateSelector = useAppSelector(state => state.showUpdateSlice)
  const navigate = useNavigate();
  const draftsSelector = useAppSelector(state => state.getDraftPostsState.value)
  const closePopUpWindow = useAppSelector(state => state.booleanPopUpWindow);
  const loading = useAppSelector(state => state.loadingState.value.booly)
  const [ usersDrafts, setUsersDrafts ] = useState<object[]>([]);
  const [ localDraft, setLocalDraft ] = useState([]);

  
  useEffect(() => {
    getUpdatedDraftsPosts();
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    usersDraftedBlogs()
    // eslint-disable-next-line
  }, [  draftsSelector ])

  
  async function getUpdatedDraftsPosts() {
    try { 
      const data = await axios.get('/api/bloggers', {
      }) 
      let helper = data.data.data.filter(function( obj:any ) { // remove any that belong with the drafts
        return obj.isDraft === true;
      })
      dispatch(getDraftPosts(helper))
      setLocalDraft(helper)
    } catch (error) {
      console.log(error)
    } 
  }

  async function handleDeletePost(postID: any) {
    dispatch(deleteBlog(postID))
    dispatch(deleteDraftPosts())
      setTimeout(() => { // GET REQ WAS OVERLAPPING DELETE REQ
        getUpdatedDraftsPosts()
      }, 100)
  }

  async function handleUpdaterButton(index: number) {
    navigate('updatepost')
    dispatch(showUpdateTrue(index))
  }


  function usersDraftedBlogs() {
    setUsersDrafts([]) 
    sieveDrafts(getLocalStorage())
  }
  function getLocalStorage(){
    if (localStorage.getItem('userInfo')){
      return JSON.parse(localStorage.getItem('userInfo') || ""); 
    }
  }
  function sieveDrafts(local: any) {
    let helperDraft: object[] = [];
    if (draftsSelector){ 
      Object.values(draftsSelector)
      .filter((item: any  )=> item.lastName === local.lastName 
        ? helperDraft.push(item)
        : null)
    }
    setUsersDrafts(helperDraft)
  }



  return (
    <Box sx={{width: '92%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}} >
    <Typography variant='h1' textAlign='center' 
        sx={{filter: closePopUpWindow.value ? 'blur(5px)' : 'null', 
            mt: {xs: 1, md: 4}, 
            mb: {xs: 1, md: 4},
            }}>
        {usersDrafts.length > 0 ? 'Your Drafts' : 'You don\'t have any drafts'}
      </Typography>

    <Box sx={{
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      gap:!updateSelector.value.bool ? 4 : 0,
      mb: !updateSelector.value.bool ? 10 : 0,
      width: '100%'
      }}>
  {loading && <Loader /> }
  {closePopUpWindow.value && <YourPostsFinish />}

    {localDraft && !updateSelector.value.bool &&
    localDraft.map((item: any, index: number) => {
      return (<Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}} key={index}>
          <Card  
            content={item}
            pinned={false}   
            />
            <Box  sx={{display: 'flex', justifyContent: 'space-between', mb: 6, mt: 1, }}>

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
      <Outlet context={{usersDrafts }}/>
    </Box>
    </Box>
  )
}
