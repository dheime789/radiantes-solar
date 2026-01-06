import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Save, LogOut, UploadCloud } from 'lucide-react';
import './App.css';

export function Admin({ voltar }) {
    const [abaAtiva, setAbaAtiva] = useState('simulacoes');
    const [simulacoes, setSimulacoes] = useState([]);
    const [depoimentos, setDepoimentos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Formulário
    const [novoDepoimento, setNovoDepoimento] = useState({ nomeCliente: '', cidade: '', texto: '', fotoUrl: '' });

    // --- CARREGAR DADOS ---
    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        setLoading(true);
        try {
            const respSimulacoes = await axios.get('https://radiantes-solar-production.up.railway.app/api/admin/simulacoes');
            setSimulacoes(respSimulacoes.data);
            const respDepoimentos = await axios.get('https://radiantes-solar-production.up.railway.app/api/admin/depoimentos');
            setDepoimentos(respDepoimentos.data);
        } catch (error) {
            console.error("Erro ao carregar:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- AÇÕES DO SISTEMA ---
    const apagarSimulacao = async (id) => {
        if (!confirm('Tem certeza que deseja apagar este histórico?')) return;
        try {
            await axios.delete(`https://radiantes-solar-production.up.railway.app/api/admin/simulacoes/${id}`);
            setSimulacoes(simulacoes.filter(item => item.id !== id));
        } catch (error) { alert('Erro ao apagar.'); }
    };

    const salvarDepoimento = async () => {
        if (!novoDepoimento.nomeCliente || !novoDepoimento.fotoUrl) {
            alert('Por favor, envie uma foto antes de salvar!');
            return;
        }
        try {
            const resp = await axios.post('https://radiantes-solar-production.up.railway.app/api/admin/depoimentos', novoDepoimento);
            setDepoimentos([...depoimentos, resp.data]);
            setNovoDepoimento({ nomeCliente: '', cidade: '', texto: '', fotoUrl: '' });
            alert('Foto adicionada à galeria com sucesso! 🚀');
        } catch (error) { alert('Erro ao salvar depoimento.'); }
    };

    const apagarDepoimento = async (id) => {
        if (!confirm('Apagar esta foto da galeria?')) return;
        try {
            await axios.delete(`https://radiantes-solar-production.up.railway.app/api/admin/depoimentos/${id}`);
            setDepoimentos(depoimentos.filter(item => item.id !== id));
        } catch (error) { alert('Erro ao apagar.'); }
    };

    // --- FUNÇÃO DO CLOUDINARY (WIDGET) ---
    const abrirWidget = () => {
        if (!window.cloudinary) {
            alert("O sistema de upload ainda está carregando. Tente em 2 segundos.");
            return;
        }

        const widget = window.cloudinary.createUploadWidget({
            cloudName: 'dgu6ovrm1', // SEU NOME DA NUVEM
            uploadPreset: 'radiantes', // SEU PRESET
            sources: ['local', 'camera', 'instagram'],
            multiple: false,
            defaultSource: "local",
            styles: {
                palette: {
                    window: "#FFFFFF",
                    windowBorder: "#90A0B3",
                    tabIcon: "#0F172A",
                    menuIcons: "#5A616A",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                    link: "#FBBF24",
                    action: "#FF620C",
                    inactiveTabIcon: "#0E2F5A",
                    error: "#F44235",
                    inProgress: "#0078FF",
                    complete: "#20B832",
                    sourceBg: "#E4EBF1"
                }
            }
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Foto enviada:", result.info.secure_url);
                // Preenche o campo de foto automaticamente
                setNovoDepoimento(prev => ({...prev, fotoUrl: result.info.secure_url}));
            }
        });
        widget.open();
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f1f5f9', padding: '20px', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 2000 }}>

            {/* CABEÇALHO */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'white', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        🚀 Painel do Dono
                    </h2>
                    <button onClick={voltar} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
                        <LogOut size={18} /> Sair
                    </button>
                </div>

                {/* ABAS */}
                <div style={{ display: 'flex', gap: '10px', background: '#f8fafc', padding: '5px', borderRadius: '10px' }}>
                    <button onClick={() => setAbaAtiva('simulacoes')} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: abaAtiva === 'simulacoes' ? '#fbbf24' : 'transparent', color: abaAtiva === 'simulacoes' ? '#78350f' : '#64748b', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
                        📊 Histórico de Clientes
                    </button>
                    <button onClick={() => setAbaAtiva('galeria')} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: abaAtiva === 'galeria' ? '#fbbf24' : 'transparent', color: abaAtiva === 'galeria' ? '#78350f' : '#64748b', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
                        📸 Galeria de Fotos
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '20px auto' }}>

                {/* ABA 1: HISTÓRICO */}
                {abaAtiva === 'simulacoes' && (
                    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#334155' }}>Quem simulou no site:</h3>
                        {loading ? <p>Carregando...</p> : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                    <thead>
                                    <tr style={{ background: '#f8fafc', color: '#64748b', textAlign: 'left' }}>
                                        <th style={{ padding: '15px' }}>Cliente</th>
                                        <th style={{ padding: '15px' }}>Telefone</th>
                                        <th style={{ padding: '15px' }}>Conta</th>
                                        <th style={{ padding: '15px' }}>Ação</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {simulacoes.map(sim => (
                                        <tr key={sim.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '15px' }}>
                                                <strong>{sim.nomeCliente}</strong><br/>
                                                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{sim.cidade}</span>
                                            </td>
                                            <td style={{ padding: '15px' }}>{sim.telefone}</td>
                                            <td style={{ padding: '15px', color: '#16a34a', fontWeight: 'bold' }}>R$ {sim.valorConta}</td>
                                            <td style={{ padding: '15px' }}>
                                                <button onClick={() => apagarSimulacao(sim.id)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* ABA 2: GALERIA DE FOTOS (COM UPLOAD INTEGRADO) */}
                {abaAtiva === 'galeria' && (
                    <div>
                        <div style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ marginTop: 0, color: '#334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Plus size={20} /> Adicionar Instalação Realizada
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <input
                                    placeholder="Nome do Cliente (ex: Sr. João)"
                                    value={novoDepoimento.nomeCliente}
                                    onChange={e => setNovoDepoimento({...novoDepoimento, nomeCliente: e.target.value})}
                                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                />
                                <input
                                    placeholder="Cidade (ex: Ji-Paraná)"
                                    value={novoDepoimento.cidade}
                                    onChange={e => setNovoDepoimento({...novoDepoimento, cidade: e.target.value})}
                                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                />

                                {/* --- ÁREA DO UPLOAD --- */}
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={abrirWidget}
                                        style={{
                                            background: '#0F172A', color: 'white',
                                            padding: '12px 20px', borderRadius: '8px',
                                            border: '2px solid #fbbf24', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold'
                                        }}
                                    >
                                        <UploadCloud size={20} /> Carregar Foto
                                    </button>

                                    <input
                                        placeholder="O link aparecerá aqui automaticamente..."
                                        value={novoDepoimento.fotoUrl}
                                        readOnly
                                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#64748b' }}
                                    />
                                </div>

                                {/* Prévia da Imagem */}
                                {novoDepoimento.fotoUrl && (
                                    <div style={{ padding: '10px', border: '1px dashed #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Foto Pronta:</span>
                                        <img src={novoDepoimento.fotoUrl} alt="Preview" style={{ height: '50px', borderRadius: '4px' }} />
                                    </div>
                                )}

                                <textarea
                                    placeholder="Depoimento ou Detalhes (ex: Economia de R$ 500/mês)"
                                    value={novoDepoimento.texto}
                                    onChange={e => setNovoDepoimento({...novoDepoimento, texto: e.target.value})}
                                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', minHeight: '80px' }}
                                />
                                <button
                                    onClick={salvarDepoimento}
                                    style={{ background: '#16a34a', color: 'white', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <Save size={20} /> Publicar no Site
                                </button>
                            </div>
                        </div>

                        {/* LISTAGEM */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                            {depoimentos.map(dep => (
                                <div key={dep.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', position: 'relative' }}>
                                    <img src={dep.fotoUrl} alt={dep.nomeCliente} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                    <button
                                        onClick={() => apagarDepoimento(dep.id)}
                                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Trash2 size={16} />
                                    </button>
                                    <div style={{ padding: '15px' }}>
                                        <h4 style={{ margin: 0 }}>{dep.nomeCliente}</h4>
                                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{dep.cidade}</span>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic' }}>"{dep.texto}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}