import "./perguntaAberta.css";

function Pergunta() {
  return (
    <>
      <div className="logo">
        <img 
          src={require("C:/BRUNA one drive/OneDrive/Área de Trabalho/Flashcards/frontend/luxa.org-pixelate-01-raio-png-removebg-preview.png")} 
          className="icone-raio" 
          alt="Ícone de Raio"
        />
        <span className="flashcards">FLASHCARDS</span>
      </div>

      <div className="pergunta">
        <span className="pergunta1">Pergunta</span>
      </div>

      <div className="resposta">
        <input 
          type="text" 
          id="text" 
          placeholder="Digite a resposta"
        />
        <button className="botaoEnviar">
          <p className="enviar">Enviar</p>
        </button>
      </div>
    </>
  );
}

export default Pergunta;