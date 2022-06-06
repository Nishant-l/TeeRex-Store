import React, { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import 'bulma/css/bulma.min.css';
import { CardComp } from "./Card";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


const Cart = () => {
    const[items,setItems] = useState([]);
    const[itemStore, setItemStore] = useState([]);
    const [purchessList, setPurchessList] = useState({})
    const [totalInCart, setTotalInCart] = useState(0);
    const [filterState, setFilterState] = useState(false);

    let cardBodyStyle = {
        width:'80vw', maxHeight:'100vh', overflow:'scroll'
    }
    if(!filterState){
        cardBodyStyle = {
            width:'100vw', maxHeight:'100vh', overflow:'scroll'
        }
    }
    React.useEffect(()=>{
        fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
                    .then(responst => responst.json())
                    .then(data =>{
                        setItems(data);
                        setItemStore(data);
                    });
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

    const searchItem = (keyWord) => {
        keyWord = keyWord.toLowerCase();
        if(keyWord==='all'){
            setItems(itemStore);
        }else{
            const filteredItemsList = itemStore.filter((itm) => {
                return (itm.name.toLowerCase().includes(keyWord)  || itm.type.toLowerCase().includes(keyWord) || itm.color.toLowerCase().includes(keyWord) || itm.gender.toLowerCase().includes(keyWord))
            });
            setItems(filteredItemsList);
        }
    }

    return(
        <>
{/* ------------------------------------------------------------------NAV_BAR-------------------------------------------------------------------------------------- */}

       <NavBar
        count={totalInCart}
        list={purchessList}
        dataBase = {items}
        searchItem={searchItem}
       />
{/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
  
       
        <div style={{width:'100vw', display:'flex', flexDirection:'row', margin:'1%', marginTop:'2%', minHeight:'110vh'}}>

{/* ------------------------------------------------------------------------Filter Component-------------------------------------------------------------------------------- */}
           { filterState && 
                <div style={{width:'20vw',height:'100vh', borderRadius:'10px', backgroundColor:'black'}} >
                    <div style={{margin:'5%', marginTop:'10%', marginBottom:'10%'}}>
                    
                    </div>
                </div>
            }
{/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

{/* ----------------------------------------------------------------Flying_filter_Button---------------------------------------------------------------------------------------- */}
            
            <Fab color="secondary" aria-label="add" onClick={()=>setFilterState(!filterState)} style={{position:'absolute', marginTop:'0vh', marginLeft:'-13px'}}>
                {!filterState && 
                <FilterAltIcon />
                 }
                 {filterState && 
                <FilterAltOffIcon />}
            </Fab>
{/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}

{/* ------------------------------------------------------------------CARD_Holding_body-------------------------------------------------------------------------------------- */}

            <div  style={cardBodyStyle}>
                <Box sx={{ flexGrow: 1, margin:1}}>
                {/* ---------------------------------------------------------------No_MATCHING_SEARCH----------------------------------------------------------------------------------------- */}
                    {items.length===0 && 
                        <>
                        <article class="message is-warning" style={{margin:'auto',marginTop:'10vh', width:'50vw', }}>
                                <div class="message-body">
                                    <h1>Opps! No Matching Result 🙁 </h1>
                                    <button className=" button is-danger is-light" style={{marginTop:'2vh'}} onClick={()=>{setItems(itemStore)}}>Clear Search</button>
                                    <h1 className="title is-1" style={{marginTop:'2vh'}}>¯\_(ツ)_/¯</h1>
                                </div>
                        </article>
                        </>
                    }
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                
                    <Grid container spacing={{ xs: 2, md: 4 }} style={{justifyContent:'space-evenly'}}>
                        {/* {console.log(items.length)} */}
                            {items.length!==0 && items.map((it)=>(
                                <Grid item key={it.id}>
                                        <CardComp 
                                            itm = {it}
                                            modifyItemToPurchessList={modifyItemToPurchessList}
                                            purchessList={purchessList}
                                        />
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            </div>
{/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}


        </div>
        {/* <Footer/> */}
        </>
    )
}

export default Cart;