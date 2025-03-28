import React from "react";
import TelaInicial from "./TelaInicial";
import Comecar from "./Comecar";
import Tutorial from "./Tutorial";
import Pontuacao from "./Pontuacao";
import Questao from "./Questao";
import PerguntaAberta from "./PerguntaAberta.jsx";
import PerguntaOptativa from "./PerguntaOptativa.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/comecar" element={<Comecar />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/pontuacao" element={<Pontuacao />} />
          <Route path="/questaoAtual" element={<Questao />} />
          <Route path="/perguntaAberta" element={<PerguntaAberta />} />
          <Route path="/perguntaOptativa" element={<PerguntaOptativa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;