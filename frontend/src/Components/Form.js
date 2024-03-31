import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 25px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto; /* Mover os botões para a direita */
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  color: white;
  height: 42px;
`;

const SaveButton = styled(Button)`
    background-color: #2c73d2;
    margin-left: auto; /* Alinhar com o final do input */
`;

const ClearButton = styled(Button)`
    background-color: #DC143C;
    margin-right: 10px; /* Adicionando margem à direita */
`;

const Form = ({getUsers, onEdit, setOnEdit}) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
            user.presenca.value = onEdit.presenca;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.data_nascimento.value ||
            !user.presenca.value 
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        const presencaValue = user.presenca.value.trim().toUpperCase(); //Remover espaços e converter para maiúscula

        if (presencaValue && presencaValue !== 'F' && presencaValue !== 'P') {
            return toast.error("Presença inválida! Use 'P' para presente ou 'F' para falta.");
        }
//
    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
          presenca: presencaValue,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
          presenca: presencaValue,//verificar user
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";
    user.presenca.value = "";

    setOnEdit(null);
    getUsers();
  };

  const handleClear = () => {
    const user = ref.current;

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";
    user.presenca.value = "";

    setOnEdit(null);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>R.A.</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data</Label>
        <Input name="data_nascimento" type="date" defaultValue={getCurrentDate()}/>
      </InputArea>
      <InputArea>
        <Label>Presença</Label>
        <Input name="presenca" type="text"/>
      </InputArea>

      <ButtonContainer>
        <ClearButton type="button" onClick={handleClear}>LIMPAR</ClearButton>
        <SaveButton type="submit">SALVAR</SaveButton>
      </ButtonContainer>  
    </FormContainer>
  );
};

export default Form;