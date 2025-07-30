
package com.sop.financeiro.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String numeroPagamento;

    @Column(nullable = false)
    private LocalDate dataPagamento;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(columnDefinition = "TEXT")
    private String observacao;

    @ManyToOne
    @JoinColumn(name = "empenho_id", nullable = false)
    private Empenho empenho;
}
