
package com.sop.financeiro.service;

import com.sop.financeiro.model.Despesa;
import com.sop.financeiro.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {
    @Autowired
    private DespesaRepository despesaRepository;

    public List<Despesa> findAll() {
        return despesaRepository.findAll();
    }

    public Optional<Despesa> findById(Long id) {
        return despesaRepository.findById(id);
    }

    public Despesa save(Despesa obj) {
        return despesaRepository.save(obj);
    }

    public void delete(Long id) {
        despesaRepository.deleteById(id);
    }

    public List<Despesa> buscarDespesas(String numeroProtocolo, String tipoDespesa, LocalDate dataProtocolo) {
        return despesaRepository.buscarDespesas(numeroProtocolo, tipoDespesa, dataProtocolo);
    }

    public Despesa update(Long id, Despesa novaDespesa) {
    Despesa despesaExistente = despesaRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Despesa não encontrada"));

    despesaExistente.setNumeroProtocolo(novaDespesa.getNumeroProtocolo());
    despesaExistente.setTipoDespesa(novaDespesa.getTipoDespesa());
    despesaExistente.setDataProtocolo(novaDespesa.getDataProtocolo());
    despesaExistente.setDataVencimento(novaDespesa.getDataVencimento());
    despesaExistente.setCredor(novaDespesa.getCredor());
    despesaExistente.setDescricao(novaDespesa.getDescricao());
    despesaExistente.setValor(novaDespesa.getValor());
    despesaExistente.setStatus(novaDespesa.getStatus());

    despesaExistente.getEmpenhos().clear();
    if (novaDespesa.getEmpenhos() != null) {
        novaDespesa.getEmpenhos().forEach(emp -> {
            emp.setDespesa(despesaExistente); 
            despesaExistente.getEmpenhos().add(emp);
        });
    }

    return despesaRepository.save(despesaExistente);
}


}
