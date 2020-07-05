import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../Ul/Button/Button';

class OrderSummary  extends Component{

  componentDidUpdate () {
    console.log('[OrderSummary ] willUpdate')
  }

  render ()  {
    const  ingredintSummary = Object.keys(this.props.ingredients)
           .map(igKey =>{
               return (
                 <li key={igKey + 1}>
                    <span style={{textTransform: 'capitalize' }}>{igKey}</span>:
                    {this.props.ingredients[igKey]}
                  </li>)
           });

     return (

        <Aux>
              <h3>Your Order</h3>
              <p>A delicious burger with the follwing ingredints:</p>
              
              <ul>
                {ingredintSummary } 
              </ul>
              <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
              <p>Continue to Ckeckout?</p>

              <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
              <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTIUNE</Button>
          </Aux>
     );
  }
    

 

    
       
}
 
export default OrderSummary;