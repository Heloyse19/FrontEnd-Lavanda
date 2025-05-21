"use client"
import { useState } from "react"

interface inputDataProps  {
    valor: string
    onChange: (valorInput: string) => void
}

export default function InputDataNasc({valor, onChange}: inputDataProps) {
    return(
        <input type="text" placeholder="Data de nascimento" value={valor} onChange={(e) => {onChange(e.target.value)}} />
    )
}