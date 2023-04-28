import React, { useContext } from 'react'
import Layout from '../components/layout'
import { AlunosContext } from '../context/AlunosContext';

function horarios() {
    const horarios = useContext(AlunosContext);
    console.log(horarios)
    return (
        <>
            <p>Horários: </p>
            <ul>
                {/* {horarios?.map((horario, index) => (
                    <li>{horario.title}</li>
                ))} */}

                {horarios?.map((horario, index) => (
                    <li>{horario.title}</li>
                ))}

            </ul>
        </>
  )
}

export default horarios