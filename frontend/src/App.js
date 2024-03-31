import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./Components/Form.js";
import Grid from "./Components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: ${(props) => props.fontSize}px; /*Aplica o tamanho da fonte*/
`;

const Title = styled.h2``;

const ButtonContainer = styled.div `
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
`;

//Estilo para o campo de entrada
const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  font-size: ${(props) => props.fontSize}px; //Aqui aplica o tamanho da fonte
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [fontSize, setFontSize] = useState(16); // Tamanho inicial da fonte

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  const increaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 2); // Aumenta a fonte em 2px
  };

  const decraseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize - 2); // Diminui a fonte em 2px
  };

  return (
    <div>
      <Container fontSize={fontSize}>
        <Title>Adicionar aluno(a) / Registrar presença</Title>

        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} fontSize={fontSize}/>
        <Title>Lista de presença</Title>
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>

      {/* Botões estilizados e fixados no canto inferior da tela e desaparece automaticamente */}
      <ButtonContainer>
        <Button onClick={increaseFontSize}>Aumentar Fonte</Button>
        <Button onClick={decraseFontSize}>Diminuir Fonte</Button>
      </ButtonContainer>

      {/* Toastify configurado para aparecer no centro da tela e desaparecer automaticamente */}
      <ToastContainer autoClose={3000} position="top-center" />
      <GlobalStyle />
    </div>
  );
}

export default App;
