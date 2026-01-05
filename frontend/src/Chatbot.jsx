import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Phone } from 'lucide-react';
import axios from 'axios';

export function Chatbot() {
    const [aberto, setAberto] = useState(false);
    const [mensagens, setMensagens] = useState([
        { autor: 'ia', texto: 'Olá! Sou a Clara, assistente virtual da Radiante\'s. ☀️ Como posso te ajudar hoje?' }
    ]);
    const [input, setInput] = useState('');
    const [carregando, setCarregando] = useState(false);

    const fimDoChatRef = useRef(null);

    useEffect(() => {
        fimDoChatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensagens, aberto]);

    // --- ESSA É A PARTE QUE CRIA O BOTÃO ---
    const renderizarMensagem = (texto) => {
        // Se a mensagem tiver o código secreto...
        if (texto && texto.includes('[BTN_ZAP]')) {
            const textoLimpo = texto.replace('[BTN_ZAP]', '');

            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span>{textoLimpo}</span>

                    <a
                        href="https://wa.me/5569992825501?text=Olá,%20falei%20com%20a%20Clara%20e%20gostaria%20de%20fechar%20o%20negócio!"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: '#25D366', // Verde WhatsApp
                            color: 'white',
                            textDecoration: 'none',
                            padding: '12px 20px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '5px',
                            cursor: 'pointer',
                            transition: '0.2s',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                    >
                        <Phone size={18} /> Falar com Eduardo Agora
                    </a>
                </div>
            );
        }
        return texto;
    };
    // ----------------------------------------

    const enviarMensagem = async () => {
        if (!input.trim()) return;

        const novaMensagemUsuario = { autor: 'usuario', texto: input };
        setMensagens((prev) => [...prev, novaMensagemUsuario]);
        setInput('');
        setCarregando(true);

        try {
            // OBS: Se estiver rodando local, certifique-se que o backend está rodando
            const resposta = await axios.post('https://radiantes-solar-production.up.railway.app/api/chat', {
                mensagem: novaMensagemUsuario.texto
            });

            // Tratamento para garantir que pegamos o texto certo
            const textoResposta = typeof resposta.data === 'string' ? resposta.data : resposta.data.resposta || "Erro ao ler resposta";

            const novaMensagemIa = { autor: 'ia', texto: textoResposta };
            setMensagens((prev) => [...prev, novaMensagemIa]);
        } catch (erro) {
            console.error(erro);
            setMensagens((prev) => [...prev, { autor: 'ia', texto: 'Ops! Minha conexão falhou. Tente novamente.' }]);
        } finally {
            setCarregando(false);
        }
    };

    if (!aberto) {
        return (
            <button
                onClick={() => setAberto(true)}
                style={{
                    position: 'fixed', bottom: '20px', right: '20px',
                    backgroundColor: 'var(--radiante-yellow)', color: 'var(--radiante-blue)',
                    border: 'none', borderRadius: '50%', width: '60px', height: '60px',
                    cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}
            >
                <MessageCircle size={32} />
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed', bottom: '20px', right: '20px',
            width: '350px', height: '500px', backgroundColor: 'white',
            borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1000,
            border: '1px solid #e2e8f0'
        }}>
            <div style={{ backgroundColor: 'var(--radiante-blue)', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'white', padding: '5px', borderRadius: '50%' }}>
                        <Bot size={20} color="var(--radiante-blue)" />
                    </div>
                    <div>
                        <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Clara (IA)</p>
                        <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Online agora</p>
                    </div>
                </div>
                <button onClick={() => setAberto(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                    <X size={20} />
                </button>
            </div>

            <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc' }}>
                {mensagens.map((msg, index) => (
                    <div key={index} style={{
                        alignSelf: msg.autor === 'usuario' ? 'flex-end' : 'flex-start',
                        backgroundColor: msg.autor === 'usuario' ? 'var(--radiante-blue)' : 'white',
                        color: msg.autor === 'usuario' ? 'white' : '#1e293b',
                        padding: '10px 15px', borderRadius: '12px', maxWidth: '85%',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        borderBottomRightRadius: msg.autor === 'usuario' ? '0' : '12px',
                        borderBottomLeftRadius: msg.autor === 'ia' ? '0' : '12px',
                        fontSize: '0.9rem',
                        wordWrap: 'break-word'
                    }}>
                        {/* AQUI APLICAMOS A FUNÇÃO MÁGICA */}
                        {renderizarMensagem(msg.texto)}
                    </div>
                ))}
                {carregando && <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', marginLeft: '10px' }}>Clara está digitando...</p>}

                <div ref={fimDoChatRef} />
            </div>

            <div style={{ padding: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', background: 'white' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                    placeholder="Digite sua dúvida..."
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
                <button
                    onClick={enviarMensagem}
                    disabled={carregando}
                    style={{
                        backgroundColor: 'var(--radiante-yellow)', border: 'none',
                        borderRadius: '8px', width: '45px', cursor: 'pointer',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <Send size={20} color="var(--radiante-blue)" />
                </button>
            </div>
        </div>
    );
}