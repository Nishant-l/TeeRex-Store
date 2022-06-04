import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import 'bulma/css/bulma.min.css';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Cart = () => {
    const[items,setItem] = useState([]);
    React.useEffect(()=>{
        fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
                    .then(responst => responst.json())
                    .then(data => setItem(data));
    },[]);

    return(
        <>
        <Box sx={{ flexGrow: 1, margin:5}}>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {items.length===0 && <h1>Helloo</h1>}
                {items.length!==0 && items.map((it)=>(
                    <Grid item xs={2} sm={4} md={4} key={it.id}>
                        <Item>
                            <Card sx={{width:100}}>
                                <CardHeader/>
                                <CardMedia
                                    component="img"
                                    image={`${it.imageURL}`}
                                    alt={it.name}
                                    sx={{width:100}}
                                />
                            </Card>
                            <CardContent>
                                <div>Name: {it.name}</div>
                                <div>Type: {it.type}</div>
                                <div>Price: {it.price}</div>
                                <div>Color: {it.color}</div>
                                <div>Gender: {it.gender}</div>
                                <div>Quantity Left: {it.quantity}</div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" className="button is-primary">Learn More</Button>
                            </CardActions>
                        </Item>
                    </Grid>
                ))}
        </Grid>
         </Box>
        </>
    )
}

export default Cart;