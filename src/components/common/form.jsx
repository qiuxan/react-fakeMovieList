import React, { Component } from 'react';
import Joi from "joi-browser";

class Form extends React.Component {

    state = {
        data: {},
        errors: {}
    }



    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });

        if (errors) return;

        this.doSubmit();
    }



    handleChange = ({ currentTarget: input }) => {

        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data }
        data[input.name] = input.value;
        this.setState({ data, errors });
    }




    validateProperty = ({ name, value }) => {
        const schema = { [name]: this.schema[name] };
        const obj = { [name]: value };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    validate = () => {
        const option = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, option);
        const { error } = result;
        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return Object.keys(errors).length === 0 ? null : errors;
    }






}

export default Form;