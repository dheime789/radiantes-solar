package com.radiantes.solar.controller;

import com.radiantes.solar.domain.Cliente;
import com.radiantes.solar.dto.Orcamento;
import com.radiantes.solar.entity.HistoricoOrcamento; // Importante: Import do Histórico
import com.radiantes.solar.repository.ClienteRepository;
import com.radiantes.solar.repository.HistoricoRepository; // Importante: Import do Repo
import com.radiantes.solar.service.OrcamentoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orcamento")
@CrossOrigin(origins = "*")
public class OrcamentoController {

    private final OrcamentoService service;
    private final ClienteRepository repository;
    private final HistoricoRepository historicoRepository; // Adicionei aqui

    // Atualizei o construtor para receber o HistoricoRepository também
    public OrcamentoController(OrcamentoService service, ClienteRepository repository, HistoricoRepository historicoRepository) {
        this.service = service;
        this.repository = repository;
        this.historicoRepository = historicoRepository;
    }

    @PostMapping("/simular")
    public Orcamento simular(@RequestBody Cliente dados) {
        // 1. Tenta salvar o cliente no cadastro geral
        try {
            repository.save(dados);
        } catch (Exception e) {
            System.out.println("Aviso: Erro ao salvar cliente, mas vou calcular o preço.");
        }

        // 2. Calcula o orçamento
        Orcamento kit = service.calcularPreco(dados.getValorConta());

        // 3. NOVO: Salva no Histórico para aparecer no Admin!
        try {
            HistoricoOrcamento historico = new HistoricoOrcamento(
                    dados.getNome(),
                    dados.getTelefone(),
                    dados.getCidade() != null ? dados.getCidade() : "Não informada",
                    dados.getValorConta(),
                    kit.getNome(),
                    kit.getPreco()
            );
            historicoRepository.save(historico);
        } catch (Exception e) {
            System.out.println("Erro ao salvar histórico: " + e.getMessage());
        }

        // 4. Devolve o kit calculado para o site mostrar
        return kit;
    }

    @GetMapping("/clientes")
    public List<Cliente> listarClientes() {
        return repository.findAll();
    }
}