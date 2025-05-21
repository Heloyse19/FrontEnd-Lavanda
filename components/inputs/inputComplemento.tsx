"use client"

interface ComplementoProps {
    complemento: string
}

export default function InputComplemento({complemento}: ComplementoProps) {
    return (
        <input type="text" placeholder="Complemento" />
    )
}