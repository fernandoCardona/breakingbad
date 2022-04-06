import React,{ useState, useEffect } from 'react';
//0.0-Limpiamos el proyecto de archivos no necesarios y instalamos Style Components ( npm i @emotion/core @emotion/styled )
//0.1-Importamos Styled Components
import styled from '@emotion/styled';
//4.0-Creamos un componente Frase que reciba como props la frase aleatoria y lo importamos 
import Frase from './components/Frase';

//1.0-Creamos un un contenedor y el boton con styled Components para que el usuario lo presione y la Api nos devuelva una frase
const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
`;

const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  margin-top: 3rem;
  padding: 1rem 3rem; 
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .8s ease;

  :hover {
    cursor: pointer;
    background-size: 400px;
  }
`;

function App() {
  //3.0-Creamos un state donde almacenar la frase que viene de la api y poderla pasar a otro componente
  const [frase, guardarFrase] = useState({});


  //2.0-Creamos una funcion que nos devuelva una frase aleatoria coon async/await y Fetch
  const consultarAPI = async () => {
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
      const frase = await api.json();
      guardarFrase(frase[0]);
        
  }
//5.0-Agregamos a import de react useeffect a react, que actua como un document.ready/addEventListener
  useEffect(() => {
    //5.1-llamamos a la funcion consultarAPI() asi cuando inicie o recargue la pagina se ejecute la funcion
    consultarAPI();
  }, []);


  return (
    <Contenedor>
        <Frase frase={frase} />
        <Boton onClick={consultarAPI}>Obtener frase</Boton>
    </Contenedor>
  );
}

export default App;
