import React from 'react';
import Joi from "joi-browser";
import Input from './input';
import Select from './select';

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


    renderButton = (label) => {

        return (<button
            disabled={this.validate()}
            className="btn btn-primary">{label}
        </button>);

        // console.log('submitted');
    }

    renderInput(name, label, type = "text") {
        const { data, errors } = this.state;

        return (<Input
            name={name}
            type={type}
            label={label}
            value={data[name]}
            onChange={this.handleChange}
            error={errors[name]}
        />);
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

}


export default Form;