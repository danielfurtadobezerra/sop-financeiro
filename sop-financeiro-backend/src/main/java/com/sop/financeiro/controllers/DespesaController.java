package com.sop.financeiro.controllers;

import com.sop.financeiro.model.Despesa;
import com.sop.financeiro.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/despesas")
public class DespesaController {

    @Autowired
    private DespesaService despesaService;

    @GetMapping("/listar")
    public List<Despesa> listarDespesas(
        @RequestParam(required = false) String numeroProtocolo,
        @RequestParam(required = false) String tipoDespesa,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataProtocolo
    ) {
        return despesaService.buscarDespesas(numeroProtocolo, tipoDespesa, dataProtocolo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Despesa> getById(@PathVariable Long id) {
        Optional<Despesa> obj = despesaService.findById(id);
        return obj.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "application/json")
    public Despesa create(@RequestBody Despesa obj) {
        return despesaService.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Despesa> atualizar(@PathVariable Long id, @RequestBody Despesa novaDespesa) {
        Despesa atualizada = despesaService.update(id, novaDespesa);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Despesa> existing = despesaService.findById(id);
        if (existing.isPresent()) {
            despesaService.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
