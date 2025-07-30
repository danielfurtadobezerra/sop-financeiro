package com.sop.financeiro.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PagamentoDTO {
    private Long id;
    private String numeroPagamento;
    private LocalDate dataPagamento;
    private BigDecimal valor;
    private String observacao;

    private Long empenhoId;

}

