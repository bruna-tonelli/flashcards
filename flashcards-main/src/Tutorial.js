import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tutorial.css"; 
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";

function Tutorial() {
    const [message, setMessage] = useState("Testando conexão...");
    useEffect(() => {
      fetch("http://localhost:5000/tutorial")
        .then((res) => res.json())
        .then((data) => setMessage(`Backend conectado: ${data.message}`))
        .catch((err) => setMessage("Erro ao conectar ao backend!"));
    }, []);

    const navigate = useNavigate();

    const voltar = () => {
      navigate('/'); 
  };
  
        return (
          <div className="tutorial">
           <img src={RaioIcone} className="tutorial-icone-raio" alt="Ícone de Raio" />
            <span className="tutorial-flashcards">FLASHCARDS</span>
            <div className="tutorial-container">
              <span className="como">Como jogar:</span>
              <div className="texto1-tutorial">
                <li>
                  O jogo consiste em perguntas e respostas, a cada nível será apresentado um desafio de programação em JAVA,
                  o seu objetivo é escrever o código correto para passar de fase.
                </li>
              </div>
              <div className="texto2-tutorial">
                <li>
                  Lembre-se de que cada vírgula importa, caso algo esteja minimamente fora de ordem, ou faltando um ponto e vírgula,
                  a sua resposta será considerada errada.
                </li>
              </div>
            </div>
            <button className="tutorial-botao" onClick={voltar}>
              <p className="botao-entendi">Entendi!</p>
            </button>
            </div>
  );
}

export default Tutorial;
