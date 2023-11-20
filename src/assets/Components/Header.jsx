import React, { useState } from 'react';
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, FormControl, ThemeProvider, createTheme } from '@mui/material';
export default function Header() {
const [Currency,SetCurrency]=useState('USD')
console.log(Currency)
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    primary: {
      main: '#fff',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <div>
            <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', color: 'gold' }}>
              <Typography variant='h4'>
                CryptoWorld
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 150, paddingLeft: 90 ,display:'none'}} >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={Currency}
                  onChange={(e) => SetCurrency(e.target.value)} >
                  <MenuItem value={'USD'} selected>USD</MenuItem>
                  <MenuItem value={'INR'}>INR</MenuItem>
                </Select>
              </FormControl>
            </Toolbar>
          </div>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
