package com.radiantes.solar.controller;

import com.radiantes.solar.entity.Depoimento;
import com.radiantes.solar.entity.HistoricoOrcamento;
import com.radiantes.solar.repository.DepoimentoRepository;
import com.radiantes.solar.repository.HistoricoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private HistoricoRepository historicoRepository;

    @Autowired
    private DepoimentoRepository depoimentoRepository;

    // --- HISTÓRICO DE SIMULAÇÕES ---
    @GetMapping("/simulacoes")
    public List<HistoricoOrcamento> listarHistorico() {
        // Retorna tudo (se quiser ordenar por data depois a gente melhora)
        return historicoRepository.findAll();
    }

    @DeleteMapping("/simulacoes/{id}")
    public void apagarHistorico(@PathVariable Long id) {
        historicoRepository.deleteById(id);
    }

    // --- DEPOIMENTOS E FOTOS ---
    @GetMapping("/depoimentos")
    public List<Depoimento> listarDepoimentos() {
        return depoimentoRepository.findAll();
    }

    @PostMapping("/depoimentos")
    public Depoimento salvarDepoimento(@RequestBody Depoimento depoimento) {
        return depoimentoRepository.save(depoimento);
    }

    @DeleteMapping("/depoimentos/{id}")
    public void apagarDepoimento(@PathVariable Long id) {
        depoimentoRepository.deleteById(id);
    }
}