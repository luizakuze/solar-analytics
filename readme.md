# Solar Analytics

Sistema simples para cadastro, armazenamento e visualização de métricas de geração de energia solar.

![Dashboard do Solar Analytics](assets/app.png)

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

## Execução do ambiente

### Banco de dados

O projeto usa MariaDB e possui o script:

```bash
assets/solar_analytics.sql
```

Esse arquivo cria a tabela `metrics` e insere dados iniciais.

Acesse o MariaDB:

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

Depois, na raiz do projeto:

```bash
mysql -u solar_user -p solar_analytics < assets/solar_analytics.sql
```

Senha:

```bash
solar_password
```

Para verificar os dados:

```bash
mysql -u solar_user -p solar_analytics
```

```sql
SELECT * FROM metrics;
```

### Backend

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

Crie o arquivo `.env`:

```env
DATABASE_URL=mysql+pymysql://solar_user:solar_password@localhost/solar_analytics
```

Execute o backend:

```bash
python app.py
```

API disponível em:

```bash
http://localhost:5000
```

### Frontend

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Execute o frontend:

```bash
npm run dev
```

Aplicação disponível em:

```bash
http://localhost:5173
```