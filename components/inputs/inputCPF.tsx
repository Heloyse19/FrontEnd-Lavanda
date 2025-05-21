import { useState } from "react"

type Props = {
    dado: string
    onChange: (valor:string) => void
}

export default function InputCPF({ dado, onChange }: Props) {
    const [valor, setValor] = useState(dado)
    return (
        <input type="text" placeholder="CPF" value={dado} onChange={(e) => {onChange(e.target.value)}} />
    )
}