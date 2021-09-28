import React from 'react';
// { name, label, value, onChange }
const Input = ({ name, label, value, onChange, error }) => {
    return <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
            autoFocus
            name={name}
            value={value}
            onChange={onChange}
            id={name}
            type="text"
            className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}

    </div>;

}

export default Input;