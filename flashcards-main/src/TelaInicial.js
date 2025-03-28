import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tela-inicial.css";
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";

function TelaInicial() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/tutorial")
      .then((res) => res.json());
  }, []);

  return (
    <div className="container">
      <div className="telaInicial-cinza_escuro">
        <div className="telaInicial-logo-container">
          <img src={logo} className="telaInicial-logo-cachorro" alt="Cachorro fofo" />
          <div className="telaInicial-logo-text">
            <div className="telaInicial-flashcards-wrapper">
              <div className="telaInicial-flashcards">FLASHCARDS</div>
              <div className="telaInicial-text-shadow1">FLASHCARDS</div>
              <img src={RaioIcone} className="telaInicial-icone-raio" alt="Ícone de Raio" />
            </div>
            <span className="telaInicial-java">JAVA</span>
            <div className="telaInicial-edition-wrapper">
              <div className="telaInicial-edition">edition</div>
              <div className="telaInicial-text-shadow2">edition</div>
            </div>
          </div>
        </div>

        {/* Ícone de Configuração */}
        <i 
          id="cog" 
          className="fa fa-cog"
          onClick={() => setSidebarOpen(true)}
        ></i>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        <p id="tela-inicial-som">Som</p>
        <p id="tela-inicial-musica">Música</p>
      </div>

      <div className="telaInicial-botoes">
        <p className="telaInicial-botao" onClick={() => navigate("/comecar")}>Começar</p>
        <p className="telaInicial-botao" onClick={() => navigate("/tutorial")}>Tutorial</p>
        <p className="telaInicial-botao" onClick={() => navigate("/pontuacao")}>Pontuação</p>
      </div>
    </div>
  );
}

export default TelaInicial;
