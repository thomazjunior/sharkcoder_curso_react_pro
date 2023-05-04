import { useEffect, useState, useContext } from "react";
import * as React from 'react';
import { AlunosContext, AlunosDispatchContext } from "../context/AlunosContext";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Button, Snackbar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ModalAddTestemunho from "../components/ModalAddTestemunho";

function testemunhos() {
  const testemunhosData = useContext(AlunosContext);
  const [open, setOpen] = useState(false);
  const dispatch = useContext(AlunosDispatchContext)
  const [openSnack, setOpenSnack] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const vertical = 'top';
  const horizontal = 'center';


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleRemove = (testemunho) => {
    dispatch(testemunho, "remove");
  }

  const handleSubmit = async (data) => {
     try {
       const response = await fetch("/api/testemunhos", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
       }); 
       if (!response.ok) {
        setOpenSnack(true);
         setHasError(true);
         setOpen(false);
         return;
       }

       setOpenSnack(true);

       const newTestemunho = await response.json();
       dispatch(data, "add");
       console.log(newTestemunho);
     } catch (error) {
       setHasError(true);
       alert(error.message)
       console.error(error);
     }
    setTimeout(() => setOpen(false), 100)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      position='relative'
    >
      {testemunhosData?.map((testemunho, index) => (
        <Grid item xs={12} sm={12} md={6} key={index}>
          <Item>
            <Box display={"flex"} justifyContent='space-between'>
              <Button sx={{ backgroundColor: "lightblue" }}>
                <EditIcon />
              </Button>
              <Button onClick={() => handleRemove(testemunho)} sx={{ backgroundColor: "lightblue" }}>
                <RemoveIcon />
              </Button>
            </Box>
            <p>
              <b>Aluno:</b> {testemunho.nome}{" "}
            </p>
            <p>
              <b>Curso:</b> {testemunho.about}
            </p>
            <p>
              <b>Testemunho:</b> {testemunho.description}
            </p>
          </Item>
        </Grid>
      ))}
       <Button
                sx={{ backgroundColor: "lightblue", position: "fixed", bottom: "50%", left: "50%" }}
                onClick={() => setOpen(true)}
              >
                <AddIcon />
              </Button>
      <ModalAddTestemunho open={open} handleClose={() => setOpen(false)} handleSubmit={handleSubmit} />
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={hasError ? 'error' : 'success'} sx={{ width: '100%', height: '100px' }}>
         {hasError ? "Erro ao adicionar testemunho" : "Testemunho adicionado com sucesso!!!"}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default testemunhos;
