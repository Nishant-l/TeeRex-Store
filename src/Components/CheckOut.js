import { useState } from 'react'
import { CardComp } from './Card'
import {ShowTotal} from './ShowTotal';

export const CheckOut = ({purchessList, modifyItemToPurchessList, checkoutState, total}) => {
    
    return(
        <div style={{display:'flex', flexDirection: "row",alignItems: "center", justifyContent: "spaceEvenly" }}>
        <div style={{width:'60vw', height:'85vh', overflow:'scroll', scrollBehavior:'smooth',mergin:'2%' ,display:'flex', flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'}}  >
             {Object.keys(purchessList).filter((e)=>purchessList[e].inBag>0).map((entry)=>{
                 return(
                    <div key={purchessList[entry].id.toString()} style={{marginBottom:'10px'}}>
                        <CardComp 
                            itm={purchessList[entry]}
                            modifyItemToPurchessList={modifyItemToPurchessList}
                            purchessList={purchessList}
                            checkoutState={checkoutState}
                        />
                    </div>
                 )
             })}
        </div>
        <div style={{width:'30vw', marginLeft:'2%'}}>
            <ShowTotal total={total} />
        </div>
        </div>
    )
}