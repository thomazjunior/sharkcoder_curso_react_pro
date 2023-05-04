import { createContext, useState, useEffect } from "react";

const AlunosContext = createContext();
const AlunosDispatchContext = createContext();

function AlunosProvider({ children }) {
  const [alunos, setAlunos] = useState();


  useEffect(() => {
    function fetchTestemunho() {
      fetch("/api/testemunhos")
        .then((response) => response.json())
        .then((data) => setAlunos(data));
    }

    fetchTestemunho();
  }, []);

  const dispatch = (testemunho, action) => {

    if (action === 'add') {
      setAlunos((prevTestemunhos) => [...prevTestemunhos, testemunho])
    } else if (action === 'remove') { 
      setAlunos((prevTestemunhos) => 
        prevTestemunhos.filter((t) => t.id !== testemunho.id)
      );
    }

     //arrow function //spread
  }

  return (
    <AlunosContext.Provider value={alunos}>
      <AlunosDispatchContext.Provider value={dispatch}>
        {children}
      </AlunosDispatchContext.Provider>
    </AlunosContext.Provider>
  );
}

export { AlunosProvider, AlunosContext, AlunosDispatchContext };
