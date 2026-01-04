package com.radiantes.solar.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class HistoricoOrcamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;
    private String telefone;
    private String cidade;
    private Double valorConta;
    private String kitSugerido; // Vamos salvar o nome do kit
    private Double valorInvestimento;

    private LocalDateTime dataSimulacao = LocalDateTime.now();

    // Construtores
    public HistoricoOrcamento() {}

    public HistoricoOrcamento(String nome, String tel, String cid, Double conta, String kit, Double invest) {
        this.nomeCliente = nome;
        this.telefone = tel;
        this.cidade = cid;
        this.valorConta = conta;
        this.kitSugerido = kit;
        this.valorInvestimento = invest;
    }

    // Getters
    public Long getId() { return id; }
    public String getNomeCliente() { return nomeCliente; }
    public String getTelefone() { return telefone; }
    public String getCidade() { return cidade; }
    public Double getValorConta() { return valorConta; }
    public LocalDateTime getDataSimulacao() { return dataSimulacao; }
    // (Pode gerar os Setters se quiser, mas o construtor já resolve)
}