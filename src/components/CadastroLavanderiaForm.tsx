
//CadastroForm.tsx:
"use client";
import { useState } from "react";
import axios from 'axios';
import { headers } from "next/headers";
import { getHeadersJson,BASE_URL } from "@/config/configuration";

export default function CadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [mensagem, setMensagem] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (erro !== "") {
      setErro("");
    }

    try{
      const response = await axios.post(
        `${BASE_URL}/usuarios/register`,
        {
          nome,
          email,
          senha
        },
        {
          headers: getHeadersJson()
        }
      );

      setMensagem(response.data)
      setTimeout(() => { window.location.href = "/" }, 2000);
      
    }catch(error){
      if (axios.isAxiosError(error) && error.response) {
        setErro(error.response.data);
    } else {
        setErro("Erro desconhecido");
    }
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      {erro && <p>{erro}</p>}
      {mensagem && <p>{mensagem}</p>}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Cadastrar
      </button>
    </form>
  );
}