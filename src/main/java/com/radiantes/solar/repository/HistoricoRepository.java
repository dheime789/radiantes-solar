package com.radiantes.solar.repository;

import com.radiantes.solar.entity.HistoricoOrcamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricoRepository extends JpaRepository<HistoricoOrcamento, Long> {
}