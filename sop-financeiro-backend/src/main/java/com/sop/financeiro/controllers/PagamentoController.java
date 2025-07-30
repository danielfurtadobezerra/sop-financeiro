package com.sop.financeiro.controllers;

import com.sop.financeiro.model.Pagamento;
import com.sop.financeiro.service.PagamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pagamentos")
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @GetMapping
    public List<Pagamento> getAll() {
        return pagamentoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> getById(@PathVariable Long id) {
        Optional<Pagamento> obj = pagamentoService.findById(id);
        return obj.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pagamento create(@RequestBody Pagamento obj) {
        return pagamentoService.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pagamento> update(@PathVariable Long id, @RequestBody Pagamento updated) {
        Optional<Pagamento> existing = pagamentoService.findById(id);
        if (existing.isPresent()) {
            updated.setId(id);
            return ResponseEntity.ok(pagamentoService.save(updated));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Pagamento> existing = pagamentoService.findById(id);
        if (existing.isPresent()) {
            pagamentoService.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
