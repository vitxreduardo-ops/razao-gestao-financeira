# Razão — Controle Financeiro com Google Sheets + Netlify

Sistema simples, sem custo, sem service account. A planilha é o banco de dados de verdade.

## Passo 1 — Criar a planilha
1. Crie uma planilha nova no Google Sheets.
2. Renomeie a primeira aba para exatamente: `Lancamentos`
3. Na linha 1, crie as colunas (nessa ordem):
   `Data | Descricao | Categoria | Tipo | Valor`

## Passo 2 — Instalar o backend (Apps Script)
1. Na planilha: menu **Extensões > Apps Script**.
2. Apague o conteúdo do editor e cole o conteúdo do arquivo `Code.gs`.
3. Clique em **Implantar > Nova implantação**.
4. Tipo: **App da Web**.
5. Executar como: **Eu**.
6. Quem pode acessar: **Qualquer pessoa**.
7. Clique em Implantar, autorize as permissões (é normal o Google avisar que o app não é verificado — é seu próprio script, pode confiar).
8. Copie a URL gerada, que termina em `/exec`. Essa é a sua API.

⚠️ Sempre que editar o `Code.gs`, você precisa ir em **Gerenciar implantações > editar (ícone de lápis) > Nova versão** para as mudanças valerem.

## Passo 3 — Conectar o site à API
1. Abra `index.html`.
2. Encontre a linha:
   ```js
   const API_URL = "SUA_URL_AQUI";
   ```
3. Cole sua URL do Apps Script no lugar de `SUA_URL_AQUI`.

## Passo 4 — Deploy no Netlify
Opção mais simples (arrastar e soltar):
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta com o `index.html` (só ele é necessário).
3. Pronto — o Netlify já te dá uma URL pública.

Opção via GitHub (recomendada se quiser continuar editando):
1. Suba esta pasta num repositório no GitHub.
2. No Netlify: **Add new site > Import an existing project**.
3. Não precisa configurar build command nem publish directory — é um site estático puro, um único arquivo.

## Como funciona no dia a dia
- Adicionar um lançamento no site grava uma nova linha na planilha automaticamente.
- Você também pode editar a planilha diretamente a qualquer momento — o site sempre lê os dados atualizados.
- Excluir pelo site remove a linha correspondente na planilha.

## Limitações que vale saber
- O Apps Script tem um limite generoso, mas não infinito, de requisições por dia (bem acima do uso pessoal normal).
- Não há autenticação de usuário: quem tiver o link do site consegue lançar/excluir dados. Para uso pessoal isso normalmente não é problema, mas evite compartilhar a URL publicamente.
- Se quiser evoluir depois (gráficos, categorias fixas, múltiplos usuários com login), dá pra construir em cima dessa mesma base sem precisar recomeçar do zero.
