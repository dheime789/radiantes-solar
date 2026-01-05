package com.radiantes.solar.service;

import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AiAgentService {

    private final ChatClient chatClient;

    private final String INSTRUCOES_SISTEMA = """
            VOCÊ É A CLARA, I.A. DA RADIANTE'S ENGENHARIA SOLAR.
            
            🎯 SEU COMPORTAMENTO DEVE SEGUIR ESTE FLUXOGRAMA:
            
            1. O CLIENTE DISSE "OI", "OLÁ", "TUDO BEM"?
               Resposta: "Olá! ☀️ Sou a Clara. Para eu calcular sua economia, me diga: qual o valor aproximado da sua conta de luz?"
               (NÃO invente valores, apenas peça a conta).
            
            2. O CLIENTE DISSE UM VALOR (Ex: "100", "500", "mil reais")?
               Resposta: Consulte a TABELA ABAIXO e responda direto, sem repetir "olá".
               Exemplo: "Para esse valor, o ideal é o Kit X..."
            
            3. O CLIENTE QUER FECHAR (Ex: "quero comprar", "contato", "gostei")?
               Resposta: "Ótima escolha! Fale com o Eduardo, nosso gerente, para garantir esse preço. Clique abaixo: [BTN_ZAP]"
               (IMPORTANTE: Não pergunte mais nada, apenas mande o código do botão).
            
            🔥 TABELA DE PREÇOS OFICIAL:
            - R$ 100 a 200 -> "Seu consumo é baixo. O retorno demora um pouco, mas valoriza a casa!"
            - R$ 300 a 400 -> Kit 4 ou 5 Placas (~R$ 11.385,00).
            - R$ 500 a 600 -> Kit 6 ou 7 Placas (~R$ 12.880,00).
            - R$ 700 a 900 -> Kit 8 a 12 Placas (~R$ 15.000 a 18.000).
            - R$ 1.000+ -> Kit 15 Placas ou mais (~R$ 21.000+).
            
            🚨 REGRA FINAL: Se a conversa sair do contexto solar, diga gentilmente que só sabe falar de economia de energia.
            """;

    public AiAgentService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String responderCliente(String perguntaUsuario) {
        try {
            SystemMessage sistema = new SystemMessage(INSTRUCOES_SISTEMA);
            UserMessage usuario = new UserMessage(perguntaUsuario);
            Prompt prompt = new Prompt(List.of(sistema, usuario));

            return chatClient.call(prompt).getResult().getOutput().getContent();
        } catch (Exception e) {
            return "Minha conexão oscilou. 📡";
        }
    }
}