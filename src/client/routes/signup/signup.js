import React from 'react';
import { createCustomer } from '../../../redux/actions/customers';
import { connect } from 'react-redux';

const Errors = ({errors}) => {
	return (
		<div style={{background: 'red', color: 'white'}}>
			<ul>
				{ errors.map((error, index) => <li key={`error-${index}`}>{error}</li>) }
			</ul>
		</div>
	)
}

class Signup extends React.Component {

	constructor() {
		super();

		this.state = {
			title: '',
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: []
		}

	}

	onInputChange = () => {

		this.setState({
			title: this.title.value,
			firstName: this.firstName.value,
			lastName: this.lastName.value,
			phone: this.phone.value,
	    email: this.email.value,
	    password: this.password.value,
	    confirmPassword: this.confirmPassword.value,
	  });

	}

	onSubmit = () => {
		
		let errors = [];

		if (!this.state.password || !this.state.confirmPassword) {
			errors = [...errors, 'Password is required!']
		}

		if (!this.state.lastName) {
			errors = [...errors, 'Last Name is required!']
		}

		if (!this.state.email) {
			errors = [...errors, 'Email is required!']
		}

		if (!this.state.phone) {
			errors = [...errors, 'Phone is required!']
		}

		if (this.state.password !== this.state.confirmPassword) {
			errors = [...errors, 'Passwords do not match!']
		}

		if (!errors.length) {
			this.props.createCustomer(this.state);
		} else {
			this.setState({
				...this.state,
				errors: errors
			})
		}

	}

  render() {

  	const { title, phone, firstName, lastName, email, password, confirmPassword, errors } = this.state;
    return(
    	<div>
    		
    		{ (errors.length) ? <Errors errors={errors} /> : null }

	      <div style={{display: 'block'}}>
	      	<span className="label label-default">
	      		Title <br />
	      		<select ref={el => this.title = el}>
	      			<option value="Mr" default>Mr</option>
	      			<option value="Mrs">Mrs</option>
	      			<option value="Ms">Ms</option>
	      			<option value="Dr.">Dr.</option>
	      			<option value="Prof.">Prof.</option>
	      		</select>
	      	</span> <br />
	      	<span className="label label-default">
	      		First Name <br />
	      		<input ref={el => this.firstName = el} name="email" value={firstName} required placeholder="First name" onChange={this.onInputChange} />
	      	</span> <br />
	      	<span className="label label-default">
	      		Last Name <br />
	      		<input ref={el => this.lastName = el} name="email" value={lastName} required placeholder="Last name" onChange={this.onInputChange} />
	      	</span> <br />
	      	<span className="label label-default">
	      		Email <br />
	      		<input ref={el => this.email = el} name="email" value={email} required placeholder="Email" onChange={this.onInputChange} />
	      	</span> <br />
	      	<span className="label label-default">
	      		Phone <br />
	      		<input ref={el => this.phone = el} name="phone" value={phone} required placeholder="Phone" onChange={this.onInputChange} />
	      	</span> <br />
	        <span className="label label-default">
	      		Password <br />
	        	<input ref={el => this.password = el} name="password" value={password} required placeholder="Password" onChange={this.onInputChange} />
	        </span> <br />

	        <span className="label label-default">
	      		Confirm Password <br />
	        	<input ref={el => this.confirmPassword = el} name="password" value={confirmPassword} required placeholder="Confirm Password" onChange={this.onInputChange} />
	        </span>
	      </div>
	      <div style={{display: 'block'}}>
	      	<button onClick={this.onSubmit}>Signup</button>
	      </div>
	      <div style={{display: 'block'}}>
	      	already client? please login <br />
	      	<a href="/login">Login</a>
	      </div>
	    </div>
    );

  }
}

export default connect(null, { createCustomer })(Signup);