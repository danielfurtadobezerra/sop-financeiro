CREATE TABLE despesa (
    id SERIAL PRIMARY KEY,
    numero_protocolo VARCHAR(20) UNIQUE NOT NULL,
    tipo_despesa VARCHAR(50) NOT NULL,
    data_protocolo TIMESTAMP NOT NULL,
    data_vencimento DATE NOT NULL,
    credor VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(14, 2) NOT NULL,
    status VARCHAR(30)
);

-- Tabela de Empenhos
CREATE TABLE empenho (
    id SERIAL PRIMARY KEY,
    numero_empenho VARCHAR(20) UNIQUE NOT NULL,
    data_empenho DATE NOT NULL,
    valor DECIMAL(14, 2) NOT NULL,
    observacao TEXT,
    despesa_id INTEGER NOT NULL REFERENCES despesa(id) ON DELETE RESTRICT
);

-- Tabela de Pagamentos
CREATE TABLE pagamento (
    id SERIAL PRIMARY KEY,
    numero_pagamento VARCHAR(20) UNIQUE NOT NULL,
    data_pagamento DATE NOT NULL,
    valor DECIMAL(14, 2) NOT NULL,
    observacao TEXT,
    empenho_id INTEGER NOT NULL REFERENCES empenho(id) ON DELETE RESTRICT
);


INSERT INTO despesa (numero_protocolo, tipo_despesa, data_protocolo, data_vencimento, credor, descricao, valor, status)
VALUES 
('PRT-001', 'Serviço', '2025-07-01 10:00:00', '2025-07-30', 'Empresa Alpha Ltda', 'Manutenção de equipamentos', 15000.00, 'PENDENTE'),
('PRT-002', 'Material', '2025-07-05 09:30:00', '2025-08-05', 'Fornecedor Beta SA', 'Compra de materiais de escritório', 3200.50, 'EM PROCESSO'),
('PRT-003', 'Serviço', '2025-07-10 14:00:00', '2025-08-10', 'Construtora Gamma', 'Serviços de reforma predial', 45000.00, 'PAGO');

-- ===============================
-- INSERINDO DADOS NA TABELA EMPENHO
-- ===============================
INSERT INTO empenho (numero_empenho, data_empenho, valor, observacao, despesa_id)
VALUES
('EMP-001', '2025-07-03', 15000.00, 'Empenho total referente à manutenção', 1),
('EMP-002', '2025-07-07', 3200.50, 'Empenho de compra de materiais', 2),
('EMP-003', '2025-07-15', 20000.00, 'Empenho parcial da reforma predial', 3);  

-- ===============================
-- INSERINDO DADOS NA TABELA PAGAMENTO
-- ===============================
INSERT INTO pagamento (numero_pagamento, data_pagamento, valor, observacao, empenho_id)
VALUES
('PGT-001', '2025-07-20', 15000.00, 'Pagamento total manutenção', 1),
('PGT-002', '2025-07-25', 3200.50, 'Pagamento único materiais de escritório', 2),
('PGT-003', '2025-07-28', 10000.00, 'Primeira parcela pagamento reforma', 3);
