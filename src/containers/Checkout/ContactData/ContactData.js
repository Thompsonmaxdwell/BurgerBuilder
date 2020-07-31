import React, { Component } from 'react';
import Button from '../../../components/Ul/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/Ul/Spinner/Spinner';
import Input from '../../../components/Ul/input/input';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
                elementType :'input',
                elementConfig :{
                    type :'text',
                    placeholder : "Your Name"
                },
                value : '',
                validation :{
                    required : true
                },
                valid:false,
                touched :false
                
            },
			email: {
                elementType :'input',
                elementConfig :{
                    type :'email',
                    placeholder : "Your E-mail"
                },
                value : '',
                validation :{
                    required : true
                },
                valid:false,
                touched :false
            },
			street: {
                elementType :'input',
                elementConfig :{
                    type :'text',
                    placeholder : "Your Street"
                },
                value : '',
                validation :{
                    required : true
                },
                valid:false,
                touched :false
            },
			zipCode: {
                elementType :'input',
                elementConfig :{
                    type :'text',
                    placeholder : "Your ZIP Code"
                },
                value : '',
                validation :{
                    required : true,
                    minLength : 5,
                    maxLength : 5,
                },
                valid:false,
                touched :false
            },
			country: {
                elementType :'input',
                elementConfig :{
                    type :'text',
                    placeholder : "Your Country"
                },
                value : '',
                validation :{
                    required : true
                },
                valid:false,
                touched :false
            },
			deliveryMethod: {
                elementType :'select',
                elementConfig :{
                    options :[
                        {value :"Fastest", displayValue : 'Fastest'}, 
                        {value :"Cheapest", displayValue : 'Cheapest'}
                    ]
                },
                value : 'Fastest',
                validation : {},
                valid: true,
            }
		},
        loading: false,
        formIsValid : false
	};
	orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({ loading: true });
        const formData = {};

        for(let formElemenIndentifier in this.state.orderForm){
             formData[formElemenIndentifier] = this.state.orderForm[formElemenIndentifier].value
        }

		let order = {
			ingredients: this.props.ingredients,
            price: this.props.price,
            orderForm : formData
		};
		axios
			.post('/order.json ', order)
			.then((response) => {
				console.log(response);
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((error) => {
				console.log(error);
				this.setState({ loading: false });
			});
    };

    checkValidity(value, rules){ 
        let isValid =  true;
        if(!rules) return true 

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length  >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length  <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIndentifier)=>{
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updateOrderForm[inputIndentifier]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation)
        updateFormElement.touched = true;
        updateOrderForm[inputIndentifier] =  updateFormElement;
       
        let formIsValid = true;
        for(let inputIndentifier in updateFormElement){
            formIsValid = updateFormElement[inputIndentifier].valid && formIsValid;
        }
      console.log(formIsValid)
        this.setState({orderForm : updateOrderForm, formIsValid: formIsValid})
    }
    
	render() {
        const formElementArray = [];
        for(let key in this.state.orderForm){ 
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

		let form = (
			<form onSubmit={this.orderHandler}>
   				{formElementArray.map( formElement =>(
                   <Input 
                       key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig} 
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validation}
                       touched={formElement.config.touched}
                       changed={(event) =>this.inputChangedHandler(event, formElement.id)}/>
                 ))}
				<Button btnType="Success" disabled={!this.state.formIsValid}> 
					ORDER
				</Button>
			</form>
		); 
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your Contact</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
