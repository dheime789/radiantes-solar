import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import './App.css';

// Fotos "Falsas" para não deixar o site vazio no início
const DEPOIMENTOS_FIXOS = [
    {
        id: 'fake1',
        nomeCliente: 'Carlos Eduardo',
        cidade: 'Ji-Paraná, RO',
        texto: 'Instalei faz 3 meses e minha conta caiu de R$ 800 para R$ 60. Melhor investimento!',
        fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        estrelas: 5
    },
    {
        id: 'fake2',
        nomeCliente: 'Ana Clara',
        cidade: 'Ouro Preto, RO',
        texto: 'A equipe da Radiantes foi super rápida. Em 2 dias estava tudo funcionando.',
        fotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        estrelas: 5
    },
    {
        id: 'fake3',
        nomeCliente: 'Roberto Silva',
        cidade: 'Cacoal, RO',
        texto: 'Recomendo demais! O pós-venda deles é excelente, tiraram todas as minhas dúvidas.',
        fotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        estrelas: 5
    }
];

export function DepoimentosClientes() {
    const [depoimentos, setDepoimentos] = useState([]);
    const [usandoFakes, setUsandoFakes] = useState(false);

    useEffect(() => {
        carregarDepoimentos();
    }, []);

    const carregarDepoimentos = async () => {
        try {
            // Tenta buscar do banco de dados real
            const resposta = await axios.get('https://radiantes-solar-production.up.railway.app/api/admin/depoimentos');

            if (resposta.data.length > 0) {
                // SE TEM FOTO REAL: Usa a real
                setDepoimentos(resposta.data);
                setUsandoFakes(false);
            } else {
                // SE O BANCO TÁ VAZIO: Usa as falsas
                setDepoimentos(DEPOIMENTOS_FIXOS);
                setUsandoFakes(true);
            }
        } catch (erro) {
            // Se der erro na internet, usa as falsas pra não quebrar o site
            console.error("Erro ao buscar depoimentos, usando backup.", erro);
            setDepoimentos(DEPOIMENTOS_FIXOS);
            setUsandoFakes(true);
        }
    };

    return (
        <section className="depoimentos-section" style={{ padding: '60px 20px', background: '#f8fafc' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ color: '#0f172a', fontSize: '2rem', marginBottom: '10px' }}>
                        {usandoFakes ? "O que nossos clientes dizem" : "Instalações Recentes da Radiante's"}
                    </h2>
                    <p style={{ color: '#64748b' }}>
                        {usandoFakes ? "Junte-se a centenas de clientes satisfeitos." : "Veja nossos últimos trabalhos e clientes felizes!"}
                    </p>
                </div>

                {/* GRID INTELIGENTE */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px',
                    justifyContent: 'center'
                }}>
                    {depoimentos.map((dep) => (
                        <div key={dep.id} style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '20px', // Reduzi um pouco o padding interno para caber mais foto
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease'
                        }}
                             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >

                            {/* --- AQUI ESTÁ A MUDANÇA (ESTILO VITRINE) --- */}
                            <div style={{
                                width: '100%',        /* 1. Ocupa a largura total do cartão */
                                height: '220px',      /* 2. Altura fixa (retangular) */
                                borderRadius: '15px', /* 3. Cantos levemente arredondados */
                                overflow: 'hidden',   /* 4. Corta o que sobrar da imagem */
                                marginBottom: '20px',
                                border: '1px solid #e2e8f0', /* Borda fininha e elegante */
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: '#f1f5f9'
                            }}>
                                <img
                                    src={dep.fotoUrl || "https://via.placeholder.com/300x200?text=Sem+Foto"}
                                    alt={dep.nomeCliente}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover' /* 5. Ajuste inteligente da imagem */
                                    }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=Erro"; }}
                                />
                            </div>

                            {/* NOME E CIDADE */}
                            <h3 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>{dep.nomeCliente}</h3>
                            <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '15px' }}>
                                {dep.cidade}
                            </span>

                            {/* ESTRELAS */}
                            <div style={{ display: 'flex', gap: '3px', marginBottom: '15px' }}>
                                {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="#fbbf24" color="#fbbf24"/>)}
                            </div>

                            {/* DEPOIMENTO */}
                            <p style={{ color: '#475569', fontStyle: 'italic', lineHeight: '1.6' }}>
                                "{dep.texto}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}