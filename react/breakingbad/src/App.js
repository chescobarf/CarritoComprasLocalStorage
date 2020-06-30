import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import Frase from './components/Frase';





const Contenedor= styled.div`
display:flex;
align-items:center;
padding-top: 3rem;
flex-direction:column;

`;
const Boton = styled.button `
background: -webkit-linear-gradient(top left, #09b8e4 0%,#0576c2 40%, #0948a7 100%);
  background-size: 500px;
  font-family: Arial,Helvetica,sans-serif;
  color:#fff;
  margin-top:1rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border:2px solid black;
  transition:all 0.7s ease;
  
  :hover{
    cursor:pointer;
    background-size: 700px;
  }
`;

function App() {

  //state de frase
  const [frase,obtenerFrase] = useState({});

  //forma con fetch
  // const consultarApi=()=>{
  //   const api=fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
  //   const frase=api.then(respuesta => respuesta.json());
  //   frase.then(resultado=>console.log(resultado))
  // }

  //forma con Async Await es nas utilizado
  const consultarApi = async() => {
    const api = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
    const frase = await api.json()
    obtenerFrase(frase[0]);
  }

  //cargar una frase automaticamente al cargar el componente
  useEffect (()=>{
      consultarApi();
  },[]); //esta depencdencia vacia hace que cargue al menos una vez

  return (
    <Contenedor>
      <Frase
        frase={frase}
      />
      <Boton onClick={consultarApi}>
        Give me my Quote!
      </Boton>
    </Contenedor>
    
  );
}

export default App;
