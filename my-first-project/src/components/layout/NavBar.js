import { useRouter } from "next/router";
import React from "react";

function NavBar() {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <div className="layout-navbar">
      <p onClick={() => handleClick("/sobreOCurso")}>Sobre o Curso</p>
      <p onClick={() => handleClick("/horarios")}>Horários</p>
      <p onClick={() => handleClick("/ondeEstamos")}>Onde Estamos</p>
      <p onClick={() => handleClick("/admin")}>Gerenciar</p>
    </div>
  );
}

export default NavBar;
