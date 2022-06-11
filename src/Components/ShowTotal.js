import 'bulma/css/bulma.min.css';
import { Divider } from '@mui/material';

export const ShowTotal = ({total}) => {
    return(
        <article className="message is-danger">
            <div className="message-header" style={{justifyContent:'center'}}>
                <p>Total Amount</p>
            </div>
            <div className="message-body" style={{textAlign:'justify'}}>
                <div>Total MRP: {total} ₹</div>
                <div> {`Discount   :0 ₹`}</div>
                <Divider sx={{margin:'5px', color:'black'}}/>
                <div><strong>Total: {total} ₹</strong></div>
                <div style={{marginTop:'10px' }}><button class="button is-success" style={{width:'100%'}}>Pay</button></div>
            </div>
        </article>

    )
}