import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import {Grid,Box,Container, Typography,LinearProgress, Stack } from '@mui/material';
import Charts from './Chart';
import '../Styles/coins.css'
export default function Coinpages() {
  const {id}=useParams();
  console.log(id)
const [coins,setcoins]=useState([]);
const [loading,setloading]=useState(true);
  const coinsData=()=>{
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response)=>{
     
      setcoins(response.data)
      setloading(false);

    })
    .catch((error)=>{
      console.log(error)
    });

  }

useEffect(()=>{
    coinsData();
  },[id])
  function formatCurrency(amount) {
  
    if (isNaN(amount)) {
      return 'Invalid input';
    }

    const parts = amount.toString().split('.');
  
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
  }
  

  return (

    <Box>
      { loading? <LinearProgress sx={{color:'gold'}} />
         :
       <Grid container>
        <Grid item xs={12} md={4} sx={{marginLeft:'40'}}>
    <div className='main' style={{display:"flex",flexDirection:'column',alignItems:'center',paddingTop:'35px',
  borderRight:'1px solid white', height:'90vh'
  }}>
      <img src={coins.image && coins.image.large} alt={coins.id} height={180} width={180}/>
      <Typography variant='h3' sx={{textTransform:'uppercase', marginTop:'20px',fontSize:'30px'}}>{coins.name}</Typography>
     <Typography variant='subtitle1' sx={{padding:'12px 10px',fontFamily: 'Montserrat',marginLeft:'10px'}}>
      {coins.description.en.split('.')[0]}
     </Typography>
     <Box sx={{display:'flex', justifyContent:'left', alignItems:'center', alignSelf:'baseline', paddingLeft:'10px',margin:'10px 10px'}}  >
     <Typography variant='h4' sx={{textAlign:'left',fontFamily: 'Montserrat',fontWeight:'900'}}>Rank :&nbsp;</Typography>
     <Typography variant='h4' sx={{fontFamily: 'Montserrat',paddingTop:'4px',fontSize:'30px'}}>{coins?.coingecko_rank}</Typography>
     </Box>
     <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', alignSelf:'baseline', paddingLeft:'10px',fontFamily: 'Montserrat',margin:'10px 10px'}}  >
     <Typography variant='h4' sx={{fontFamily: 'Montserrat',fontWeight:'900'}}>Current Price:&nbsp;</Typography>
     <Typography variant='h4' sx={{fontFamily: 'Montserrat', paddingTop:'5px', fontSize:'30px'}}>₹{coins.market_data.current_price.inr}</Typography>
     </Box>
     <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', alignSelf:'baseline', paddingLeft:'10px',fontFamily: 'Montserrat',margin:'10px 10px'}}  >
     <Typography variant='h4' sx={{fontFamily: 'Montserrat',fontWeight:'900'}}>Market Cap:&nbsp;</Typography>
     <Typography variant='h4' sx={{fontFamily: 'Montserrat', paddingTop:'5px', fontSize:'30px'}}>₹{formatCurrency(coins.market_data.market_cap.inr.toString().slice(0,-6))}M</Typography>
     </Box>

      </div>
        </Grid>
        <Grid item xs={12} md={8}>
<Charts id={id}/>
        </Grid>
    </Grid>
}
    </Box>
  )

}
