"use client";

import React, { useEffect, useState } from "react";
import "@/styles/home.css";
import decodeToken from "@/utils/JwtDecoder";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/fetchConfig";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Endereco {
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
}

interface Lavanderia {
  idLavanderia: number;
  nomeLavanderia: string;
  endereco: Endereco;
}

interface Agendamento {
  idAgendamento: number;
  nomeLavanderia: string;
  endereco: Endereco;
  dataAgendamento: string;
  horaAgendamento: string;
  descricao?: string;
  tipoSabao?: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [lavanderias, setLavanderias] = useState<Lavanderia[]>([]);
  const [erro, setErro] = useState("");
  const [nomePerfil, setNomePerfil] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(""); // novo estado para foto
  const [modalOpen, setModalOpen] = useState(false);
  const [lavanderiaSelecionada, setLavanderiaSelecionada] = useState<Lavanderia | null>(null);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [tipoSabao, setTipoSabao] = useState("líquido");
  const [descricao, setDescricao] = useState("");
  const [idUser, setIdUser] = useState<number | undefined>(undefined);
  const [proximosAgendamentos, setProximosAgendamentos] = useState<Agendamento[]>([]);
  const [detalhesAbertos, setDetalhesAbertos] = useState<{ [key: number]: boolean }>({});
  const [reputacoes, setReputacoes] = useState<{ [key: number]: number }>({});
  const [agendamentoAberto, setAgendamentoAberto] = useState<Agendamento | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = decodeToken();
    setIdUser(token.idUser);
    if (token && token.nomeUser) {
      setNomePerfil(token.nomeUser);

      // Detectar gênero do nome e buscar foto
      detectGenderAndSetPhoto(token.nomeUser);
    }

    fetch("http://localhost:8080/api/lavanderias/listar")
      .then((res) => res.json())
      .then((data) => {
        setLavanderias(data);
        const reputacaoSorteada: { [key: number]: number } = {};
        data.forEach((lav: Lavanderia) => {
          reputacaoSorteada[lav.idLavanderia] = Math.floor(Math.random() * 5) + 1;
        });
        setReputacoes(reputacaoSorteada);
      })
      .catch(() => setErro("Erro ao buscar as lavanderias"));

    if (token?.idUser != 0) {
      fetch(`${BASE_URL}/agendamentos/listar_agendamentosClientes/${token.idUser}`)
        .then((res) => res.json())
        .then((data) => setProximosAgendamentos(data.slice(0, 3)))
        .catch(() => console.error("Erro ao buscar agendamentos"));
    }
  }, []);

  async function detectGenderAndSetPhoto(nomeCompleto: string) {
    try {
      const primeiroNome = nomeCompleto.trim().split(" ")[0];
      const resGender = await fetch(`https://api.genderize.io?name=${primeiroNome}`);
      const dataGender = await resGender.json();
      let genderParam = "male";

      if (dataGender.gender === "female") genderParam = "female";
      else if (dataGender.gender === "male") genderParam = "male";

      const resFoto = await fetch(`https://randomuser.me/api/?gender=${genderParam}&inc=picture&noinfo`);
      const dataFoto = await resFoto.json();

      if (dataFoto.results && dataFoto.results.length > 0) {
        setFotoPerfil(dataFoto.results[0].picture.large);
      } else {
        setFotoPerfil("");
      }
    } catch (error) {
      console.error("Erro ao detectar gênero ou buscar foto:", error);
      setFotoPerfil("");
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const lavanderiasFiltradas = lavanderias.filter((lavanderia) =>
    lavanderia.nomeLavanderia.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpenModal = (lavanderia: Lavanderia) => {
    setLavanderiaSelecionada(lavanderia);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setData("");
    setHora("");
    setTipoSabao("líquido");
    setDescricao("");
  };

  const handleAgendamento = (idLavanderia: number) => {
    if (!data || !hora) {
      alert("Por favor, preencha data e hora.");
      return;
    }
    fetch(`${BASE_URL}/agendamentos/agendar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idCliente: idUser,
        idLavanderia,
        descricao,
        dataAgendamento: data,
        horaAgendamento: hora,
        tipoSabao,
      }),
    }).then(() => {
      handleCloseModal();
      // Atualizar lista de agendamentos após criar
      if (idUser) {
        fetch(`${BASE_URL}/agendamentos/listar_agendamentosClientes/${idUser}`)
          .then((res) => res.json())
          .then((data) => setProximosAgendamentos(data.slice(0, 3)));
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleDetalhes = (id: number) => {
    setDetalhesAbertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderEstrelas = (quantidade: number) => {
    return "★".repeat(quantidade) + "☆".repeat(5 - quantidade);
  };

  // NOVA FUNÇÃO: abrir modal com dados do agendamento clicado
  const abrirOverlayAgendamento = (agendamento: Agendamento) => {
    setAgendamentoAberto(agendamento);
  };

  const fecharOverlayAgendamento = () => {
    setAgendamentoAberto(null);
  };

  // Função para cancelar agendamento
  const cancelarAgendamento = (idAgendamento: number) => {
    if (!window.confirm("Deseja realmente cancelar este agendamento?")) return;

    fetch(`${BASE_URL}/agendamentos/cancelar/${idAgendamento}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("Agendamento cancelado com sucesso!");
          // Atualizar lista de agendamentos
          if (idUser) {
            fetch(`${BASE_URL}/agendamentos/listar_agendamentosClientes/${idUser}`)
              .then((res) => res.json())
              .then((data) => {
                setProximosAgendamentos(data.slice(0, 3));
                fecharOverlayAgendamento();
              });
          }
        } else {
          alert("Erro ao cancelar agendamento.");
        }
      })
      .catch(() => alert("Erro ao cancelar agendamento."));
  };

  return (
    <main className="w-full min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-violet-500 p-6 text-white flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-white">
              {fotoPerfil ? (
                <img src={fotoPerfil} alt="Foto de perfil" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white"></div>
              )}
            </div>
            <h2 className="text-xl font-bold break-words">Olá, {nomePerfil}!</h2>
            <p className="text-sm">Bem-vindo de volta</p>
          </div>

          {/* Próximos agendamentos */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Próximos Agendamentos</h3>
            {proximosAgendamentos.length === 0 ? (
              <p className="text-sm text-gray-100">Nenhum agendamento futuro.</p>
            ) : (
              proximosAgendamentos.map((agendamento) => (
                <div
                  key={agendamento.idAgendamento}
                  onClick={() => abrirOverlayAgendamento(agendamento)}
                  className="bg-white text-violet-700 rounded-lg p-3 mb-3 shadow cursor-pointer hover:bg-violet-100 transition"
                >
                  <h4 className="font-bold text-sm break-words">{agendamento.nomeLavanderia}</h4>
                  <p className="text-xs break-words">
                    {agendamento.endereco.rua}, {agendamento.endereco.numero}
                  </p>
                  <p className="text-xs break-words">{agendamento.endereco.bairro}</p>
                  <p className="text-xs mt-1">
                    Data: {agendamento.dataAgendamento} - Hora: {agendamento.horaAgendamento}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-white text-violet-700 px-4 py-2 rounded-lg hover:bg-violet-100 transition"
        >
          Logout
        </button>
      </aside>

      {/* Conteúdo */}
      <section className="flex-1 bg-violet-100 p-6 overflow-y-auto">
        <form onSubmit={handleSearch} className="mb-6 flex justify-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar lavanderias..."
            className="w-full max-w-lg px-4 py-2 border-2 border-gray-400 rounded-2xl bg-white"
          />
        </form>

        <h1 className="text-2xl font-bold text-violet-800 mb-4">Lavanderias perto de você:</h1>

        <ul className="space-y-4">
          {lavanderiasFiltradas.length === 0 ? (
            <p className="text-gray-600">Nenhuma lavanderia encontrada.</p>
          ) : (
            lavanderiasFiltradas.map((lavanderia) => (
              <li
                key={lavanderia.idLavanderia}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-violet-700 break-words">
                  {lavanderia.nomeLavanderia}
                </h2>
                <p className="text-sm text-gray-600 break-words">
                  Rua: {lavanderia.endereco.rua} Nº {lavanderia.endereco.numero} - {lavanderia.endereco.bairro}
                </p>
                <p className="text-yellow-500 mt-1">
                  Reputação: {renderEstrelas(reputacoes[lavanderia.idLavanderia] || 0)}
                </p>

                <button
                  onClick={() => toggleDetalhes(lavanderia.idLavanderia)}
                  className="mt-3 flex items-center gap-2 text-sm text-violet-600 hover:text-violet-800 transition font-medium"
                >
                  {detalhesAbertos[lavanderia.idLavanderia] ? (
                    <>
                      Ocultar detalhes <FaChevronUp className="transition-transform duration-200" />
                    </>
                  ) : (
                    <>
                      Ver detalhes <FaChevronDown className="transition-transform duration-200" />
                    </>
                  )}
                </button>

                {detalhesAbertos[lavanderia.idLavanderia] && (
                  <div className="mt-2 text-sm text-gray-700">
                    <p>Complemento: {lavanderia.endereco.complemento}</p>
                    <p>Cidade: {lavanderia.endereco.cidade}</p>
                  </div>
                )}

                <button
                  onClick={() => handleOpenModal(lavanderia)}
                  className="mt-3 bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition"
                >
                  Fazer agendamento
                </button>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Modal de Agendamento */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold text-violet-700 mb-4 break-words">
              Agendar com {lavanderiaSelecionada?.nomeLavanderia}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-sm">Data</label>
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-sm">Hora</label>
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-sm">Tipo de Sabão</label>
                <select
                  value={tipoSabao}
                  onChange={(e) => setTipoSabao(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="líquido">Líquido</option>
                  <option value="em pó">Em Pó</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-sm">Descrição</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full border rounded p-2"
                  rows={3}
                  placeholder="Informações adicionais..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (lavanderiaSelecionada) {
                      handleAgendamento(lavanderiaSelecionada.idLavanderia);
                    }
                  }}
                  className="px-4 py-2 rounded bg-violet-500 text-white hover:bg-violet-600"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Agendamento clicado */}
      {agendamentoAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <button
              onClick={fecharOverlayAgendamento}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">{agendamentoAberto.nomeLavanderia}</h2>
            <p>
              <strong>Endereço:</strong> {agendamentoAberto.endereco.rua}, {agendamentoAberto.endereco.numero} - {agendamentoAberto.endereco.bairro}, {agendamentoAberto.endereco.cidade}
            </p>
            <p>
              <strong>Data:</strong> {agendamentoAberto.dataAgendamento}
            </p>
            <p>
              <strong>Hora:</strong> {agendamentoAberto.horaAgendamento}
            </p>
            {agendamentoAberto.tipoSabao && (
              <p>
                <strong>Tipo de Sabão:</strong> {agendamentoAberto.tipoSabao}
              </p>
            )}
            {agendamentoAberto.descricao && (
              <p>
                <strong>Descrição:</strong> {agendamentoAberto.descricao}
              </p>
            )}

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => cancelarAgendamento(agendamentoAberto.idAgendamento)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Cancelar Agendamento
              </button>
              <button
                onClick={fecharOverlayAgendamento}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
