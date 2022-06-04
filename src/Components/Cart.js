import React, { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import 'bulma/css/bulma.min.css';
import { CardComp } from "./Card";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
       {/* {console.log(purchessList)} */}
       <NavBar
        count={totalInCart}
        list={purchessList}
        dataBase = {items}
       />
  
       
        <div style={{width:'100vw', display:'flex', flexDirection:'row', margin:'2%'}}>

            <div style={{width:'20vw',height:'90vh', borderRadius:'10px', backgroundColor:'black'}} >
                {/* <div style={{margin:'5%', marginTop:'10%', marginBottom:'10%'}}>
                    <input>
                    </input>
                </div>

             
                <List component='nav' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemText primary="Color"  />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Gender"  />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Price" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Type"  />
                    </ListItem>
                </List>
              */}
            </div>

            <div style={{width:'80vw', maxHeight:'100vh', overflow:'scroll'}}>
                <Box sx={{ flexGrow: 1, margin:1}}>
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
            </div>

        </div>
        {/* <Footer/> */}
        </>
    )
}

export default Cart;