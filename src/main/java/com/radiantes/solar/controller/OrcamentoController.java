package com.radiantes.solar.controller;

import com.radiantes.solar.domain.Cliente;
import com.radiantes.solar.dto.Orcamento;
import com.radiantes.solar.repository.ClienteRepository;
import com.radiantes.solar.service.OrcamentoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orcamento")
@CrossOrigin(origins = "*") // Isso libera o site para conectar
public class OrcamentoController {

    private final OrcamentoService service;
    private final ClienteRepository repository;

    public OrcamentoController(OrcamentoService service, ClienteRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    @PostMapping("/simular")
    public Orcamento simular(@RequestBody Cliente dados) {
        // 1. Salva o cliente no banco de dados (Agora com Cidade!)
        try {
            repository.save(dados);
        } catch (Exception e) {
            System.out.println("Aviso: Erro ao salvar no banco, mas vou calcular o preço.");
        }

        // 2. Calcula o preço usando a tabela
        return service.calcularPreco(dados.getValorConta());
    }

    @GetMapping("/clientes")
    public List<Cliente> listarClientes() {
        return repository.findAll();
    }
}