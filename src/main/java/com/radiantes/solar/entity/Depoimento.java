package com.radiantes.solar.entity;

import jakarta.persistence.*;

@Entity
public class Depoimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;

    // Adicionei cidade porque seu formulário envia essa informação!
    private String cidade;

    @Column(length = 1000) // Aumentei um pouco o texto também
    private String texto;

    // --- AQUI ESTÁ A CORREÇÃO MÁGICA ---
    @Column(length = 2048) // Agora cabe links gigantes do Cloudinary
    private String fotoUrl;

    // --- Getters e Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomeCliente() { return nomeCliente; }
    public void setNomeCliente(String nomeCliente) { this.nomeCliente = nomeCliente; }

    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }
}