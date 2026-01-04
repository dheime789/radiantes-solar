package com.radiantes.solar.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class KitSolar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;          // Ex: "Kit Conforto"
    private Integer geracaoMensal; // Ex: 900 (kWh)
    private Double preco;         // Ex: 13000.00
    private String descricao;     // Ex: "Ideal para contas até R$ 1000"
    private String imagemUrl;     // URL da foto do kit (vamos usar depois)
}