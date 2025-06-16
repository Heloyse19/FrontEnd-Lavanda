"use client";

import React, { useState } from "react";
import "@/styles/login.css";
import { BASE_URL } from "../utils/fetchConfig";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    fetch(`${BASE_URL}/clientes/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"cpf": cpf, "senha": senha})
    })
    .then((res) => {
      if (!res.ok) {
        setErro("Email ou senha incorretos");
      }
      return res.json();
    })
    .then((data) => {
      if(data.status == true) {
        sessionStorage.setItem("Token", data.token)
        window.location.href = "/home"
      }
    })
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <div className="login-card">
          <img
            src="/Img/FotoLavanda.png"
            alt="Logo Lavanda"
            className="h-30 mx-auto mb-6"
          />

          <p className="login-title">Login na Lavanderia</p>

          <div className="login-form">
            <input
              type="text"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="login-input"
              required
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="login-input"
              required
            />

            <button type="submit" className="login-button">
              Entrar
            </button>
          </div>

          <p className="login-footer-text">
            Ainda não tem uma conta?{" "}
            <a href="/cadastro" className="login-link">
              Cadastre-se
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
