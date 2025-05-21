interface emailProps {
    email: string
    onChange: (valor:string) => void
}

export default function InputEmail({email, onChange}: emailProps) {
    return (
        <input type="email" placeholder="Email" value={email} onChange={(e) => {onChange(e.target.value)}} />
    )
}