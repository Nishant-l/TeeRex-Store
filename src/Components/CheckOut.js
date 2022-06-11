import { useState } from 'react'
import { CardComp } from './Card'

export const CheckOut = ({purchessList, modifyItemToPurchessList, checkoutState, total}) => {
    
    return(
        <>
        <div style={{width:'60vw', mergin:'2%' ,display:'flex', flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'}}  >
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
            <strong>
                {total}
            </strong>
        </>
    )
}