interface enderecoProps {
    valor:string,
    onChange: (valor:string) => void
}

export default function InputEndereco({valor, onChange}: enderecoProps) {
    return (
        <input type="text" placeholder="Endereço" value={valor} onChange={(e) => {onChange(e.target.value)}} />
    )
}