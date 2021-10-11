import classes from './Input.module.css';

const Input = (props) => {
	return(
		<div className={classes.input}>
			<label htmlFor="input">{props.label}</label>
			<input {...props.input} />
		</div> 
	)
}

export default Input;