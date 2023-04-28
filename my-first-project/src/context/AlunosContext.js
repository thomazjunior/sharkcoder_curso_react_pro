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

  const dispatch = (newTestemunho) => {
    setAlunos((prevTestemunhos) => [...prevTestemunhos, newTestemunho]) //arrow function //spread
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
