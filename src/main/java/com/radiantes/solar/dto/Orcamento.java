package com.radiantes.solar.dto;

public class Orcamento {
    private String nome;
    private Double preco;
    private int geracaoMensal;

    public Orcamento() {}

    public Orcamento(String nome, Double preco, int geracaoMensal) {
        this.nome = nome;
        this.preco = preco;
        this.geracaoMensal = geracaoMensal;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Double getPreco() { return preco; }
    public void setPreco(Double preco) { this.preco = preco; }

    public int getGeracaoMensal() { return geracaoMensal; }
    public void setGeracaoMensal(int geracaoMensal) { this.geracaoMensal = geracaoMensal; }
}