import React, { useEffect, useState } from 'react';;
import axios from 'axios';
import '../Styles/coins.css'
import { Box ,Button,LinearProgress} from '@mui/material';
import {Line} from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  LineController,
  Tooltip,
  Legend,
} from 'chart.js/auto';

// Register the required scales
Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);

export default function Charts(id) {
  const [loading,setloading]=useState(true);
  const [historicaldata, sethistoricaldata]=useState([]);
  const [days,setdays]=useState(7);
  const coinsChartData=()=>{
    axios.get(`https://api.coingecko.com/api/v3/coins/${id.id}/market_chart?vs_currency=INR&days=${days}`)
    .then((response)=>{
     
     sethistoricaldata(response.data.prices)
      setloading(false);

    })
    .catch((error)=>{
      console.log(error)
    });
  }
  useEffect(()=>{
    coinsChartData();
  },[id,days])

  const daysChart=[
{
  label:'7 days',
  value:7,
} ,
{
  label:'  30 days',
  value:30,
} ,
{
  label:' 3 Months',
  value:90,
} ,
{
  label:' 1 Year',
  value:365,
}

  ]

const data={
  labels: historicaldata.map((item)=>{
    const date= new Date(item[0]);
    const time= date.getHours()>12?
    `${date.getHours()-12}:${date.getMinutes()}PM`:
    `${date.getHours()}:${date.getMinutes()}AM`
    return date===1?time:date.toLocaleDateString();
  }),
 datasets: [{
    data: historicaldata.map((item) => item[1]),
    label: `Price in (Past ${days} days) in INR `,
    borderColor: "#EEBC1D",
  }]
}
const options={
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  
  },

}


  return (
   
 <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'Center',marginTop:'30px',marginLeft:'10px'}}>

   <Line data={data} options={options}/>
   <Box sx={{display:'flex',justifyContent:'space-between',  paddingBottom: '20px'}}>
   <ul>
  {daysChart.map((items) => (
    <button key={items.value} 
     onClick={() => setdays(items.value)}>
      {items.label}
    </button>
  ))}
</ul>
</Box>
 </Box>

  )  }
  
