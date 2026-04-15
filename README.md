
# 🖥️ Dashboard de Hardware AI

O **Dashboard de Hardware AI** é uma ferramenta interativa em React que permite simular, comparar e analisar o poder de processamento (TFLOPS) e o custo-benefício de diferentes configurações de hardware (GPUs da NVIDIA/AMD, CPUs e Apple Silicon) focadas em Inteligência Artificial.

Os dados-base são obtidos dinamicamente diretamente do repositório oficial do [huggingface.js](https://www.google.com/search?q=https://github.com/huggingface/huggingface.js/tree/main/packages/tasks/src "null"), garantindo métricas reais e atualizadas utilizadas pelo ecossistema Hugging Face.

## ✨ Funcionalidades

-   **Poder de Processamento Combinado:** Simule clusters inteiros somando os TFLOPS de múltiplos hardwares e veja sua classificação em uma escala visual de "GPU poor" a "GPU rich".
    
-   **Dados Dinâmicos e Offline:** Extrai dados diretamente do GitHub do Hugging Face. Conta com um fallback de cache no `localStorage` para funcionar mesmo offline.
    
-   **Comparativos Gráficos:** Gráficos de barras que organizam visualmente:
    
    -   Maior poder de processamento bruto (TFLOPS).
        
    -   Eficiência de Investimento (Quantos TFLOPS você obtém por cada R$ 1 investido).
        
    -   Custo por TFLOP (Quanto custa cada unidade de poder de processamento).
        
-   **Hardware Customizado:** Não encontrou a placa de vídeo recém-lançada? Adicione seu próprio hardware com TFLOPS e VRAM personalizados (salvo localmente no navegador).
    
-   **Edição Rápida (Inline):** Modifique quantidades, valores e seleções de VRAM diretamente na tabela, sem precisar remover e adicionar os itens novamente.
    
-   **Modo Claro / Escuro:** Interface responsiva que se adapta à sua preferência visual com alternância de temas.
    

## 🚀 Como executar o projeto localmente

Este projeto foi construído como um componente único em React (`App.jsx`) utilizando o **Tailwind CSS** para estilização.

### Pré-requisitos

-   [Node.js](https://nodejs.org/ "null") instalado.
    

### Passo a passo

1.  **Clone o repositório:**
    
    ```
    git clone [https://github.com/douglaswp/tflops-calculator.git](https://github.com/douglaswp/tflops-calculator.git)
    cd tflops-calculator
    
    ```
    
2.  **Crie um projeto base com Vite (caso ainda não exista):**
    
    ```
    npm create vite@latest . -- --template react
    
    ```
    
3.  **Instale as dependências:**
    
    ```
    npm install
    
    ```
    
4.  **Instale o Tailwind CSS:**
    
    ```
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    
    ```
    
    _Certifique-se de configurar seu `tailwind.config.js` e importar as diretivas do Tailwind no seu `index.css`._
    
5.  **Substitua o arquivo `src/App.jsx`** pelo código fonte fornecido no repositório.
    
6.  **Inicie o servidor de desenvolvimento:**
    
    ```
    npm run dev
    
    ```
    
    Acesse a URL gerada (geralmente `http://localhost:5173`) no seu navegador.
    


## 🐳 Rodando com Docker

Se você preferir não instalar o Node.js na sua máquina, pode rodar o projeto inteiro utilizando o **Docker** e o **Docker Compose**. O projeto já está configurado com um _multi-stage build_ utilizando o Nginx, sendo perfeito também para deploy em produção.

### Pré-requisitos

-   [Docker](https://www.docker.com/get-started "null") instalado.
    
-   Docker Compose instalado (geralmente já vem com o Docker Desktop).
    

### Passo a passo

1.  **Faça o clone do repositório:**
    
    ```
    git clone [https://github.com/douglaswp/hardware-ai.git](https://github.com/douglaswp/hardware-ai.git)
    cd hardware-ai
    
    ```
    
2.  **Inicie o container em segundo plano (detached mode):**
    
    ```
    docker compose up -d --build
    
    ```
    
3.  **Acesse a aplicação:** Abra o seu navegador e acesse: [http://localhost:8080](https://www.google.com/search?q=http://localhost:8080 "null")
    

### Comandos úteis (Docker)

-   Para **parar** a aplicação:
    
    ```
    docker compose down
    
    ```
    
-   Para **ver os logs** (erros ou acessos no servidor):
    
    ```
    docker compose logs -f
    
    ```

## 📊 Origem dos Dados

Este projeto realiza o parse (via Regex) dos arquivos TypeScript disponíveis abertamente no Hugging Face:

-   [hardware-nvidia.ts](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/hardware-nvidia.ts "null")
    
-   [hardware-amd.ts](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/hardware-amd.ts "null")
    
-   [hardware.ts](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/hardware.ts "null")
    

## 🛠️ Tecnologias

-   **React** (Hooks: `useState`, `useEffect`, `useMemo`, `useRef`)
    
-   **Tailwind CSS** (Estilização UI/UX)
    
-   **JavaScript Vanilla (Fetch API)**
    
-   **LocalStorage** (Cache e persistência de dados customizados)
    

Feito com 💡 e React. Sinta-se à vontade para abrir _Issues_ e contribuir com _Pull Requests_!