import React from 'react'
import { CssBaseline, Container, Box, Stack, Paper, styled, Divider, Typography, Button } 
from "@mui/material";
import Card from "../../components/blog_posts/Card";



type IProps = {
  usersPosts: object[];
}

export default function YourPosts({usersPosts}: IProps ) {
  return (
    <div>
    <Typography variant='h1' textAlign='center' >
        {usersPosts.length > 0 ? 'Your posts' : 'You havent made any posts'}
      </Typography>


      {usersPosts && 
        usersPosts.map((item: any, index: number) => {
          return <Card key={index}
                tag={item.tag}
                tag2={item.tag2}
                header={item.header}
                body={item.body}
                date={item.createdAt}
                name={item.firstName}
                />
          
        })
      }
      <Button>Add Delete Button</Button>
      <Button>Add update Button</Button>
  </div>
  )
}
