CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    pontuacao INTEGER DEFAULT 0
);

CREATE TABLE questoes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    enunciado VARCHAR(3000) NOT NULL,
    tipo VARCHAR(20) NOT NULL
);

CREATE TABLE respostas (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    resposta VARCHAR(255) NOT NULL, 
    correta BOOLEAN NOT NULL, 
    id_questao INTEGER,
    CONSTRAINT fk_questao FOREIGN KEY (id_questao) REFERENCES questoes(id)
);

INSERT INTO usuarios (nome, pontuacao) VALUES ('Nick', 90), ('Dexter', 75), ('Bruna', 59);

INSERT INTO questoes (enunciado, tipo) 
VALUES ('
Java é uma linguagem de programação orientada objetos, lançada em 1995, pela Sun Microsystems, que, ao longo dos anos, tornou-se uma das linguagens mais populares utilizadas devido à sua portabilidade e eficiência. Sobre os conceitos fundamentais da linguagem Java, marque V para as afirmativas verdadeiras e F para as falsas.
( ) Uma classe pode herdar de várias classes ao mesmo tempo.
( ) O uso de “super” é restrito à chamada de métodos do construtor da classe pai.
( ) A palavra-chave “final” pode ser usada para prevenir que um método seja sobrescrito.
( ) A interface em Java pode conter apenas métodos abstratos.
', 'optativa');

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('FFFF', FALSE, 1);

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('VFVF', FALSE, 1);

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('FFVF', FALSE, 1);

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('VVVV', TRUE, 1);

INSERT INTO questoes (enunciado, tipo) 
VALUES ('Declare uma variável inteira em java com o valor 10!', 'aberta');

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('int numero = 10; int fatorial = 1; for (int i = 1; i <= numero; i++) { fatorial *= i; }', TRUE, 2);






