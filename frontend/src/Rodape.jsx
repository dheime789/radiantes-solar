import './App.css';
import { Instagram, Phone, MapPin } from 'lucide-react';

export function Rodape() {
    return (
        <footer className="rodape-container">
            <div className="rodape-content">

                {/* Coluna 1: Sobre */}
                <div className="rodape-coluna">
                    <h3>Radiante's Energia Solar ☀️</h3>
                    <p>Referência em energia fotovoltaica em Rondônia.</p>
                    <p>Economize até 95% na sua conta de luz gerando sua própria energia.</p>
                </div>

                {/* Coluna 2: Contato */}
                <div className="rodape-coluna">
                    <h3>Fale Conosco</h3>
                    <div className="contato-item">
                        <Phone size={18} color="#fbbf24" />
                        <span>(69) 99282-5501</span>
                    </div>
                    <div className="contato-item">
                        <MapPin size={18} color="#fbbf24" />
                        <span>Ji-Paraná, RO</span>
                    </div>
                </div>


                {/* Coluna 3: Redes Sociais */}
                <div className="rodape-coluna">
                    <h3>Siga a gente</h3>
                    <div className="redes-sociais">
                        {/* Link do Instagram Direto */}
                        <a
                            href="https://www.instagram.com/radiantes_engenharia_solar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-social"
                            style={{ textDecoration: 'none' }}
                        >
                            <Instagram size={20}/>
                        </a>
                    </div>
                </div>

            </div>

            <div className="rodape-copy">
                {/* --- BLOCO NOVO: DADOS DA EMPRESA --- */}
                <div style={{ marginTop: '24px', fontSize: '0.85rem', opacity: '0.7' }}>
                    <p style={{ margin: '4px 0' }}>
                        <strong>Razão Social:</strong><br/>
                        E Godez Comercio de Materiais Eletricos
                    </p>
                    <p style={{ margin: '4px 0' }}>
                        <strong>CNPJ:</strong> 44.591.768/0001-52
                    </p>
                </div>
                {/* ------------------------------------ */}
                <p>© 2026 Radiante's Energia Solar. Todos os direitos reservados.</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Desenvolvido com Tecnologia Java & React</p>
            </div>
        </footer>
    );
}