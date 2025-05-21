"use client"

interface inputTelefoneProps {
    numeroProps: string
    onChange: (valor:string) => void
}

export default function InputTelefone({numeroProps, onChange}: inputTelefoneProps) {
    return(
        <input type="text" placeholder="Número de Telefone" value={numeroProps} onChange={(e) => {onChange(e.target.value)}}/>
    )
}