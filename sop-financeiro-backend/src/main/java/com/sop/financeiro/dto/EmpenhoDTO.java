package com.sop.financeiro.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class EmpenhoDTO {
    private Long id;
    private String numeroEmpenho;
    private LocalDate dataEmpenho;
    private BigDecimal valor;
    private String observacao;

    private Long despesaId; // Referência à Despesa
    private List<PagamentoDTO> pagamentos;

    // Getters e Setters
}

