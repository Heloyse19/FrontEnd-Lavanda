import Link from "next/link";
import CadastroForm from "@/components/CadastroForm";

export default function CadastroPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
        <CadastroForm />
        <p className="mt-4 text-sm">
          Já tem uma conta?
          <Link href="/login" className="ml-1 text-blue-600 underline">
            Faça Login
          </Link>
        </p>
      </div>
    </main>
  );
}