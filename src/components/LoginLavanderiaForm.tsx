"use client";
import { BASE_URL, getHeadersJson } from "@/config/configuration";
import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
    const [erro,setErro] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
  
    const fazerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        if(!email || !senha ) {
          setErro("Preencha os campos!");
          return;
        }

        const response = await axios.post(
          `${BASE_URL}/usuarios/login`,
          {
            email,
            senha
          },
          {
            headers: getHeadersJson(),
            validateStatus: (status) => status === 200 || status === 401
          }
        )

        const data = response.data;

        if (data.sucess){
          sessionStorage.setItem("token",data.token);
          setErro(null);
          window.location.href = 'http://127.0.0.1:8080/api/home';
        } else {
          setErro("Login ou senha inválidos!");
          }
        }catch(err){
          if(axios.isAxiosError(err)){
            setErro(err.response?.data?.mensagem || "Erro ao conectar no servidor");
          }else{
            setErro("Erro desconhecido");
            }
        } 
    }

    return (
      <form onSubmit={fazerLogin}>
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
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Entrar
        </button>
      </form>
    );
  }