import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./nickname.css";
import logo from "./public/A_pixel_art_of_a_small__cute_dog_wearing_a_red_sup-removebg-preview.png";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import Config from "./public/font-awesome-4.7.0/css/font-awesome.min.css";

function Comecar() {
  const [message, setMessage] = useState("Testando conexão...");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/comecar")
      .then((res) => res.json())
      .then((data) => setMessage(`Backend conectado: ${data.message}`))
      .catch((err) => setMessage("Erro ao conectar ao backend!"));
  }, []);

  const cadastrarUsuario = () => {
    if (!nome.trim()) {
      console.error("Nome não pode estar vazio!");
      return;
    }

    fetch("http://localhost:5000/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }) 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
            console.log("Usuário cadastrado com ID:", data.id);
            navigate('/questaoAtual', { state: { idUsuario: data.id } }); // Envia o ID para a página de questões
        } else {
            console.error("Erro ao cadastrar usuário:", data.error);
        }
    })
      .catch((error) => console.error("Erro ao cadastrar:", error));
  };

  return (
    <>
      <img 
        src={logo} className="nickname-logo-cachorro"
        alt="Cachorro pixelado"
      />
      {/* Ícone de Configuração */}
      <i 
	        id="cog" 
	        className="fa fa-cog"
	        onClick={() => setSidebarOpen(true)}
	      ></i>
      <div className="nickname-container">
        <div className="nickname-cinza_escuro">
          <div className="nickname-logo">
            <div className="nickname-logo-text">
              <img 
                src={RaioIcone} 
                className="nickname-icone-raio" 
                alt="Ícone de Raio"
              />
              <div className="nickname-flashcards-wrapper">
                <div className="nickname-flashcards">FLASHCARDS</div>
                <div className="nickname-text-shadow1">FLASHCARDS</div>
              </div>
              <span className="nickname-java">JAVA</span>
              <div className="nickname-edition-wrapper">
                <div className="nickname-edition">edition</div>
                <div className="nickname-text-shadow2">edition</div>
              </div>
              <div className="nickname">
                <form className="nickname-formulario" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="text" 
                    id="nick" 
                    name="nick" 
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <button className="nickname-botaoIniciar" onClick={cadastrarUsuario}>
                    <p className="nickname-iniciar">Iniciar</p>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
             {/* Sidebar */}
	       <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
	        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
	        <p id="tela-inicial-som">Som</p>
	        <p id="tela-inicial-musica">Música</p>
	      </div>
    </>
  );
}

export default Comecar;
