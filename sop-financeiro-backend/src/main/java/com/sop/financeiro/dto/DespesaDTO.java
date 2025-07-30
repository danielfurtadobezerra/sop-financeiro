package com.sop.financeiro.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

public class DespesaDTO {
    private Long id;
    private String numeroProtocolo;
    private String tipoDespesa;
    private LocalDateTime dataProtocolo;
    private LocalDate dataVencimento;
    private String credor;
    private String descricao;
    private BigDecimal valor;
    private String status;

    private List<EmpenhoDTO> empenhos;

    // Getters e Setters
}
