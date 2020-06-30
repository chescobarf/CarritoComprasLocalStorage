import React from 'react';
import styled from '@emotion/styled';


const ContenedorFrase=styled.div`
    padding: 3rem;
    border-radius: 5px;
    background-color:#fff;
    max-width:800px;
    @media(min-width:992px){
        margin-top:10rem;
    }
    h1{
        font-family: Arial,Helvetica,sans-serif;
        text-align:center;
        position:relative;
        padding-left:4rem;

        &::before{
            content:open-quote;
            font-size: 10rem;
            color:black;
            position:absolute;
            left:-1rem;
            top: -2rem;
        }
    }
    p{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size:1.3rem;
        font-weight:bold;
        text-align:right;
        color:#666;
        margin-top:2rem;
    }
    img{
        position:absolute;
        height:20rem;
        width:10rem;
        top:30%;
        left:8%;
        
        @media(max-width:992px){
            height:10rem;
            width:5rem;
            top: 55%;
        }
    }
`;

const Frase = ({frase}) =>{
    return (
        <ContenedorFrase>
            <h1>{frase.quote}</h1>
             <p>{frase.character}</p>
             <img src={frase.image}></img>
        </ContenedorFrase>
        
    );
}

export default Frase;