"use client";
import { jwtDecode } from "jwt-decode";


export default function decodeToken():any {
  const token = sessionStorage.getItem("Token");

  if (!token) {
    console.warn("Nenhum token encontrado no sessionStorage.");
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}