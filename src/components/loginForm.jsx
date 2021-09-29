import React, { Component } from 'react';
import Input from './common/input';
import Joi from "joi-browser";

class LoginForm extends Component {

    state = {
        account: { username: '', password: '' },
        errors: {}
    }
    // username = React.createRef();

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    }


    validateProperty = ({ name, value }) => {

        const schema = { [name]: this.schema[name] };
        // const obj = { [name]: value.trim() };
        const obj = { [name]: value };
        
        const result = Joi.validate(obj, schema);
        const { error } = result;
        // console.log(error.details[0].message);

        if (!error) return null;
        return error.details[0].message;

        // if (name === 'username') {
        //     if (value.trim() === '') return 'user name is required';
        // }

        // if (name === 'password') {
        //     if (value.trim() === '') return 'Password name is required';
        // }

    }

    validate = () => {
        const option = { abortEarly: false };

        // console.log(this.state.account);

        const result = Joi.validate(this.state.account, this.schema, option);
        const { error } = result;
        // console.log(result.error.details);
        // console.log(result.error.details[0].message);

        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        // console.log(errors);
        return Object.keys(errors).length === 0 ? null : errors;


        // const errors = {};
        // const { account } = this.state;
        // if (account.username.trim() === '')
        //     errors.username = "Username is required.";

        // if (account.password.trim() === '')
        //     errors.password = "Password is required.";
        // return Object.keys(errors).length === 0 ? null : errors;
    }

    handleSubmit = e => {
        e.preventDefault();


        const errors = this.validate();
        // console.log(errors);
        this.setState({ errors: errors || {} });

        if (errors) return;
        // call the server
        console.log('submitted');
    }
    handleChange = ({ currentTarget: input }) => {

        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        // console.log(errorMessage);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account }
        // console.log(e.currentTarget.value);
        account[input.name] = input.value;
        this.setState({ account, errors });
    }

    render() {

        // console.log(this.schema);

        const { account, errors } = this.state;
        return <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                {/* <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        autoFocus
                        name="username"
                        value={account.username}
                        onChange={this.handleChange}
                        id="username"
                        type="text"
                        className="form-control"
                    />
                </div> */}

                <Input
                    name="username"
                    label="Username"
                    value={account.username}
                    onChange={this.handleChange}
                    error={errors.username}
                />

                <Input
                    name="password"
                    label="Password"
                    value={account.password}
                    onChange={this.handleChange}
                    error={errors.password}

                />

                {/* <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" id="password" type="text" className="form-control" value={account.password}
                        onChange={this.handleChange} />

                </div> */}
                <button className="btn btn-primary">Login</button>
            </form>
        </div>;
    }
}

export default LoginForm;