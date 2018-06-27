import React from 'react';

export default ({ input, label }) => {
    // console.log(props);
    // const input = props.input;
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    )
}