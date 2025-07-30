
package com.sop.financeiro.service;

import com.sop.financeiro.model.Empenho;
import com.sop.financeiro.repository.EmpenhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpenhoService {
    @Autowired
    private EmpenhoRepository empenhoRepository;

    public List<Empenho> findAll() {
        return empenhoRepository.findAll();
    }

    public Optional<Empenho> findById(Long id) {
        return empenhoRepository.findById(id);
    }

    public Empenho save(Empenho obj) {
        return empenhoRepository.save(obj);
    }

    public void delete(Long id) {
        empenhoRepository.deleteById(id);
    }
}
