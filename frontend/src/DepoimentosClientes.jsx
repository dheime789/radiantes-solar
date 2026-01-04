import { Star } from 'lucide-react';
import './App.css'; // Aproveita o estilo global, mas usa classes específicas

export function DepoimentosClientes() {

    // Lista de clientes (Fácil de editar no futuro)
    const clientes = [
        {
            nome: "Carlos Eduardo",
            cidade: "Ji-Paraná, RO",
            foto: "https://randomuser.me/api/portraits/men/32.jpg",
            texto: "Instalei ano passado e minha conta caiu de R$ 800 para a taxa mínima. Recomendo demais a Radiante's!"
        },
        {
            nome: "Ana Clara",
            cidade: "Ouro Preto, RO",
            foto: "https://randomuser.me/api/portraits/women/44.jpg",
            texto: "Atendimento impecável desde o orçamento até a instalação. A equipe explicou tudo certinho."
        },
        {
            nome: "Roberto Silva",
            cidade: "Cacoal, RO",
            foto: "https://randomuser.me/api/portraits/men/85.jpg",
            texto: "Melhor investimento que fiz. O retorno é garantido e o sistema funciona perfeitamente."
        }
    ];

    return (
        <div className="secao-depoimentos">
            <h2 className="titulo-depoimentos">Quem usa, confia ⭐</h2>
            <p className="subtitulo-depoimentos">Veja o que nossos clientes de Rondônia estão falando.</p>

            <div className="grade-depoimentos">
                {clientes.map((cliente, index) => (
                    <div key={index} className="card-cliente">
                        <img src={cliente.foto} alt={cliente.nome} className="foto-cliente"/>
                        <h4 className="nome-cliente">{cliente.nome}</h4>
                        <span className="cidade-cliente">{cliente.cidade}</span>

                        <div className="estrelas">
                            <Star size={14} fill="#fbbf24" stroke="#fbbf24"/>
                            <Star size={14} fill="#fbbf24" stroke="#fbbf24"/>
                            <Star size={14} fill="#fbbf24" stroke="#fbbf24"/>
                            <Star size={14} fill="#fbbf24" stroke="#fbbf24"/>
                            <Star size={14} fill="#fbbf24" stroke="#fbbf24"/>
                        </div>

                        <p className="texto-depoimento">"{cliente.texto}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}