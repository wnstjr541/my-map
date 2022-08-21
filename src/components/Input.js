import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
    width: ${(props) => props.width || '400px'};
    height: 48px;
    border: 1px solid #D9DDE2;
    border-radius: 2px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    padding: 0px 10px;
    &:focus {
        outline: 1px solid #05141F;
    }
`;

const Input = ({id, type, onChange, onKeyUp, placeholder, value, width}) => {
    return (
        <InputStyle 
            id={id}
            type={type} 
            onChange={onChange}
            onKeyUp={onKeyUp}
            placeholder={placeholder}
            required={true}
            value={value}
            maxLength="64"
            width={width}
        />
    );
}

export default Input;