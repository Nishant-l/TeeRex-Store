import MediaControlCard from './CheckoutCard'

export const CheckOut = ({purchessList}) => {
    return(
        <>
        <div style={{width:'30vw', margin:'auto', height:'1vh'}}>
            {/* <MediaControlCard/>
             */}
             {Object.keys(purchessList).map((entry)=>{
                //  {console.log(entry)};
                return (<>
                    <p style={{color:'white'}}>{purchessList[entry].id}</p>
                    {/* <image src='{entry.url}'></image> */}
                    <p style={{color:'white'}}>{purchessList[entry].name}</p>
                    <p style={{color:'white'}}>{purchessList[entry].inBag}</p>
                 </>)
             })}
        </div>
        </>
    )
}