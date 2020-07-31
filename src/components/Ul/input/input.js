import React from 'react';
import classes from './input.module.css';

const input = (props) => {
	let inputElment = null;

   const inputClasess = [classes.InputElement];

   if(props.invalid && props.shouldValidate &&  props.touched){
	   inputClasess.push(classes.Invalid)
   }

	switch (props.elementType) {
		case 'input':
			inputElment = <input {...props.elementConfig} value={props.value} className={inputClasess.join(' ')} onChange={props.changed}/>;
			break;
		case 'textarea':
			inputElment = <textarea {...props.elementConfig} value={props.value} className={inputClasess.join(' ')} onChange={props.changed}/>;
			break;
		case 'select':
			inputElment = (
				<select value={props.value} className={inputClasess.join(' ')} onChange={props.changed}>
					{props.elementConfig.options.map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.displayValue}
							</option>
						);
					})}
				</select>
			);

			break;
		default:
			inputElment = <input {...props.elementConfig} value={props.value} className={inputClasess.join(' ')} onChange={props.changed}/>;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElment}
		</div>
	);
};

export default input;
