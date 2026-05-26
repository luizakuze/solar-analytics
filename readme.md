# Solar Analytics

Sistema simples para cadastro, armazenamento e visualização de métricas de geração de energia solar.

## Tecnologias utilizadas

- Python/Flask
- MariaDB
- React/TypeScript

## Funcionalidades

- Dashboard com métricas de energia solar
- Cadastro de novas métricas
- Listagem de registros salvos no banco
- Gráficos de acompanhamento dos dados
- Integração entre frontend React e API Flask
- Banco de dados populado com dados iniciais via arquivo SQL
- Exibição de potência gerada, temperatura do painel, irradiação solar, eficiência estimada e data/hora da medição

## Estrutura do projeto

```bash
solar-analytics/
├── assets/
│   ├── app.png
│   └── solar_analytics.sql
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
├── .gitignore
├── LICENSE
└── readme.md
```

## Banco de dados

O projeto usa MariaDB e possui o script `assets/solar_analytics.sql`, responsável por criar a tabela `metrics` e inserir dados iniciais.

A variável de conexão usada no `.env` do backend é:

```env
DATABASE_URL=mysql+pymysql://solar_user:solar_password@localhost/solar_analytics
```

Para criar o banco e o usuário, acesse o MariaDB:

```bash
sudo mysql -u root -p
```

Execute:

```sql
CREATE DATABASE solar_analytics;

CREATE USER 'solar_user'@'localhost' IDENTIFIED BY 'solar_password';

GRANT ALL PRIVILEGES ON solar_analytics.* TO 'solar_user'@'localhost';

FLUSH PRIVILEGES;

EXIT;
```

Depois, na raiz do projeto, importe o arquivo SQL:

```bash
mysql -u solar_user -p solar_analytics < assets/solar_analytics.sql
```

Senha:

```bash
solar_password
```

Para conferir se os dados foram inseridos:

```bash
mysql -u solar_user -p solar_analytics
```

```sql
SELECT * FROM metrics;
```

## Backend

Entre na pasta do backend:

```bash
cd backend
```

Crie e ative o ambiente virtual:

```bash
python -m venv .venv
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Crie o arquivo `.env` dentro da pasta `backend`:

```env
DATABASE_URL=mysql+pymysql://solar_user:solar_password@localhost/solar_analytics
```

Execute o backend:

```bash
python app.py
```

A API ficará disponível em:

```bash
http://localhost:5000
```

## Frontend

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` dentro da pasta `frontend`:

```env
VITE_API_URL=http://localhost:5000
```

Execute o frontend:

```bash
npm run dev
```

A aplicação ficará disponível em:

```bash
http://localhost:5173
```

## Endpoints da API

Listar métricas:

```http
GET /metrics
```

Criar métrica:

```http
POST /metrics
```

Exemplo de corpo da requisição:

```json
{
  "power_kw": 4.5,
  "panel_temperature": 42.8,
  "solar_irradiation": 890,
  "estimated_efficiency": 0.005056
}
```

## Observações

- O arquivo `assets/solar_analytics.sql` deve ser importado antes de executar a aplicação.
- O backend precisa estar rodando para o frontend carregar os dados.
- Arquivos `.env` não devem ser enviados para o GitHub.