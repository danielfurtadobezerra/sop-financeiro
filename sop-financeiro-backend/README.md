# 💰 Sistema de Controle Financeiro - SOP

Este projeto tem como objetivo o gerenciamento de **Despesas**, **Empenhos** e **Pagamentos** da SOP (Superintendência de Obras Públicas), oferecendo uma interface moderna e API robusta para registro e controle financeiro.

## 🧱 Tecnologias Utilizadas

### Backend:
- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- CORS Configurado para `http://localhost:3000`

### Frontend:
- Next.js (React)
- Redux Toolkit
- Tailwind CSS
- TypeScript

---

## 📦 Estrutura do Projeto

sop-controle-financeiro/
│
├── backend/
│ ├── src/main/java/
│ │ └── com/sop/financeiro/
│ │ ├── controller/
│ │ ├── service/
│ │ ├── repository/
│ │ └── model/
│ └── application.properties
│
├── frontend/
│ ├── app/
│ │ ├── despesas/
│ │ ├── empenhos/
│ │ ├── pagamentos/
│ │ └── layout.tsx
│ ├── services/
│ ├── store/
│ └── tailwind.config.ts

yaml
Copiar
Editar

---

## ⚙️ Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seuusuario/sop-controle-financeiro.git
cd sop-controle-financeiro
```

2. Rodar o Backend
### Pré-requisitos:
Java 17+

PostgreSQL

Configurar Banco de Dados:
Crie um banco de dados chamado sop_financeiro no PostgreSQL:

```bash
CREATE DATABASE sop_financeiro;
```
Configure seu application.properties:

properties
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/sop_financeiro
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

CORS
cors.allowed-origins=http://localhost:3000
```
Rodar a API:
No diretório /backend, execute:

```bash
./mvnw spring-boot:run
```
A API estará disponível em: http://localhost:8080

