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
    purchessList
}) =>{

    let q = typeof purchessList[itm.id] === 'number'? purchessList[itm.id] : 0;
    const[isAddToBag, setIsAddedToBag] = useState((purchessList[itm.id]&&true));
    const[qty,setQty] = useState(q);

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
            <Card sx={{width:320, height:400, boxShadow: 8}} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:"flex-end", backgroundColor:'rgb(18, 18, 18)', color:'white', borderRadius:'10px'}}>
                
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
                    sx={{width:200, borderRadius:10}}
                />
                {/* --------------- --------------- --------------- --------------- ---------------  */}



                {/* --------------- --------------- CARD Content --------------- ---------------  */}
                <CardContent style={{display:'flex', flexDirection:'column'}}>
                    <div>Price: {itm.price}<>{itm.currency==='INR'?' ₹':' $'}</></div>
                    <div>Gender: {itm.gender}</div>
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
               </CardContent>
                
            </Card>
        </>
    )
}