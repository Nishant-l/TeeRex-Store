import 'bulma/css/bulma.min.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BallotIcon from '@mui/icons-material/Ballot';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useState } from 'react';

export const NavBar = (
    {
        count,
        list,
        searchItem
    }
) => {

    const[serchState, setSerchState] = useState(false);
    const [searchWord, setSearchWord] = useState('');

    const searchAction = (e)=>{
        e.preventDefault();
        searchItem(searchWord);
        setSearchWord('');
    }

    return(
        <>
        <div className="navbar is-danger" role="navigation" aria-label="main navigation" >
        <div className="navbar-brand" style={{alignItems:'center', justifyContent:'space-between',width:'100%'}}>
            <h1 className="title is-3 " style={{color:'black', borderBottom:'4px solid black', borderTop:'4px solid black',margin:'10px'}}>
            {/* TeeRex Store */}
           <div style={{backgroundColor:'yellow'}}> <strong>🛍🛒🏬</strong></div>
            </h1>      
            
           {serchState && <form onSubmit={searchAction}> 
                                        <div style={{width:'40vw', display:'flex'}}>
                                            <input value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} class="input is-normal is-dark" type="text" placeholder="Search Heare ..."  />  
                                            <button className="button is-dark ">
                                                <SearchIcon fontSize="medium"/>
                                            </button>
                                        </div>
                                    </form>}
            
                        <div className="navbar-item">
                                <div className="buttons">
                                <button className="button is-info " onClick={() => {
                                if(serchState===true){
                                    searchItem('all');
                                }
                                setSerchState(!serchState);}
                         }>
                            { !serchState &&   <SearchIcon fontSize="medium"/>}
                            { serchState &&   <SearchOffIcon fontSize="medium"/>}
                        </button>

                        <button className="button is-info ">
                            <BallotIcon fontSize="medium"/>
                        </button>

                        <button className="button is-info ">
                            <Badge badgeContent={count} color="secondary">
                                    <ShoppingCartIcon fontSize="medium"/>
                            </Badge>
                        </button>

                    </div>
                </div>      
        </div>
        </div>   
        </>
    )
}