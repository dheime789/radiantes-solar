import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Admin } from './Admin';
// ADICIONEI O ICONE "PHONE" AQUI NOS IMPORTS
import { MessageCircle, Lock, Phone, Bot, X, Send } from 'lucide-react';
import { DepoimentosClientes } from './DepoimentosClientes';
import { Rodape } from './Rodape';
import logo from './assets/logo.jpg';

function App() {
    // --- LÓGICA DO SITE ---
    const [dados, setDados] = useState({ nome: '', telefone: '', cidade: '', valorConta: '' });
    const [kitSugerido, setKitSugerido] = useState(null);
    const [loading, setLoading] = useState(false);
    const [telaAdmin, setTelaAdmin] = useState(false);

    // --- LÓGICA DO CHAT (CLARA) ---
    const [chatAberto, setChatAberto] = useState(false);
    const [mensagens, setMensagens] = useState([
        { tipo: 'bot', texto: 'Olá! Sou a Clara, I.A. da Radiante\'s. ☀️ Digite o valor da sua conta para eu te ajudar!' }
    ]);
    const [inputChat, setInputChat] = useState('');
    const [carregandoChat, setCarregandoChat] = useState(false);
    const fimDoChatRef = useRef(null);

    useEffect(() => {
        fimDoChatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensagens, chatAberto]);

    const handleChange = (e) => setDados({ ...dados, [e.target.name]: e.target.value });

    // --- FUNÇÃO MÁGICA: CRIA O BOTÃO VERDE DO WHATSAPP ---
    const renderizarMensagem = (texto) => {
        if (!texto) return null;

        // Se encontrar o código secreto...
        if (texto.includes('[BTN_ZAP]')) {
            const textoLimpo = texto.replace('[BTN_ZAP]', '');

            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span>{textoLimpo}</span>
                    <a
                        href="https://wa.me/5569992825501?text=Olá,%20estava%20falando%20com%20a%20Clara%20e%20gostaria%20de%20fechar%20o%20negócio!"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: '#25D366', color: 'white', textDecoration: 'none',
                            padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            marginTop: '5px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Phone size={18} /> Falar com Eduardo
                    </a>
                </div>
            );
        }
        // Se não tiver código, devolve texto normal
        return <span>{texto}</span>;
    };

    const simular = async () => {
        if (!dados.nome || !dados.valorConta || !dados.telefone) {
            alert("Preencha todos os campos para ver a mágica acontecer! ✨");
            return;
        }
        setLoading(true);
        try {
            const resposta = await axios.post('https://radiantes-solar-production.up.railway.app/api/orcamento/simular', {
                nome: dados.nome,
                telefone: dados.telefone,
                valorConta: parseFloat(dados.valorConta)
            });
            setKitSugerido(resposta.data);
        } catch (erro) {
            alert("Opa! O servidor parece desligado.");
        } finally {
            setLoading(false);
        }
    };

    const falarComVendedor = () => {
        const tel = "5569992825501";
        const msg = `🌞 *SITE RADIANTE'S*%0A👤 ${dados.nome}%0A📱 ${dados.telefone}%0A📍 ${dados.cidade}%0A💰 Conta: R$ ${dados.valorConta}%0A📦 Kit: ${kitSugerido.nome}%0A💎 Valor: ${kitSugerido.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}%0A👇 Quero fechar negócio!`;
        window.open(`https://wa.me/${tel}?text=${msg}`, '_blank');
    };

    const enviarMensagemChat = async () => {
        if (!inputChat.trim()) return;
        const textoUsuario = inputChat;

        // Adiciona mensagem do usuário na tela
        setMensagens(prev => [...prev, { tipo: 'user', texto: textoUsuario }]);
        setInputChat('');
        setCarregandoChat(true);

        try {
            // CORREÇÃO: Usando POST para a IA funcionar
            const resposta = await axios.post('https://radiantes-solar-production.up.railway.app/api/chat', {
                mensagem: textoUsuario
            });

            const textoIa = typeof resposta.data === 'string' ? resposta.data : resposta.data.resposta || resposta.data;

            setMensagens(prev => [...prev, { tipo: 'bot', texto: textoIa }]);
        } catch (erro) {
            console.error(erro);
            setMensagens(prev => [...prev, { tipo: 'bot', texto: 'Minha conexão oscilou. 📡 Tente novamente!' }]);
        } finally {
            setCarregandoChat(false);
        }
    };

    if (telaAdmin) return <Admin voltar={() => setTelaAdmin(false)} />;

    return (
        <div className="container">
            {/* HERO SECTION */}
            <div className="hero">
                <header className="brand-header">
                    <img
                        src={logo}
                        alt="Logo Radiante's"
                        style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '15px', border: '2px solid #fbbf24' }}
                    />
                    <span className="brand-name">Radiante's Energia Solar</span>
                </header>

                <div className="hero-content">
                    <h1>Energia Solar Inteligente ☀️</h1>
                    <p>Pare de alugar energia da concessionária. Gere a sua própria.</p>
                </div>
            </div>

            {/* ÁREA PRINCIPAL */}
            <div className="main-content">
                {!kitSugerido ? (
                    <div className="card-form">
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '1.8rem', color: '#1e293b', margin: 0 }}>Simule sua Economia</h2>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Descubra quanto você vai poupar em segundos.</p>
                        </div>

                        <div className="input-group">
                            <label>Nome Completo</label>
                            <div className="input-wrapper">
                                <input name="nome" placeholder="Seu nome" value={dados.nome} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>WhatsApp</label>
                            <div className="input-wrapper">
                                <input name="telefone" placeholder="(69) 99999-9999" value={dados.telefone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Cidade</label>
                            <div className="input-wrapper">
                                <input name="cidade" placeholder="Ex: Ji-Paraná" value={dados.cidade} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Valor da Conta (R$)</label>
                            <div className="input-wrapper">
                                <input name="valorConta" type="number" placeholder="Ex: 500" value={dados.valorConta} onChange={handleChange} />
                            </div>
                        </div>

                        <button onClick={simular} disabled={loading} className="btn-simular">
                            {loading ? "Calculando..." : "Ver Meu Projeto 🚀"}
                        </button>

                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button onClick={() => setTelaAdmin(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', margin: '0 auto' }}>
                                <Lock size={12} /> Área Restrita
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="card-form resultado-container">
                        <h2 style={{ color: '#1e293b' }}>Projeto Pronto! 🎉</h2>
                        <p style={{ color: '#64748b' }}>Para: {dados.nome.split(' ')[0]}</p>

                        <div className="card-destaque">
                            <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>Economia estimada (25 anos)</span>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '5px' }}>
                                {(kitSugerido.geracaoMensal * 0.95 * 12 * 25).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </div>
                        </div>

                        <div style={{ textAlign: 'left', background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{kitSugerido.nome}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.95rem' }}>
                                <span>Geração Média:</span>
                                <strong>{kitSugerido.geracaoMensal} kWh/mês</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.95rem', marginTop: '5px' }}>
                                <span>Investimento:</span>
                                <strong style={{ color: '#16a34a' }}>{kitSugerido.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong>
                            </div>
                        </div>

                        <button onClick={falarComVendedor} className="btn-whatsapp">
                            <MessageCircle size={20} /> Solicitar Instalação
                        </button>
                        <p onClick={() => setKitSugerido(null)} style={{ marginTop: '15px', color: '#94a3b8', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>Fazer nova simulação</p>
                    </div>
                )}
            </div>

            <DepoimentosClientes />
            <Rodape />

            {/* CHAT WIDGET */}
            {chatAberto && (
                <div style={{
                    position: 'fixed', bottom: '100px', right: '30px', width: '350px', height: '500px',
                    background: 'white', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1000, border: '1px solid #f1f5f9'
                }}>
                    <div style={{ background: '#fbbf24', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ background: 'white', padding: '8px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}><Bot size={24} color="#fbbf24" /></div>
                            <div>
                                <span style={{ fontWeight: '800', color: '#78350f', display: 'block' }}>Clara (I.A.)</span>
                                <span style={{ fontSize: '0.75rem', color: '#92400e' }}>Online Agora</span>
                            </div>
                        </div>
                        <X size={24} style={{ cursor: 'pointer', color: '#78350f', opacity: 0.7 }} onClick={() => setChatAberto(false)} />
                    </div>

                    {/* ÁREA DAS MENSAGENS */}
                    <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {mensagens.map((msg, index) => (
                            <div key={index} style={{
                                alignSelf: msg.tipo === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.tipo === 'user' ? '#fbbf24' : 'white',
                                color: msg.tipo === 'user' ? '#78350f' : '#334155',
                                padding: '12px 16px', borderRadius: '16px', borderBottomRightRadius: msg.tipo === 'user' ? '4px' : '16px', borderBottomLeftRadius: msg.tipo === 'bot' ? '4px' : '16px',
                                maxWidth: '85%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', fontSize: '0.95rem', lineHeight: '1.4'
                            }}>
                                {/* AQUI ESTÁ A CORREÇÃO FINAL: USANDO A FUNÇÃO MÁGICA */}
                                {msg.tipo === 'bot' ? renderizarMensagem(msg.texto) : msg.texto}
                            </div>
                        ))}
                        {carregandoChat && <div style={{ alignSelf: 'flex-start', color: '#94a3b8', fontSize: '0.8rem', paddingLeft: '10px' }}>Digitando...</div>}
                        <div ref={fimDoChatRef} />
                    </div>

                    <div style={{ padding: '15px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px', background: 'white' }}>
                        <input
                            value={inputChat}
                            onChange={(e) => setInputChat(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && enviarMensagemChat()}
                            placeholder="Digite sua dúvida..."
                            style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: '25px', padding: '12px 20px', outline: 'none', background: '#f8fafc' }}
                        />
                        <button onClick={enviarMensagemChat} style={{ background: '#fbbf24', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(251, 191, 36, 0.3)' }}>
                            <Send size={20} color="#78350f" />
                        </button>
                    </div>
                </div>
            )}

            <button className="btn-clara-flutuante" onClick={() => setChatAberto(!chatAberto)}>
                {chatAberto ? <X size={24} color="#78350f"/> : <Bot size={32} color="#fbbf24" />}
            </button>
        </div>
    );
}

// Comentario para forçar update: App corrigido com botão
export default App;