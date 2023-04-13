import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function index() {
  const [alunos, setAlunos] = useState([]);

  //JSON representation [{nome: 'João', email: 'dycjh@example.com'},
  //                     { nome: 'Maria', email: 'dycjh@example.com' }]

  // useEffect(() => {funcao}, [controle])
  // function nomedaFuncao(){corpo da funcao}

  useEffect(() => {
    async function buscarAlunos() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setAlunos(data);
    }
    buscarAlunos();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
      <h2>Alunos Matriculados</h2>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {alunos.map((aluno) => (
          //xs sm md lg xl 
          <Grid item xs={12} sm={12} md={6} key={index}>
            <Item>
              <p><b>Nome:</b> {aluno.name} </p>
              <p><b>Email:</b> {aluno.email}</p>
              <p><b>Phone:</b> {aluno.phone}</p>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default index;
