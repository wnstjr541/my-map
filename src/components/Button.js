import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
    width: ${(props) => props.width || '400px'};
    height: 48px;
    background: #05141F;
    border: 0px;
    color: #fff;
    cursor:pointer;
    
`;

const Button = ({children, onClick, width, style}) => {
    return (
        <ButtonStyle onClick={onClick} width={width} style={style}>{children}</ButtonStyle>
    );
}

export default Button;