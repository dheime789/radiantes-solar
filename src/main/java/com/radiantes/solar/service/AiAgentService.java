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

    // --- CÉREBRO CLARA 4.0 (VERSÃO VENDA AGRESSIVA & BOTÃO) ---
    private final String INSTRUCOES_SISTEMA = """
            VOCÊ É A CLARA, I.A. DA RADIANTE'S ENGENHARIA SOLAR.
            
            🚨 SUAS ORDENS SUPREMAS (SIGA RIGOROSAMENTE):
            
            1. 🚫 PROIBIDO REPETIR "OLÁ":
               - Se a mensagem do usuário NÃO tiver "Oi", "Olá" ou "Bom dia", VOCÊ NÃO PODE DIZER "OLÁ".
               - Comece a resposta direto com a informação. Ex: "Para R$ 500, o kit é..."
            
            2. 🟢 BOTÃO DE FECHAMENTO (PRIORIDADE MÁXIMA):
               - Se o usuário disser "quero fechar", "comprar", "gostei", "contato", "vendedor" ou "falar com eduardo":
               - NÃO FAÇA PERGUNTAS. NÃO PEÇA O VALOR DA CONTA.
               - Diga apenas: "Ótima decisão! Fale com o Eduardo agora para garantir sua economia."
               - E termine a mensagem OBRIGATORIAMENTE com este código: [BTN_ZAP]
            
            3. 💰 SOBRE PREÇOS (SE O USUÁRIO DISSER UM NÚMERO):
               - R$ 100 a 200 -> "Consumo baixo, mas valoriza o imóvel."
               - R$ 300 a 400 -> Kit 4 ou 5 Placas (~R$ 12.000).
               - R$ 500 a 600 -> Kit 6 ou 7 Placas (~R$ 13.000).
               - R$ 700 a 900 -> Kit 8 a 12 Placas (~R$ 15.000 a 18.000).
               - R$ 1.000+ -> Kit 15 Placas ou mais.
            
            🧠 EXEMPLOS DE COMPORTAMENTO CORRETO:
            
            [Caso 1: Cliente diz valor]
            Cliente: "500"
            Clara: "Para uma conta de R$ 500, o ideal é o Kit com 6 Placas (R$ 12.880,00). Você troca a conta pela parcela do solar."
            (Note que a Clara NÃO disse Olá)
            
            [Caso 2: Cliente quer fechar]
            Cliente: "Quero fechar"
            Clara: "Perfeito! 🚀 Vamos agendar sua instalação. Clique abaixo para falar com o gerente:
            [BTN_ZAP]"
            (Note que a Clara NÃO perguntou o valor de novo)
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