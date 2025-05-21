interface inputProps {
    valor: string
    onChange: (valorInput: string) => void
}

export default function InputNomeCompleto({valor, onChange}: inputProps) {
    return(
        <input type="text" placeholder="Nome Completo" value={valor} onChange={(e) => {onChange(e.target.value)}}/>
    )
}