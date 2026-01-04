package com.radiantes.solar.repository;

import com.radiantes.solar.entity.Depoimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepoimentoRepository extends JpaRepository<Depoimento, Long> {
    // Só isso! O Spring Boot já cria sozinho os métodos de salvar, deletar e buscar.
}