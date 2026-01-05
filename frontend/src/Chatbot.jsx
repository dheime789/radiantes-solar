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

    // --- RENDERIZADOR DO BOTÃO ---
    const renderizarMensagem = (texto) => {
        if (!texto) return null;

        // Verifica se tem o código do botão
        if (texto.includes('[BTN_ZAP]')) {
            const textoLimpo = texto.replace('[BTN_ZAP]', '');

            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span>{textoLimpo}</span>
                    <a
                        href="https://wa.me/5569992825501?text=Gostei%20do%20orçamento%20da%20Clara!"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: '#25D366', color: 'white', textDecoration: 'none',
                            padding: '10px', borderRadius: '8px', fontWeight: 'bold',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                            marginTop: '5px', cursor: 'pointer'
                        }}
                    >
                        <Phone size={18} /> Falar com Eduardo
                    </a>
                </div>
            );
        }
        return <span>{texto}</span>;
    };

    const enviarMensagem = async () => {
        if (!input.trim()) return;
        const msgUser = { autor: 'usuario', texto: input };
        setMensagens(prev => [...prev, msgUser]);
        setInput('');
        setCarregando(true);

        try {
            const res = await axios.post('https://radiantes-solar-production.up.railway.app/api/chat', { mensagem: msgUser.texto });
            // Pega a resposta certa
            const textoIa = typeof res.data === 'string' ? res.data : res.data.resposta || "Erro";
            setMensagens(prev => [...prev, { autor: 'ia', texto: textoIa }]);
        } catch (error) {
            setMensagens(prev => [...prev, { autor: 'ia', texto: "Erro de conexão. Tente novamente." }]);
        } finally {
            setCarregando(false);
        }
    };

    if (!aberto) {
        return (
            <button onClick={() => setAberto(true)} style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#fbbf24', border: 'none', borderRadius: '50%', width: '60px', height: '60px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
                <MessageCircle size={30} color="#0f172a" />
            </button>
        );
    }

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '320px', height: '450px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', zIndex: 9999, overflow: 'hidden' }}>
            <div style={{ background: '#0f172a', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Bot size={20} /> <span style={{ fontWeight: 'bold' }}>Clara (IA)</span>
                </div>
                <X size={20} style={{ cursor: 'pointer' }} onClick={() => setAberto(false)} />
            </div>

            <div style={{ flex: 1, padding: '10px', overflowY: 'auto', background: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {mensagens.map((msg, i) => (
                    <div key={i} style={{
                        alignSelf: msg.autor === 'usuario' ? 'flex-end' : 'flex-start',
                        background: msg.autor === 'usuario' ? '#0f172a' : 'white',
                        color: msg.autor === 'usuario' ? 'white' : '#334155',
                        padding: '10px', borderRadius: '10px', maxWidth: '85%', fontSize: '0.9rem'
                    }}>
                        {renderizarMensagem(msg.texto)}
                    </div>
                ))}
                {carregando && <small style={{ color: '#94a3b8', marginLeft: '10px' }}>Digitando...</small>}
                <div ref={fimDoChatRef} />
            </div>

            <div style={{ padding: '10px', background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '5px' }}>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && enviarMensagem()} placeholder="Digite aqui..." style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <button onClick={enviarMensagem} style={{ background: '#fbbf24', border: 'none', borderRadius: '5px', width: '40px', cursor: 'pointer' }}><Send size={18} /></button>
            </div>
        </div>
    );
}