import { useState } from "react"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const CardComp = ({
    itm,
    modifyItemToPurchessList
}) =>{

    const[isAddToBag, setIsAddedToBag] = useState(false);
    const[qty,setQty] = useState(0);

    const addToCart = (id) => {
        setQty(1);
        setIsAddedToBag(true)
        modifyItemToPurchessList(id,'add')
    }

    const addMore = (id) => {
        if(itm.quantity>=qty+1){
            setQty(qty+1);
            modifyItemToPurchessList(id,'add')
        }
    }

    const removeAdded = (id) => {
        if(qty-1>=0){
            if(qty-1===0){
                setIsAddedToBag(false)
            }
            setQty(qty-1);
            modifyItemToPurchessList(id,'sub')
        }
    }

    return(
        <>
            <Card sx={{width:320, height:380}} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:"flex-end"}}>
                
                {/* --------------- --------------- ---------HEADER------ --------------- ---------------  */}
                <CardHeader
                    title={itm.name}
                />
                {/* --------------- --------------- --------------- --------------- ---------------  */}


                {/*--------------- --------------- -------CARD MEDIA IMG-------- --------------- ---------------   */}
                <CardMedia
                    component="img"
                    image={`${itm.imageURL}`}
                    alt={itm.name}
                    sx={{width:200}}
                />
                {/* --------------- --------------- --------------- --------------- ---------------  */}



                {/* --------------- --------------- CARD Content --------------- ---------------  */}
                <CardContent style={{display:'flex', flexDirection:'column'}}>
                    <div>Price: {itm.price}</div>
                    <div>Quantity Left: {itm.quantity}</div>
                </CardContent>
                {/* --------------- --------------- --------------- ---------------  */}


                {/*--------------- ADD and Substract Button  --------------- */}
                {
                    !isAddToBag &&
                    <CardActions>
                    <Button 
                        size="medium"
                        className="button is-primary" 
                        disabled={itm.quantity===qty?true:false}
                        onClick={()=>addToCart(itm.id)}
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
                        <CardActions>
                    <Button onClick={()=>addMore(itm.id)} disabled={itm.quantity===qty?true:false}>
                        <AddCircleIcon/>
                    </Button>
                    <div>{qty}</div>
                    <Button onClick={()=>removeAdded(itm.id)}>
                        <RemoveCircleIcon />
                    </Button>
                    </CardActions>
                }
               {/* --------------- --------------- --------------- --------------- ---------------  */}
                
            </Card>
        </>
    )
}