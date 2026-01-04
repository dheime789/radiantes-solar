package com.radiantes.solar.controller;

import com.radiantes.solar.service.AiAgentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Libera o site para acessar
public class AiController {

    private final AiAgentService aiAgentService;

    public AiController(AiAgentService aiAgentService) {
        this.aiAgentService = aiAgentService;
    }

    @GetMapping
    public String conversar(@RequestParam String pergunta) {
        // Chama a função exata que criamos no AiAgentService
        return aiAgentService.responderCliente(pergunta);
    }
}