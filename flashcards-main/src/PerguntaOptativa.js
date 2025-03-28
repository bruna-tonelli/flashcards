import React, { useState } from "react";
import "./perguntaOptativa.css";
import RaioIcone from "./public/luxa.org-pixelate-01-raio-png-removebg-preview.png";
import { useNavigate, useLocation } from "react-router-dom";

function PerguntaOptativa() {
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const questao = location.state?.questao;
  const idUsuario = location.state?.idUsuario || localStorage.getItem("usuarioId");
  let pontosAcumulados = location.state?.pontosAcumulados || 0; // Garantindo que os pontos acumulados começam com 0

  console.log("ID do Usuário recebido:", idUsuario);

  const enviarResposta = (pontosGanhos) => {
    if (!questao) {
      setMensagem("Erro: Nenhuma questão carregada!");
      return;
    }
    if (!idUsuario) {
      setMensagem("Erro: ID do usuário não encontrado!");
      return;
    }
    

    // Atualiza a pontuação acumulada
    pontosAcumulados += pontosGanhos;

    // Enviar resposta do usuário
    fetch("http://localhost:5000/responderQuestao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario,
        idQuestao: questao.id,
        respostaUsuario,
        pontos: pontosAcumulados,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
          if (data.respostaCorreta) {
            setRespostaCorreta(data.respostaCorreta);
          }
        } else {
          setMensagem(data.message); // Mensagem de sucesso
          setRespostaCorreta(null); // Limpar resposta correta
          setRespostaUsuario(""); // Limpar input após o envio

          // Atraso de 10 segundos antes de redirecionar para a próxima questão
          setTimeout(() => {
            // Buscar a pontuação atual do usuário
            fetch(`http://localhost:5000/getPontuacaoUsuario/${idUsuario}`)
              .then((res) => res.json())
              .then((usuarioData) => {
                if (usuarioData.error) {
                  setMensagem(usuarioData.error);
                  return;
                }

                const pontuacaoAtual = usuarioData.pontuacao;

                // Verifica se a pontuação acumulada é maior do que a pontuação no banco de dados
                if (pontosAcumulados > pontuacaoAtual) {
                  // Atualiza a pontuação no banco de dados
                  fetch("http://localhost:5000/atualizarPontuacao", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      idUsuario,
                      novaPontuacao: pontosAcumulados,
                    }),
                  })
                    .then((res) => res.json())
                    .then((updateData) => {
                      if (updateData.error) {
                        setMensagem(updateData.error);
                      } else {
                        setMensagem(updateData.message); // Mensagem de sucesso ao atualizar
                      }
                    })
                    .catch((error) => console.error("Erro ao atualizar pontuação:", error));
                } else {
                  setMensagem("Os pontos acumulados não são maiores que a pontuação atual.");
                }
              })
              .catch((error) => console.error("Erro ao buscar pontuação do usuário:", error));

            // Redireciona para a próxima questão após o atraso
            fetch("http://localhost:5000/questaoAtual", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idUsuario, pontosAcumulados }),
            })
              .then((res) => res.json())
              .then((nextQuestao) => {
                // Redireciona para a página da próxima questão
                navigate("/questaoAtual", {
                  state: {
                    questao: nextQuestao,
                    idUsuario,
                    pontosAcumulados,
                  },
                });
              })
              .catch((error) => console.error("Erro ao buscar próxima questão:", error));
          }, 10000); // 10000ms = 10 segundos
        }
      })
      .catch((error) => console.error("Erro ao enviar resposta:", error));
  };
  return (
    <>
        <div className="perguntaOptativa-tudo">
        <div className="perguntaOptativa-logo">
          <img
            className="perguntaOptativa-icone-raio"
            src={RaioIcone}
            alt="imagem-raio"
          />
          <div className="perguntaOptativa-logo-text">
            <div className="perguntaOptativa-flashcards">FLASHCARDS</div>
          </div>
        </div>

        <div className="perguntaOptativa-resposta">
          <div className="perguntaOptativa-pergunta">
            <span className="perguntaOptativa-pergunta1">Pergunta</span>
          </div>

          <button className="botaoProxima">
            <p className="proxima">Próxima</p>
          </button>
        </div>

        <div className="perguntaOptativa-alternativa">
          <button className="perguntaOptativa-A" onClick={() => enviarResposta(20)}>
            <p> a) VFVV</p>
          </button>
          <button className="perguntaOptativa-B" onClick={() => enviarResposta(20)}>
            <p> b) FFVF</p>
          </button>
          <button className="perguntaOptativa-C" onClick={() => enviarResposta(20)}>
            <p> c) VFFV</p>
          </button>
          <button className="perguntaOptativa-D" onClick={() => enviarResposta(20)}>
            <p> d) FVFV</p>
          </button>
        </div>


      </div>
      {mensagem && <p>{mensagem}</p>}
      {respostaCorreta && <p><strong>Resposta correta:</strong> {respostaCorreta}</p>}
    </>
  );
}

export default PerguntaOptativa;
