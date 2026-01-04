import { useEffect, useState } from 'react';
import axios from 'axios';
import { MessageCircle, DollarSign, ArrowLeft, Lock, KeyRound } from 'lucide-react';

export function Admin({ voltar }) {
    const [autenticado, setAutenticado] = useState(false);
    const [senha, setSenha] = useState('');
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        if (autenticado) {
            carregarClientes();
        }
    }, [autenticado]);

    const carregarClientes = async () => {
        try {
            const resposta = await axios.get('https://radiantes-solar-production.up.railway.app/api/orcamento/clientes');
            setClientes(resposta.data.reverse());
        } catch (erro) {
            alert("Erro ao buscar clientes. O Java está ligado?");
        }
    };

    const verificarSenha = () => {
        if (senha === 'radiante2025') {
            setAutenticado(true);
        } else {
            alert("Senha incorreta! Tente novamente.");
            setSenha('');
        }
    };

    // --- CORREÇÃO AQUI: Lógica blindada para o WhatsApp ---
    const chamarNoZap = (telefone, nome) => {
        if (!telefone) {
            alert("Este cliente não cadastrou telefone.");
            return;
        }

        // 1. Limpa o número (tira traços, parênteses e espaços)
        let num = telefone.replace(/\D/g, '');

        // 2. Verifica o código do país (55)
        // Se o número tiver 10 ou 11 dígitos (Ex: 69 99999-9999), nós adicionamos o 55.
        // Se ele já tiver 12 ou 13 dígitos, assumimos que já tem o 55.
        if (num.length <= 11) {
            num = `55${num}`;
        }

        const link = `https://wa.me/${num}?text=Olá ${nome}, vi sua simulação no site da Radiante's! Podemos conversar?`;
        window.open(link, '_blank');
    };

    if (!autenticado) {
        return (
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#0f172a', color: 'white' }}>
                <div style={{ background: '#1e293b', padding: '40px', borderRadius: '16px', textAlign: 'center', width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
                    <div style={{ background: '#334155', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                        <Lock size={32} color="#fbbf24" />
                    </div>
                    <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Área Restrita</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Digite a senha de administrador.</p>

                    <div style={{ display: 'flex', alignItems: 'center', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', marginBottom: '20px' }}>
                        <KeyRound size={20} color="#64748b" style={{ marginRight: '10px' }} />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && verificarSenha()}
                            style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none', fontSize: '1rem' }}
                        />
                    </div>

                    <button onClick={verificarSenha} style={{ width: '100%', padding: '12px', background: '#fbbf24', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', color: '#78350f' }}>
                        Entrar
                    </button>
                    <button onClick={voltar} style={{ marginTop: '15px', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }}>
                        Voltar para o site
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 10px', background: '#f1f5f9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 'bold' }}>Área do Dono 🚀</h2>
                    <button onClick={voltar} style={{ padding: '8px 15px', cursor: 'pointer', border: '1px solid #cbd5e1', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <ArrowLeft size={16} /> Sair
                    </button>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead style={{ background: '#0f172a', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '15px', textAlign: 'left', minWidth: '150px' }}>Cliente</th>
                            <th style={{ padding: '15px', textAlign: 'left', minWidth: '120px' }}>Conta (R$)</th>
                            <th style={{ padding: '15px', textAlign: 'center', minWidth: '100px' }}>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#334155' }}>{cliente.nome}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{cliente.telefone}</div>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#16a34a', fontWeight: 'bold' }}>
                                        <DollarSign size={16} /> {cliente.valorConta}
                                    </div>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => chamarNoZap(cliente.telefone, cliente.nome)}
                                        style={{ background: '#25D366', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', margin: '0 auto', whiteSpace: 'nowrap' }}
                                    >
                                        <MessageCircle size={18} /> Chamar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {clientes.length === 0 && <p style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Nenhum cliente cadastrado ainda.</p>}
                </div>
            </div>
        </div>
    );
}