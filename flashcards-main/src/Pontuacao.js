import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./pontuacao.css"; 
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png"; 
import MoedaIcone from "./public/22542143-pixel-arte-jogos-moeda-moeda-vetor-removebg-preview.png";  

function Pontuacao() {
    const [pontuacoes, setPontuacoes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/pontuacao")
            .then((res) => res.json())
            .then((data) => setPontuacoes(data))
            .catch((err) => console.error("Erro ao buscar pontuações:", err));
    }, []);

    const navigate = useNavigate();

    const voltar = () => {
        navigate('/'); 
    };

    return (
        <div className="container">
            <div className="pontuacao-logo">
                <div className="pontuacao-logo-text">
                    <div className="pontuacao-flashcards-wrapper">
                        <div className="pontuacao-flashcards">FLASHCARDS</div>
                        <div className="pontuacao-text-shadow1">FLASHCARDS</div>
                    </div>
                    <span className="pontuacao-java">JAVA</span>
                    <div className="pontuacao-edition-wrapper">
                        <div className="pontuacao-edition">edition</div>
                        <div className="pontuacao-text-shadow2">edition</div>
                    </div>
                    <img src={RaioIcone} className="pontuacao-icone-raio" alt="Ícone de Raio" />
                </div>
            </div>
            <div className="pontuacao-cinza_escuro">
                <div className="pontuacoes">
                    <div className="melhores-container">
                        <img 
                            src={MoedaIcone}  
                            className="pontuacao-icone-moeda"   
                            alt="Ícone moeda" 
                        />
                        <span className="melhores-pontuacoes">Melhores Pontuações:</span>
                    </div>
                    <ol className="pontuacao-ranking">
                        {pontuacoes.length > 0 ? (
                            pontuacoes.map((usuario, index) => (
                                <li key={index}>
                                    <span>{usuario.nome} ({usuario.pontuacao} pontos)</span>
                                </li>
                            ))
                        ) : (
                            <p>Carregando pontuações...</p>
                        )}
                    </ol>
                </div>
            </div>
            <button className="pontuacao-botaoVoltar" onClick={voltar}>
                <p className="pontuacao-voltar">Voltar</p>
            </button>
        </div>
    );
}

export default Pontuacao;
