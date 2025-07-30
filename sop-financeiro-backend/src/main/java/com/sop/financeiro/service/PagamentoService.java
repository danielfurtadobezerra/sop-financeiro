
package com.sop.financeiro.service;

import com.sop.financeiro.model.Pagamento;
import com.sop.financeiro.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoService {
    @Autowired
    private PagamentoRepository pagamentoRepository;

    public List<Pagamento> findAll() {
        return pagamentoRepository.findAll();
    }

    public Optional<Pagamento> findById(Long id) {
        return pagamentoRepository.findById(id);
    }

    public Pagamento save(Pagamento obj) {
        return pagamentoRepository.save(obj);
    }

    public void delete(Long id) {
        pagamentoRepository.deleteById(id);
    }
}
