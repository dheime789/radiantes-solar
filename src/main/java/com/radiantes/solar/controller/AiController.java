package com.radiantes.solar.controller;

import com.radiantes.solar.service.AiAgentService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Permite que o site converse com o servidor
public class AiController {

    private final AiAgentService aiAgentService;

    public AiController(AiAgentService aiAgentService) {
        this.aiAgentService = aiAgentService;
    }

    // AQUI ESTAVA O PROBLEMA: Mudamos de @GetMapping para @PostMapping
    @PostMapping
    public String conversar(@RequestBody Map<String, String> payload) {
        // O App.js envia { "mensagem": "texto" }, então pegamos "mensagem"
        String pergunta = payload.get("mensagem");

        // Passa para a Clara (Service) responder
        return aiAgentService.responderCliente(pergunta);
    }
}