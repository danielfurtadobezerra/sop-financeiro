
package com.sop.financeiro.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Empenho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String numeroEmpenho;

    @Column(nullable = false)
    private LocalDate dataEmpenho;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(columnDefinition = "TEXT")
    private String observacao;

    @ManyToOne
    @JoinColumn(name = "despesa_id", nullable = false)
    @JsonBackReference("despesa-empenhos")
    private Despesa despesa;

    @OneToMany(mappedBy = "empenho", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Pagamento> pagamentos;
}
