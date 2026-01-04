package com.radiantes.solar.repository;

import com.radiantes.solar.domain.Cliente; // <--- O segredo está aqui!
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Aqui o Java entende: "Ah, é para salvar aquele Cliente da pasta domain!"
}