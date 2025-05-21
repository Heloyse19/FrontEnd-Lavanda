"use client"
import { useState } from "react";
import InputCEP from "../../../components/inputs/inputCEP";
import InputComplemento from "../../../components/inputs/inputComplemento";
import InputCPF from "../../../components/inputs/inputCPF";
import InputDataNasc from "../../../components/inputs/inputDataNasc";
import InputEmail from "../../../components/inputs/inputEmail";
import InputEndereco from "../../../components/inputs/inputEndereco";
import InputSenha from "../../../components/inputs/inputSenhas";
import InputTelefone from "../../../components/inputs/inputTelefone";
import InputNomeCompleto from "../../../components/inputs/inputNomeCompleto";
export default function Registro() {

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    dataNasc: "",
    CPF: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    complemento: "",
    senha: ""
  })

  const handleChange = (campo:string, valor:string) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor
    }))
  }



  return (
    <div className="registro min-h-screen flex flex-col items-center">
      
      <header className="">
        <img src="/Img/FotoLavanda.png" alt="Logo Lavanda"/>
      </header>


    <form>
        <div className="div-register">
          <p className="paragrafo-login">Registro</p>

          <div className="info-user">
            <div className="div-info">
              <InputNomeCompleto valor={formData.nomeCompleto} onChange={(v) => {handleChange("nomeCompleto", v)}}/>
            </div>
            <div className="div-info">
              <InputDataNasc valor={formData.dataNasc} onChange={(v) => {handleChange("dataNasc", v)}}/>
            </div>

            <div className="div-info">
              <InputCPF dado={formData.CPF} onChange={(v) => {handleChange("CPF", v)}}/>
            </div>
            
            <div className="div-info">
              <InputEmail email={formData.email} onChange={(v) => {handleChange("email", v)}} />
            </div>
            <div className="div-info">
              <InputTelefone numeroProps={formData.telefone} onChange={(v) => handleChange("telefone", v)}/>
            </div>
            <div className="div-info">
              <InputCEP />
            </div>
            <div className="div-info col-span-2">
              <InputEndereco valor={formData.endereco} onChange={(v) => handleChange("endereco", v)} />
            </div>
            <div className="div-info col-span-2">
              <InputComplemento complemento=""/>
            </div>
            
            <div className="div-info">
              <InputSenha valor={formData.senha} onChange={(v) => {handleChange("senha", v)}}/>
            </div>

            <div className="div-info">
              <input type="password" placeholder="Confirmar Senha" className="Confirm-senha"/>
            </div>


          </div>

          <button className="btn-bonito mt-4" type="submit">Registrar</button>
        </div>
      </form>
    
    </div>
  );
}

