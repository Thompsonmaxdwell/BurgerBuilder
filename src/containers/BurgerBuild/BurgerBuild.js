import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ul/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/Ul/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE  = {
    salad :0.5,
    bacon: 0.4,
    cheese:1.3,
    meat: 0.7
}


class BurgerBuild extends Component {
         
    state = {
        ingredients : null,
        totalPrice : 4 ,
        purchasable: false,
        purchasing: false,
        loading: false,
        error : false
    }
 
    componentDidMount (){
       axios.get('https://burgerbuilder-1213d.firebaseio.com/ingredients.json')
            .then(response =>{
                // console.log(response)
                this.setState({ingredients : response.data})
            })
            .catch(error =>{
               this.setState({error: true})
             
            })
   }
     updatePurchasaState = (ingredients) =>{ 
         const sum = Object.keys(ingredients)
             .map(igKey =>{
                 return ingredients[igKey];
             })
             .reduce((sum, el) =>{
                 return sum + el;
             }, 0) 
        this.setState({purchasable: sum > 0})
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
         this.updatePurchasaState(updateIngredients)


    }


    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const  newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice : newPrice, ingredients :updateIngredients})
        this.updatePurchasaState(updateIngredients)
    }

  purchaseHandler = () =>{
       this.setState({purchasing : true});
  }

  purchaseCancelHandler = () =>{
     this.setState({purchasing : false})
 } 
 
 purchaseContinueHandler =() =>{
     const queryParams = [];

     for(let i in this.state.ingredients){
         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        queryParams.push('price=' + this.state.totalPrice)
     const queryString = queryParams.join('&')
    
    this.props.history.push({
         pathname :'/checkout',
         search: '?' + queryString,
        });
   
 }

    render() { 
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
         }

    let orderSummary = null;
    let burger = this.state.error ? <p style={{textAlign:'center', padding:'20px'}}><strong>Ingredients Can't be Loaded Due to Server Or  Network Problem</strong></p> : <Spinner/>

   
    if(this.state.ingredients){
        burger =  (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                purchasable = {!this.state.purchasable}
                orderd={this.purchaseHandler}
                price ={this.state.totalPrice}/>
            </Aux>
        );

        orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients}
            price ={this.state.totalPrice}
            purchaseCancelled ={this.purchaseCancelHandler}
            purchaseContinued ={this.purchaseContinueHandler}/>
    }

    if(this.state.loading){
        orderSummary = <Spinner/>
   }

        return (  
            <Aux> 
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                 {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
  
export default WithErrorHandler(BurgerBuild, axios) ;