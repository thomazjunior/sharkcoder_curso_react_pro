import React, { useEffect, useState, useContext } from "react";
import { AlunosContext, AlunosDispatchContext } from "../context/AlunosContext";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ModalAddTestemunho from "../components/ModalAddTestemunho";

function testemunhos() {
  const testemunhosData = useContext(AlunosContext);
  const [open, setOpen] = useState(false);
  const dispatch = useContext(AlunosDispatchContext)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
        console.log(response)
         throw new Error("Error ao adicionar testemunho")
       }

       const newTestemunho = await response.json();
       dispatch(data);
       console.log(newTestemunho);
     } catch (error) {
       alert(error.message)
       console.error(error);
     }
    setTimeout(() => setOpen(false), 2000)
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {testemunhosData?.map((testemunho, index) => (
        <Grid item xs={12} sm={12} md={6} key={index}>
          <Item>
            <Box display={"flex"} justifyContent='space-between'>
              <Button
                sx={{ backgroundColor: "lightblue" }}
                onClick={() => setOpen(true)}
              >
                <AddIcon />
              </Button>
              <Button sx={{ backgroundColor: "lightblue" }}>
                <EditIcon />
              </Button>
              <Button sx={{ backgroundColor: "lightblue" }}>
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
      <ModalAddTestemunho open={open} handleClose={() => setOpen(false)} handleSubmit={handleSubmit} />
    </Grid>
  );
}

export default testemunhos;
