"use client"
import React, { useState } from "react"

//Esse valor pdoe ser vazio. Isso é pra quando formos usar para editar a conta
//Ficar mais facil de inserir e alterar caso o usuario queria
interface ValoresInseridos {
    valor: string
    onChange: (valor:string) => void //Função de Callback
}

export default function InputSenha({valor, onChange}: ValoresInseridos) {
    return (
        <input type="password" placeholder="Senha" className="text-violet-700" value={valor} onChange={(e) => {onChange(e.target.value)}}/>
        
    )
}