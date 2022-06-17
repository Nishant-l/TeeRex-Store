import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
const style={
    color: pink[800],
    '&.Mui-checked': {
      color: pink[600],
    },
  }
  
export const FilterComponent = ({itemStore, setItems}) => {
    
    const [gender, setGender] = useState([]);
    const [colour, setColour] = useState([])
    const [price, setPrice] = useState([]);
    const [type, setType] = useState([]);

    const updateDisplay = (Color, Gender, Type, Price) => {
        let newWantedItem = itemStore.filter((itm)=> Color.includes(itm.color));
        if(newWantedItem.length === 0) {
            newWantedItem = itemStore;
        }
        if(Gender.length!==0) newWantedItem = newWantedItem.filter((itm)=> Gender.includes(itm.gender));
        if(newWantedItem.length === 0) newWantedItem = itemStore;
        if(Type.length!==0) newWantedItem = newWantedItem.filter((itm)=> Type.includes(itm.type));
        if(newWantedItem.length === 0) newWantedItem = itemStore;
        if(Price.length!==0){
            let pricesVeriation = [];
            for(let pp of Price){
                pricesVeriation = [...pricesVeriation,...pp.split('-')]
            }

            let newNewWantedItm = [];
            for(let indx = 0; indx<pricesVeriation.length; indx+=2){
                let lowLimit = pricesVeriation[indx];
                let highLimit = pricesVeriation[indx+1];
                newNewWantedItm = [...newNewWantedItm,...newWantedItem.filter((itm)=> (itm.price>=lowLimit&&itm.price<=highLimit))]
            }
            newWantedItem = newNewWantedItm;
        }
        setItems(newWantedItem);
    }
 
    const handelClickColor = (e) => {
        let newColours = [];
        if(e.target.value!==undefined && colour.includes(e.target.value)){
            newColours = colour.filter((c)=> c!==e.target.value);
            setColour(newColours);
            updateDisplay(newColours, gender, type, price);
        }else if(e.target.value!==undefined){
             newColours = [...colour, e.target.value];
            setColour(newColours);
            updateDisplay(newColours, gender, type, price);
        }
    }

    const handelClickGender = (e) => {
        let newGender = [];
        if(e.target.value!==undefined && gender.includes(e.target.value)){
            newGender = gender.filter((c)=> c!==e.target.value);
            setGender(newGender);
            updateDisplay(colour, newGender, type, price);
        }else if(e.target.value!==undefined){
            newGender = [...gender, e.target.value];
            setGender(newGender);
            updateDisplay(colour, newGender, type, price);
        }

    }

    const handelClickPrice = (e) => {
        let newPrice = [];
        if(e.target.value!==undefined && price.includes(e.target.value)){
            newPrice = price.filter((c)=> c!==e.target.value);
            setPrice(newPrice);
            updateDisplay(colour, gender, type, newPrice);
        }else if(e.target.value!==undefined){
            newPrice = [...price, e.target.value];
            setPrice(newPrice);
            updateDisplay(colour, gender, type, newPrice);
        }
    }

    const handelClickType = (e) => {
        let newType = [];
        if(e.target.value!==undefined && type.includes(e.target.value)){
            newType = type.filter((c)=> c!==e.target.value);
            setType(newType);
            updateDisplay(colour, gender, newType, price);
        }else if(e.target.value!==undefined){
            newType = [...type, e.target.value];
            setType(newType);
            updateDisplay(colour, gender, newType, price);
        }
    }

    return(
        <List style={{maxHeight:'80vh', overflow:'scroll'}} >
            <h2 style={{color:'white'}}>Colour</h2>
            <ListItem >
                <FormGroup onClick={handelClickColor} >
                    <FormControlLabel value='Red'  control={<Checkbox sx={style}  />} label="Red" />
                    <FormControlLabel value='Blue' control={<Checkbox sx={style}/>} label="Blue" />
                    <FormControlLabel value = 'Green' control={<Checkbox sx={style}/>} label="Green" />
                </FormGroup>
            </ListItem>


            <h2 style={{color:'white'}}>Gender</h2>
            <ListItem>
                <FormGroup onClick={handelClickGender}>
                    <FormControlLabel value={'Men'}  control={<Checkbox sx={style} />} label="Men" />
                    <FormControlLabel value={'Women'} control={<Checkbox sx={style}/>} label="Women" />
                </FormGroup>
            </ListItem>

            <h2 style={{color:'white'}}>Price</h2>
            <ListItem>
                <FormGroup onClick={handelClickPrice}>
                    <FormControlLabel value={'0-250'} control={<Checkbox sx={style} />} label="0-Rs250" />
                    <FormControlLabel value={'251-450'} control={<Checkbox sx={style}/>} label="251-Rs450" />
                    <FormControlLabel value={'451-99999'} control={<Checkbox sx={style}/>} label="Rs451" />
                </FormGroup>
            </ListItem>


            <h2 style={{color:'white'}}>Type</h2>
            <ListItem>
                <FormGroup onClick={handelClickType}>
                    <FormControlLabel value={'Polo'}  control={<Checkbox sx={style} />} label="Polo" />
                    <FormControlLabel value={'Hoodie'} control={<Checkbox sx={style}/>} label="Hoodie" />
                    <FormControlLabel value={'Basic'} control={<Checkbox sx={style}/>} label="Round" />
                </FormGroup>
            </ListItem>
        </List>
    )
}