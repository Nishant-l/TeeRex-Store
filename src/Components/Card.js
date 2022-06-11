import { useState } from "react"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import 'bulma/css/bulma.min.css';

export const CardComp = ({
    itm,
    modifyItemToPurchessList,
    purchessList,
    checkoutState
}) =>{

    let q = typeof purchessList[itm.id]?.inBag === 'number'? purchessList[itm.id].inBag : 0;
    const[isAddToBag, setIsAddedToBag] = useState((purchessList[itm.id]?.inBag>0&&true));
    const[qty,setQty] = useState(q);

    const addToCart = (id, itm) => {
        setQty(1);
        setIsAddedToBag(true)
        modifyItemToPurchessList(id,'add', itm)
    }

    const addMore = (id, itm) => {
        if(itm.quantity>=qty+1){
            setQty(qty+1);
            modifyItemToPurchessList(id,'add', itm)
        }
    }

    const removeAdded = (id, itm) => {
        if(qty-1>=0){
            if(qty-1===0){
                setIsAddedToBag(false)
            }
            setQty(qty-1);
            modifyItemToPurchessList(id,'sub', itm)
        }
    }

    let styleImage = checkoutState ===false ? {
        width:200, 
        borderRadius:10
    }:{
        width:70, 
        borderRadius:2
    }

    let cardStyle = checkoutState === false ?{
        sx:{width:320, height:400, boxShadow: 8},
        normal:{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:"flex-end", backgroundColor:'rgb(18, 18, 18)', color:'white', borderRadius:'10px'}
    }
    :{
        sx:{maxWidth:400, minWidth:350 ,boxShadow: 8 },
        normal:{display:'flex', alignItems:'center', justifyContent:"space-around", textAlign:'initial', backgroundColor:'rgb(18, 18, 18)', color:'white', borderRadius:'10px'}
    }

    let cardActionStyle = checkoutState===true ? {padding:"0px"} : {};

    return(
        <>
            {/* {console.log(purchessList[itm.id])} */}
            <Card sx={cardStyle.sx} style={cardStyle.normal}>
                
                {/* --------------- --------------- ---------HEADER------ --------------- ---------------  */}
                {!checkoutState && <CardHeader
                    title={itm.name}
                />}
                {/* --------------- --------------- --------------- --------------- ---------------  */}


                {/*--------------- --------------- -------CARD MEDIA IMG-------- --------------- ---------------   */}
                <CardMedia
                    component="img"
                    image={`${itm.imageURL}`}
                    alt={itm.name}
                    sx={styleImage}
                />
                {/* --------------- --------------- --------------- --------------- ---------------  */}



                {/* --------------- --------------- CARD Content --------------- ---------------  */}
                <CardContent style={{display:'flex', flexDirection:'column'}}>
                    <div>Price: {itm.price}<>{itm.currency==='INR'?' ₹':' $'}</></div>
                    <div>Gender: {itm.gender}</div>
                    {checkoutState &&
                     <>
                        <div>Type: {itm.type}</div>
                        <div>Color: {itm.color}</div>
                        <div>Total Cost: {itm.price * qty}</div>
                    </>}
                {/* --------------- --------------- --------------- ---------------  */}


                {/*--------------- ADD and Substract Button  --------------- */}
                {
                    !isAddToBag &&
                    <CardActions>
                    <Button 
                        size="medium"
                        className="button is-primary" 
                        disabled={itm.quantity===qty?true:false}
                        onClick={()=>addToCart(itm.id,itm)}
                    >
                        {
                            itm.quantity!==qty?'ADD TO CART ':'Out Of Stock'
                        }
                    </Button>
                    </CardActions>
                }
                    
                {
                    isAddToBag
                        &&
                    <CardActions style={cardActionStyle}>
                        {checkoutState && <span>Quentity</span>}
                        <Button onClick={()=>addMore(itm.id, itm)} disabled={itm.quantity===qty?true:false}>
                            <AddCircleIcon/>
                        </Button>
                        <div>{qty}</div>
                        <Button onClick={()=>removeAdded(itm.id, itm)}>
                            <RemoveCircleIcon />
                        </Button>
                    </CardActions>
                }
               {/* --------------- --------------- --------------- --------------- ---------------  */}
               </CardContent>
                
            </Card>
        </>
    )
}