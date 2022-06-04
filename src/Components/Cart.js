import React, { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import 'bulma/css/bulma.min.css';
import { CardComp } from "./Card";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Cart = () => {
    const[items,setItem] = useState([]);
    const [purchessList, setPurchessList] = useState({})
    const [totalInCart, setTotalInCart] = useState(0);

    React.useEffect(()=>{
        fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
                    .then(responst => responst.json())
                    .then(data => setItem(data));
    },[]);

    const modifyItemToPurchessList = (id, typeOfOpr) => {
        const newPurList = {};
        if(id in purchessList){
            if(typeOfOpr==='add'){
                purchessList[id]+=1;
                setTotalInCart(totalInCart+1)
            }
            if(typeOfOpr==='sub'){
                purchessList[id]-=1;
                setTotalInCart(totalInCart-1)
            }
            setPurchessList(purchessList);
        }else{
            purchessList[id]=1;
            setPurchessList(purchessList);
            setTotalInCart(totalInCart+1)
        }
    }

    return(
        <>
       {console.log(purchessList)}
        <Box sx={{ flexGrow: 1, margin:5}}>
        <Grid container spacing={{ xs: 2, md: 4 }} style={{justifyContent:'space-evenly'}}>
            {items.length===0 && <h1>Helloo</h1>}
                {items.length!==0 && items.map((it)=>(
                    <Grid item key={it.id}>
                            <CardComp 
                                itm = {it}
                                modifyItemToPurchessList={modifyItemToPurchessList}
                            />
                    </Grid>
                ))}
        </Grid>
         </Box>
        </>
    )
}

export default Cart;