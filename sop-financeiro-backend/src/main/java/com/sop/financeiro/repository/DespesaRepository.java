
package com.sop.financeiro.repository;

import com.sop.financeiro.model.Despesa;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {
@Query("SELECT d FROM Despesa d WHERE " +
       "(:numeroProtocolo IS NULL OR d.numeroProtocolo = :numeroProtocolo) AND " +
       "(:tipoDespesa IS NULL OR d.tipoDespesa = :tipoDespesa) AND " +
       "(:dataProtocolo IS NULL OR d.dataProtocolo = :dataProtocolo)")
List<Despesa> buscarDespesas(@Param("numeroProtocolo") String numeroProtocolo,
                              @Param("tipoDespesa") String tipoDespesa,
                              @Param("dataProtocolo") LocalDate dataProtocolo);
}

