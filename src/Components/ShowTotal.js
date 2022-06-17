import 'bulma/css/bulma.min.css';
import { Divider } from '@mui/material';

export const ShowTotal = ({total}) => {
    return(
        <article className="message is-danger">
            {total !== 0 && <div className="message-header" style={{justifyContent:'center'}}>
                <p>Total Amount</p>
            </div>}
            <div className="message-body" style={{textAlign:'justify'}}>
            {total!==0 ?
                <>
                <div>Total MRP: {total} ₹</div>
                <div> {`Discount   :0 ₹`}</div>
                <Divider sx={{margin:'5px', color:'black'}}/>
                <div><strong>Total: {total} ₹</strong></div>
                <div style={{marginTop:'10px' }}><button className="button is-success" style={{width:'100%'}}>Pay</button></div>
                </>
                :
                <>
                    Your CART is Empty, Please Add Items...🚚...🚚...🚚
                </>}
            </div>
        </article>
    )
}