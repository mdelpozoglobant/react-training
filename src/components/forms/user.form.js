import React, { Component } from 'react';
import User from '../models/user';

import PropTypes from 'prop-types';

function Input(props) {
	const { attributes, handleChange } = props;
	const { name, value, hasError, required } = attributes;

	let labelClassName = 'label';

	labelClassName += hasError ? ' is-danger' : '';

	return (
		<div className="field">
			<div className="control">
				<label className={labelClassName}>{name} </label>
				<input type="text" className="input" name={name} value={value} required={required} onChange={handleChange} />
			</div>
		</div>
	);
}

class UserForm extends Component {
	BASE_URL = 'http://localhost:4000';
	API = 'users';
	state = {
		isInvalid: false,
		fields: {
			name: {
				name: 'name',
				value: '',
				hasError: false,
				required: true
			},
			surname: {
				name: 'surname',
				value: '',
				hasError: false,
				required: true
			},
			email: {
				name: 'email',
				value: '',
				hasError: false,
				required: true
			}
		}
	};

	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) {
			this.setState((prevState) => {
				let { fields } = prevState;
				let { name, surname, email } = this.props.user;

				fields.name.value = name;
				fields.surname.value = surname;
				fields.email.value = email;

				return { fields };
			});
		}
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { name, surname, email } = this.state.fields;
		const user = new User(0, name.value, surname.value, email.value);

		if (this.props.user) {
			user.id = this.props.user.id;
		} else {
			delete user.id;
		}

		this.props.completedForm(user);
	}

	onChange = ({ target }) => {
		const { name, value } = target;
		this.setState((prevState) => {
			const attr = prevState.fields[name];
			attr.value = value;
			attr.hasError = attr.required && !value;

			const isInvalid = this.validateForm();

			return { [name]: attr, isInvalid };
		});
	}

	validateForm = () => {
		const { fields } = this.state;

		return Object.keys(fields).some(key => fields[key].hasError);
	}

	goBack = () => {
		this.props.history.goBack();
	}

	render() {
		const { fields, isInvalid } = this.state;
		return (
			<>
				<form noValidate onSubmit={this.onSubmit} autoComplete="off">
					{
						Object.keys(fields).map((key, idx) => {
							return (
								<Input attributes={fields[key]} handleChange={this.onChange} key={idx} />
							)
						})
					}
					<div className="field has-text-centered">
						<button className="button" type="button" onClick={this.goBack}>Back</button>
						<button style={{ marginLeft: 15 }} className="button is-success" disabled={isInvalid} type="submit">{this.props.title} User</button>
					</div>
				</form>
			</>
		)
	}
}

UserForm.propTypes = {
	title: PropTypes.string,
	completedForm: PropTypes.func,
	test: PropTypes.string
};

export default UserForm;