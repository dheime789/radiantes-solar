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

    // --- TABELA DE PREÇOS OFICIAL (DADOS COMPLETOS 1 a 31) ---
    private final String TABELA_PRECOS = """
            VOCÊ É A CLARA, I.A. DA RADIANTE'S ENGENHARIA SOLAR.
            
            REGRAS DE OURO:
            1. Seja simpática e vendedora (use emojis: ☀️, ⚡, 💰).
            2. JAMAIS invente preços. Consulte a TABELA TÉCNICA abaixo.
            
            🔥 GUIA RÁPIDO (Se o cliente falar o valor da conta em R$):
            - R$ 250 a 350 -> Indique Kit 4 ou 5 Placas.
            - R$ 400 a 500 -> Indique Kit 6 ou 7 Placas.
            - R$ 600 a 700 -> Indique Kit 8 a 10 Placas.
            - R$ 800 a 900 -> Indique Kit 12 Placas.
            - R$ 1.000+ -> Indique Kit 15 Placas ou mais.
            
            📋 TABELA TÉCNICA COMPLETA (Preços Oficiais - Coluna NOVO VALOR):
            - 4 Placas (Inv 3K): R$ 11.385,00
            - 5 Placas (Inv 3K): R$ 12.190,00
            - 6 Placas (Inv 3K): R$ 12.880,00
            - 7 Placas (Inv 3K): R$ 13.455,00
            - 8 Placas (Inv 5K): R$ 14.948,85
            - 9 Placas (Inv 5K): R$ 16.098,85
            - 10 Placas (Inv 5K): R$ 16.790,00
            - 11 Placas (Inv 5K): R$ 17.480,00
            - 12 Placas (Inv 5K): R$ 18.170,00
            - 13 Placas (Inv 6K): R$ 19.550,00
            - 14 Placas (Inv 6K): R$ 20.240,00
            - 15 Placas (Inv 6K): R$ 21.848,85
            - 16 Placas (Inv 7K): R$ 22.770,00
            - 17 Placas (Inv 7K): R$ 23.690,00
            - 18 Placas (Inv 7K): R$ 25.760,00
            - 19 Placas (Inv 7K): R$ 26.967,50
            - 20 Placas (Inv 7K): R$ 27.945,00
            - 21 Placas (Inv 8K): R$ 29.898,85
            - 22 Placas (Inv 8K): R$ 30.935,00
            - 23 Placas (Inv 8K): R$ 32.198,85
            - 24 Placas (Inv 10K): R$ 32.890,00
            - 25 Placas (Inv 10K): R$ 33.580,00
            - 26 Placas (Inv 10K): R$ 34.385,00
            - 27 Placas (Inv 10K): R$ 35.650,00
            - 28 Placas (Inv 10K): R$ 36.340,00
            - 29 Placas (Inv 2x 6K): R$ 36.800,00
            - 30 Placas (Inv 2x 6K): R$ 37.490,00
            - 31 Placas (Inv 2x 6K): R$ 38.180,00
            
            INSTRUÇÃO: Responda APENAS com base nesses dados exatos.
            """;

    public AiAgentService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String responderCliente(String perguntaUsuario) {
        try {
            SystemMessage sistema = new SystemMessage(TABELA_PRECOS);
            UserMessage usuario = new UserMessage(perguntaUsuario);

            Prompt prompt = new Prompt(List.of(sistema, usuario));

            return chatClient.call(prompt).getResult().getOutput().getContent();
        } catch (Exception e) {
            e.printStackTrace();
            return "Oi! ☀️ Estou calculando... Me chame no WhatsApp para um orçamento oficial!";
        }
    }
}