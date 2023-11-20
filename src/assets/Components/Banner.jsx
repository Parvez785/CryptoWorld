import React from 'react'
import '../Styles/banner.css';
import { Container, Typography  } from '@mui/material';
import Carousel from './Carousel';
export default function Banner() {
  return (
    <div className='banner'>
       <Container sx={{display:'flex',flexDirection:'column',justifyContent:'space-around',textAlign:'center'}}>
   <Typography variant='h2' sx={{fontWeight:"bold",
   marginTop:8,
   textAlign:'center',
   fontFamily:"Monsterrat"
,}}>
    CryptoWorld
   </Typography>
   <Typography variant='p' sx={{color:'darkgray', marginTop:3,  marginBottom:2,
   fontFamily:"Monsterrat",
   textTransform:'capitalize'
}}>
   Get All The Info Regarding Your Favorite Crypto Currency
   </Typography>
   <Carousel/>
       </Container>
    </div>
  )
}
