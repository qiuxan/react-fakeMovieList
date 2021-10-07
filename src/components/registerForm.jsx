import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import * as userService from '../services/userService';

class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }
    doSubmit = async () => {
        //to backend
        // console.log('submitted');
        await userService.register(this.state.data);
    }



    render() {
        return <div><h1>Rigister </h1>

            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name', 'Name')}
                {this.renderButton('Register')}
            </form>
        </div>;
    }
}

export default RegisterForm;