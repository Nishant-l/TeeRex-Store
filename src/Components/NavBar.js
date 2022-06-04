import 'bulma/css/bulma.min.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BallotIcon from '@mui/icons-material/Ballot';
import Badge from '@mui/material/Badge';

export const NavBar = (
    {
        count,
        list
    }
) => {
    return(
        <>
        <div className="navbar is-danger" role="navigation" aria-label="main navigation" >
        <div className="navbar-brand" style={{alignItems:'center', justifyContent:'space-between',width:'100%'}}>
            <h1 className="title is-3 " style={{color:'black', borderTop:'4px solid black', borderBottom:'4px solid black',margin:'10px'}}>
            TeeRex Store
            </h1>      
            
                
            
            <div className="navbar-item">
                    <div className="buttons">
                        <button className="button is-info ">
                            <BallotIcon fontSize="medium"/>
                            <strong>Products  </strong>
                        </button>
                            <button className="button is-info ">
                                <Badge badgeContent={count} color="secondary">
                                        <ShoppingCartIcon fontSize="medium"/>
                                        <strong>Cart  </strong>
                                </Badge>
                            </button>
                    </div>
                </div>      
        </div>
        </div>   
        </>
    )
}