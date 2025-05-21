"use client";
import React, { useRef, useState } from "react";

const UserProfile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nome: "Piranguinho Doce",
    email: "piranguinho@gmail.com",
    telefone: "(11) 98765-4321",
    nascimento: "1990-05-21",
    rua: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    bio: "Apaixonado por tecnologia e programação. Gosto de viajar e ler livros.",
    linkedin: "https://linkedin.com/in/piranguinho",
    twitter: "https://twitter.com/piranguinho",
    senhaAtual: "",
    novaSenha: "",
    confirmaSenha: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.novaSenha && formData.novaSenha !== formData.confirmaSenha) {
      alert("A nova senha e a confirmação não coincidem!");
      return;
    }
    alert("Perfil atualizado com sucesso!");
    // Aqui você adicionaria lógica real para salvar os dados
  };

  return (
    <div className="min-h-screen p-12 flex justify-center">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-10 flex gap-12 font-sans text-gray-800">
        {/* Left column: foto + info básica */}
        <div className="flex flex-col items-center w-1/3">
          <div className="relative w-40 h-40 mb-6">
            <img
              src={selectedImage || "/images/download.jpg"}
              alt="Foto do usuário"
              className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition"
              title="Alterar foto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-1">{formData.nome}</h2>
          <p className="text-gray-600 mb-4">{formData.email}</p>
          <p className="text-gray-600">{formData.telefone}</p>
        </div>

        {/* Right column: formulário */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Informações Pessoais */}
          <section>
            <h3 className="text-xl font-semibold border-b border-purple-300 pb-2 mb-4">
              Informações Pessoais
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome completo"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="Telefone"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="date"
                name="nascimento"
                value={formData.nascimento}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </section>

          {/* Endereço */}
          <section>
            <h3 className="text-xl font-semibold border-b border-purple-300 pb-2 mb-4">
              Endereço
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <input
                type="text"
                name="rua"
                value={formData.rua}
                onChange={handleInputChange}
                placeholder="Rua e número"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 col-span-2"
              />
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="CEP"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="Cidade"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                placeholder="Estado"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </section>

          {/* Configurações de senha */}
          <section>
            <h3 className="text-xl font-semibold border-b border-purple-300 pb-2 mb-4">
              Configurações de Conta
            </h3>
            <div className="grid grid-cols-3 gap-6 max-w-lg">
              <input
                type="password"
                name="senhaAtual"
                value={formData.senhaAtual}
                onChange={handleInputChange}
                placeholder="Senha atual"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                name="novaSenha"
                value={formData.novaSenha}
                onChange={handleInputChange}
                placeholder="Nova senha"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                name="confirmaSenha"
                value={formData.confirmaSenha}
                onChange={handleInputChange}
                placeholder="Confirmar nova senha"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </section>

          {/* Botão salvar */}
          <div className="pt-4 border-t border-purple-300 max-w-lg">
            <button
              onClick={handleSave}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
