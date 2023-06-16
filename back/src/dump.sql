CREATE DATABASE agiotagem; 

drop table usuarios;
drop table clientes;
drop table cobrancas;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cpf VARCHAR(11) UNIQUE,
  telefone VARCHAR(11) UNIQUE,
  nome TEXT NOT NULL
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  telefone VARCHAR(11) NOT NULL,
  endereco TEXT,
  complemento TEXT,
  cep VARCHAR(8),
  bairro VARCHAR(50),
  cidade VARCHAR(50),
  UF VARCHAR(25)
);

CREATE SEQUENCE cobrancas_id_seq
    START WITH 10000000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE cobrancas (
  id integer PRIMARY KEY DEFAULT nextval('cobrancas_id_seq'),
  cliente_id INTEGER NOT NULL REFERENCES clientes(id),
  descricao TEXT NOT NULL,
  vencimento DATE NOT NULL,
  valor INTEGER NOT NULL,
  pago BOOLEAN NOT NULL
);
