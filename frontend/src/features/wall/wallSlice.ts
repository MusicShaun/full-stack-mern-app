import { createSlice, createAsyncThunk, PayloadAction, current } from "@reduxjs/toolkit";
import axios from "axios";
import FilterBlogsWithSearchArray  from "../../hooks/FilterBlogsWithSearchArray";
import { RootState } from "../../app/store";

function config(token: string){
  return {headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token ? token : ''}`,
  }}
} 

export interface BlogShape {
  tag: string
  tag2: string
  header: string
  body: string
  firstName: string
  lastName: string
  isDraft: boolean
  _id?: string
  token?: string
}
export interface ISType {
  posts: object[];
  filteredPosts: object[];
  usersPosts: object[]
  status: string;
  message: string
  error: string | null;
}
const initialState: ISType = {
  posts: [],
  filteredPosts: [],
  usersPosts: [],
  status: 'idle',
  message: '',
  error: null
} 

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const { data } = await axios.get('/api/bloggers')
  return data.data
})
export const addNewBlog = createAsyncThunk('blogs/addNewBlog', async (initialPost: BlogShape) => {
  const { token } = initialPost
  if (token) {
    const { data } = await axios.post('/api/bloggers', initialPost, config(token))
    return data.data
  }
})
export const fetchUsersBlogs = createAsyncThunk('blogs/fetchUsersBlogs', async (_id: string) => {
  const { data } = await axios.get(`/api/bloggers/${_id}`)
  return data.data
})
export const updateUsersBlog = createAsyncThunk('blogs/updateBlog',
  async (initialPost: BlogShape) => { //! change this to put when server running
    const { token, _id } = initialPost
    if (token) {
      const { data } = await axios.put(`/api/bloggers/${_id}`, initialPost, config(token))
      return data.data
    }
  })
  
interface deleteProps {_id: string, token: string}
export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async ({_id, token}: deleteProps) => {
  if (token) {
    try {
      const res = await axios.delete(`/api/bloggers/${_id}`, config(token))
      if (res?.status === 204) {
        console.log(`${res?.status}: ${res?.statusText}`)
        return {_id: _id}
      }
    } catch (err: any) {
      console.log(err.message)
      return err.message
    }
  }
})




const wallSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    filterBlogs: (state: any, action: PayloadAction<string>) => {
      if (FilterBlogsWithSearchArray(current(state.posts), action.payload).length !== 0) {
        state.filteredPosts = (FilterBlogsWithSearchArray(current(state.posts), action.payload))
      } else {
        state.filteredPosts = []
      }
    },
    statusIdle: (state: any) => {
      state.status = 'idle'
    },    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<[]>) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || ''
      })

      .addCase(addNewBlog.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addNewBlog.fulfilled, (state, action: PayloadAction<BlogShape>) => {
        state.status = 'post succeeded'
        state.message = action.payload.isDraft === false
          ? 'Your blog has posted successfully' : 'Your draft has been saved'
        state.posts.push(action.payload)
      })

      .addCase(fetchUsersBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsersBlogs.fulfilled, (state, action: PayloadAction<object[]>) => {
        state.status = 'succeeded'
        state.usersPosts = action.payload
      })

      .addCase(updateUsersBlog.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUsersBlog.fulfilled, (state, action: PayloadAction<BlogShape>) => {
        if (!action.payload._id) {
          console.log('update could not complete')
          return 
        }
        const { _id } = action.payload
        state.status = 'update successful'
        state.message = 'Your post has successfully updated'
        const posts = state.usersPosts.filter((p: any) => p._id !== _id)
        state.usersPosts = [...posts, action.payload]
      })

      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Delete could not complete')
          return 
        }
        state.status = 'post deleted'
        state.message = 'Post has been deleted'
        const { _id } = action.payload
        const Uposts = state.usersPosts.filter((post: any) => post._id !== _id); 
        state.usersPosts = Uposts 
        const posts = state.posts.filter((post: any) => post._id !== _id); 
        state.posts = posts
      })
  }
})

type ID_FINDER = { state: any, _id: string }

export const selectAllBlogs = (state: RootState) => state.blogs.posts
export const selectBlogsStatus = (state: RootState) => state.blogs.status
export const selectBlogsMessage = (state: RootState) => state.blogs.message
export const selectBlogsError = (state: RootState) => state.blogs.error
export const selectFilteredBlogs = (state: RootState) => state.blogs.filteredPosts
export const selectBlogsById = (state: RootState) => state.blogs.usersPosts

export const selectSingleBlogByID = ({ state, _id }: ID_FINDER)  => {
  return state.blogs.posts.filter((post: any) => post._id === _id)
}

export const selectDraftBlogs = (state: RootState) =>
  state.blogs.usersPosts.filter((post: any) => post.isDraft === true)

export const selectDraftBlogsById = ({ state, _id }: ID_FINDER) => {
   return state.blogs.usersPosts.filter((post: any) => post._id === _id)
}

export const { filterBlogs, statusIdle } = wallSlice.actions

export default wallSlice.reducer
