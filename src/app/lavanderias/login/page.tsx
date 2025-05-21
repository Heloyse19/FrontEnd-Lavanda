import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {

  

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
        <p className="mt-4 text-sm">
          Não tem uma conta?
          <Link href="/cadastro" className="ml-1 text-blue-600 underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}