package com.radiantes.solar.controller;

import com.radiantes.solar.entity.Depoimento;
import com.radiantes.solar.repository.DepoimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/depoimentos")
@CrossOrigin(origins = "*") // Libera para o Frontend (Vercel) acessar
public class DepoimentoController {

    @Autowired
    private DepoimentoRepository repository;

    // 1. Listar todos os depoimentos (Para o site mostrar)
    @GetMapping
    public List<Depoimento> listarTodos() {
        return repository.findAll();
    }

    // 2. Adicionar um novo depoimento (Para o cliente salvar)
    @PostMapping
    public Depoimento salvar(@RequestBody Depoimento novoDepoimento) {
        return repository.save(novoDepoimento);
    }

    // 3. Deletar um depoimento (Caso o cliente erre)
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}