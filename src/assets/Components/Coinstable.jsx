import React, { useState,useEffect } from 'react'
import { Link,useNavigate  } from 'react-router-dom';
import {Container, Typography,TextField,ThemeProvider, createTheme,
    Table ,TableBody ,TableCell ,TableContainer ,TableHead ,TableRow, colors 
} from '@mui/material';
import Pagination from "@mui/material/Pagination"; 
import '../Styles/coins.css'
import axios from 'axios';
export default function Coinstable() {
    const [list,setList]=useState([]);
    const [search,SetSearch]=useState('');
    const [filter, setFilter] = useState(list)
 const itemsperPage= 10;
 const [CurrentPage,setCurrentPage]=useState(1);
 const startIndex= (CurrentPage-1)*itemsperPage;
 const lastindex= startIndex+itemsperPage;
const navigate= useNavigate();
    const coinTable=()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1')
    .then((response) => {
  
     setList(response.data)
     setFilter(response.data)
    })
    .catch((error) => {
      console.error('Error fetching  coins data:', error);
    });
};

useEffect(() => {
    coinTable();
}, []);

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    primary: {
      main: '#fff',
    },
  });
// Function to format Currency using commas
  function formatCurrency(amount) {
  
    if (isNaN(amount)) {
      return 'Invalid input';
    }

    const parts = amount.toString().split('.');
  
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
  }
// Function to Add search functionality with filter

const handleSearch=()=>{  
  const filteredList= list.filter((item)=>{
return item.name.toLowerCase().includes(search.toLowerCase())
  })

setFilter(filteredList)
console.log(filteredList);
}

const handlePageChange = (event, newPage) => {
  setCurrentPage(newPage);
  console.log(newPage)
};

  return (
    <ThemeProvider theme={darkTheme}>
    <Container sx={{textAlign:"center"}}>
        <Typography variant='h4' sx={{marginTop:5, textAlign:"center"}}>
        Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField label="Enter The Coin you want tp search" variant="outlined" sx={{marginTop:3, width:'100%'}}
        onChange={(e)=>{SetSearch(e.target.value);handleSearch()} } 
        value={search}
        />
        <TableContainer sx={{marginTop:3, display:'flex',alignItems:"center",textAlign:'center'}}>
            <Table >
            <TableHead sx={{backgroundColor:'rgb(238,188,29)', }}>
            <TableRow>
            <TableCell sx={{paddingRight:30,color:'#2f2f2f', fontWeight:'700'}}>Coin</TableCell>
            <TableCell sx={{paddingRight:10,color:'#2f2f2f',fontWeight:'700'}}>Price</TableCell>
            <TableCell sx={{paddingRight:10,color:'#2f2f2f',fontWeight:'700'}}>24h Change</TableCell>
            <TableCell sx={{paddingLeft:0,color:'#2f2f2f',fontWeight:'700'}}>Market Cap</TableCell>
                </TableRow>
</TableHead>
<TableBody>
  {filter.slice(startIndex,lastindex).map((item)=>(

    <TableRow key={item.id} onClick={()=>navigate(`/coins/${item.id}`)} sx={{cursor:'pointer'}}>
         
      <TableCell sx={{display:'flex', alignItems:'center'}}>
        <img src={item.image} alt={item.name} style={{width:50,height:50,textAlign:'left',marginRight:15}}
        />
        <div className='text-main-row' >
       <Typography variant='h5' sx={{textTransform:'uppercase'}}>{item.symbol}</Typography>
       <Typography >{item.name}</Typography>
        </div>
      </TableCell>
  
      <TableCell>
      ₹ {formatCurrency(item.current_price)}
</TableCell>
<TableCell sx={{color:item.price_change_percentage_24h<0?'red':'white'}}>
  {item.price_change_percentage_24h.toFixed(2)}%
</TableCell>
      <TableCell>
      ₹ {formatCurrency(item.market_cap.toString().slice(0,-6))}M
      </TableCell>
    </TableRow>
  
  ))}
  </TableBody>
            </Table>
        </TableContainer>
   
        <Pagination count={10} sx ={{ display:'flex',justifyContent:'center',marginTop:'15px',paddingBottom:'15px'}}
        page={CurrentPage}
          onChange={handlePageChange}
          />
      
    </Container>
    </ThemeProvider>
  )
}
