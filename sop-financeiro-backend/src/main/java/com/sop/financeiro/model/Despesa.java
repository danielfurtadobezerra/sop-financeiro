
package com.sop.financeiro.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String numeroProtocolo;

    @Column
    private String tipoDespesa;

    @Column
    private LocalDate  dataProtocolo;

    @Column
    private LocalDate dataVencimento;

    @Column
    private String credor;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column
    private BigDecimal valor;

    private String status;

    @OneToMany(mappedBy = "despesa", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("despesa-empenhos")
    private List<Empenho> empenhos;

    public void atualizarEmpenhos(List<Empenho> novosEmpenhos) {
    this.empenhos.clear();
    if (novosEmpenhos != null) {
        for (Empenho emp : novosEmpenhos) {
            emp.setDespesa(this);
            this.empenhos.add(emp);
        }
    }
}
}
