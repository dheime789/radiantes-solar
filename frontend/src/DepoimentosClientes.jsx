import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, MapPin } from 'lucide-react';

export function DepoimentosClientes() {
    const [depoimentos, setDepoimentos] = useState([]);

    useEffect(() => {
        // Carrega as fotos reais do banco de dados
        axios.get('https://radiantes-solar-production.up.railway.app/api/admin/depoimentos')
            .then(res => setDepoimentos(res.data))
            .catch(erro => console.error("Erro ao carregar galeria", erro));
    }, []);

    if (depoimentos.length === 0) return null;

    return (
        <div style={{ padding: '40px 20px', background: '#f8fafc', textAlign: 'center' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '10px' }}>Instalações Recentes da Radiante's ☀️</h2>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>Veja nossos últimos trabalhos e clientes felizes!</p>

            {/* --- CONTAINER DE ROLAGEM LATERAL (CARROSSEL) --- */}
            <div style={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto', // Habilita rolagem lateral
                paddingBottom: '20px',
                scrollSnapType: 'x mandatory', // Faz "travar" na foto ao rolar
                WebkitOverflowScrolling: 'touch' // Rolagem suave no iPhone
            }}>

                {depoimentos.map((dep) => (
                    <div key={dep.id} style={{
                        minWidth: '300px', // Tamanho fixo da largura
                        maxWidth: '300px',
                        background: 'white',
                        borderRadius: '20px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        flex: 'none', // Impede que os cards diminuam
                        scrollSnapAlign: 'center', // Centraliza ao parar de rolar
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                        {/* A FOTO AGORA É MAIS ALTA E NÃO CORTA */}
                        <div style={{ height: '350px', width: '100%', overflow: 'hidden' }}>
                            <img
                                src={dep.fotoUrl}
                                alt={dep.nomeCliente}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover' // Preenche sem esticar
                                }}
                            />
                        </div>

                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.2rem' }}>{dep.nomeCliente}</h3>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: '#64748b', fontSize: '0.9rem', marginBottom: '10px' }}>
                                <MapPin size={14} /> {dep.cidade}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '10px' }}>
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={16} fill="#fbbf24" color="#fbbf24" />
                                ))}
                            </div>

                            {dep.texto && (
                                <p style={{ fontSize: '0.9rem', color: '#475569', fontStyle: 'italic', margin: 0 }}>
                                    "{dep.texto}"
                                </p>
                            )}
                        </div>
                    </div>
                ))}

            </div>

            {/* Dica visual para rolar */}
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
                👈 Deslize para ver mais fotos 👉
            </p>
        </div>
    );
}