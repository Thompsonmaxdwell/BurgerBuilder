import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';




const INGREDIENT_PRICE  = {
    salad :0.5,
    bacon: 0.4,
    cheese:1.3,
    meat: 0.7
}


class BurgerBuild extends Component {
         
    state = {
        ingredients : {
            salad :0,
            bacon: 0,
            cheese:0,
            meat: 0
        },
        totalPrice : 4 
    }
 
    addIngredientHandler = (type)=>{
         const oldCount = this.state.ingredients[type];
         const updateCount = oldCount + 1;
         const updateIngredients= {
             ...this.state.ingredients
         }
         updateIngredients[type] = updateCount;
         const priceAddition = INGREDIENT_PRICE[type];
         const oldPrice = this.state.totalPrice;
         const  newPrice = oldPrice + priceAddition;

         this.setState({totalPrice : newPrice, ingredients :updateIngredients})

    }


    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients= {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const  newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice : newPrice, ingredients :updateIngredients})
    }
    render() { 

        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        return (  
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                 <BuildControls 
                 ingredientAdded = {this.addIngredientHandler}
                 ingredientRemoved = {this.removeIngredientHandler}
                 disabled = {disabledInfo}
                 price ={this.state.totalPrice}/>
            </Aux>
        );
    }
}
  
export default BurgerBuild;