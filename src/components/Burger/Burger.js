 import React from 'react';
 import classes from './Burger.module.css';
 import BurgerIngredient from './Burgeringredient/Burgeringredient';
//  import {withRouter} from 'react-router-dom';

 const burger = (props) => {
//  console.log(props)
   let  transformIngredients = Object.keys(props.ingredients)
       .map(igKey =>{
           return [...Array(props.ingredients[igKey])].map((w, i)=>{
              return <BurgerIngredient key= {igKey + i} type={igKey}/>;
      })
   })
   .reduce((arr, el)=>{
      return arr.concat(el)
   },[])
   if(transformIngredients.length === 0){
      transformIngredients = <p>Please Start adding Ingredients!</p>

   }   

     return ( 
         <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
              {transformIngredients}
            <BurgerIngredient type="bread-bottom"/>
 
         </div>
      );
 }
  
 export default burger;