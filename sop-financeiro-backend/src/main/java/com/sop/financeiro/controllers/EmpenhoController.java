package com.sop.financeiro.controllers;

import com.sop.financeiro.model.Empenho;
import com.sop.financeiro.service.EmpenhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/empenhos")
public class EmpenhoController {

    @Autowired
    private EmpenhoService empenhoService;

    @GetMapping
    public List<Empenho> getAll() {
        return empenhoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empenho> getById(@PathVariable Long id) {
        Optional<Empenho> obj = empenhoService.findById(id);
        return obj.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Empenho create(@RequestBody Empenho obj) {
        return empenhoService.save(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empenho> update(@PathVariable Long id, @RequestBody Empenho updated) {
        Optional<Empenho> existing = empenhoService.findById(id);
        if (existing.isPresent()) {
            updated.setId(id);
            return ResponseEntity.ok(empenhoService.save(updated));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Empenho> existing = empenhoService.findById(id);
        if (existing.isPresent()) {
            empenhoService.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
