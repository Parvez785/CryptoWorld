import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Box} from '@mui/material'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export default function Carousel() {
  const [data, setData] = useState([]);

  const trendingcoins = () => {
    axios.get('https://api.coingecko.com/api/v3/search/trending')
      .then((response) => {
      
        setData(response.data.coins);
     
      })
      .catch((error) => {
        console.error('Error fetching trending coins:', error);
      });
  };

  useEffect(() => {
    trendingcoins();
  }, []);

  const responsive = {
    0: {
      items: 2,
    },
    1024: {
      items: 3,
    },
  };

  const items = data.map((coins) => (
<>
    <Link to={`/coins/${coins.item.id}`} key={coins.item.id}>
     
    <img src={coins.item.large} alt={`Coin ${coins.item.id}`} className='image-responsive'/>
    </Link>
    <div className='texst'>
    <span style={{color:'white',textDecoration:"none"}}>{coins.item.name}</span>
    </div>
    </>
  ));

  return (
    <Box sx={{marginTop:3}}  >
      <AliceCarousel
        mouseTracking
        infinite
        responsive={responsive}
        animationDuration={2000}
        autoPlay
        items={items}
        disableDotsControls
        disableButtonsControls
        
      />
    </Box>
  );
}
