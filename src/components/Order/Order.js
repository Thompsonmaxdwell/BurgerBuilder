import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const Ingredients = [];

    for(let IngredientName in props.ingredients){
      
      Ingredients.push(
          {
          name  :IngredientName,
          amount :props.ingredients[IngredientName]
        }
        )

    }
    console.log(Ingredients)
    const ingredientsOutOut = Ingredients.map(ig =>{
       return <span 
       style={{
         textTransform:'capitalize',
         display: 'inline-block',
         margin:'0 8px',
         border:'1px solid #ccc',
         padding:'5px'
        }}
       key={ig.name}>(<strong>{ig.name}</strong>) ({ig.amount})</span>
    });
      return (
        <div className={classes.Order}>
             <p>Ingredients : {ingredientsOutOut}</p>
            <p>Price <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
       </div>
  );
};
 
export default  order;