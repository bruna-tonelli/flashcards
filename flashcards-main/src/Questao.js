import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Questao() {
  const [questao, setQuestao] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtendo idUsuario e pontosAcumulados da página anterior
  const idUsuario = location.state?.idUsuario;
  let pontosAcumulados = location.state?.pontosAcumulados || 0;  // A pontuação acumulada vem da navegação anterior
  
  useEffect(() => {
    // Fetch para obter a questão atual
    fetch("http://localhost:5000/questaoAtual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUsuario }) // Enviando ID do usuário
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
        } else {
          setQuestao(data);
          setMensagem(""); // Limpa a mensagem de erro caso tenha sucesso
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar questão:", error);
        setMensagem("Erro ao carregar a questão.");
      });
  }, [idUsuario]); // Dependência de idUsuario para refazer o fetch se necessário

  useEffect(() => {
    // Redireciona dependendo do tipo da questão
    if (questao) {
      console.log("Redirecionando para:", questao.tipo);

      if (questao.tipo === "aberta") {
        navigate("/perguntaAberta", { state: { questao, idUsuario, pontosAcumulados } });
      } else if (questao.tipo === "optativa") {
        navigate("/perguntaOptativa", { state: { questao, idUsuario, pontosAcumulados } });
      }
    }
  }, [questao, idUsuario, pontosAcumulados, navigate]); // Dependências para garantir o redirecionamento correto

  return (
    <div>
      <h3>{mensagem || (questao ? questao.enunciado : "Carregando questão...")}</h3>
    </div>
  );
}

export default Questao;
