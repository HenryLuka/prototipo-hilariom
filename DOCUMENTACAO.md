# Documentação Técnica e Funcional - Protótipo Hilariom

## 1. Visão Geral do Produto (Executive Summary)
O **Protótipo Hilariom** é uma aplicação focada no segmento de construção civil, especificamente servindo como um catálogo digital interativo para obras e estruturas pré-fabricadas de concreto (como galpões logísticos, edifícios comerciais e plantas industriais). 

O projeto foi idealizado sob a perspectiva *Mobile-First*, garantindo que a experiência do usuário (UX) em dispositivos móveis (frequentemente usados por representantes de vendas, engenheiros em campo e clientes B2B) seja comparável à de um aplicativo nativo. 

## 2. Decisões de Design (UI/UX)
- **Design de Aplicativo (App-Like Experience):** A aplicação foi construída primeiramente com foco na experiência e responsividade para dispositivos móveis, adotando comportamentos e métricas de navegação de um app nativo (como remoção da barra de rolagem e toques responsivos). No entanto, o layout é totalmente responsivo e se adapta fluidamente para ocupar 100% do espaço de tela em monitores Desktop, garantindo uma excelente legibilidade em telas grandes.
- **Identidade Visual (Branding):** Utiliza uma paleta de cores neutras (Brancos e Cinzas) para os fundos (`--surface-color: #F7F7F6;`), deixando o destaque visual, hierarquia e os "Call-To-Actions" (CTAs) em amarelo corporativo (`#FBF38E`). A tipografia baseada na família `Inter` fornece um aspecto moderno, limpo e de leitura agradável.
- **Navegação Ergonômica:** Implementação de uma *Bottom Navigation Bar* (Barra de navegação inferior) fixada na tela para mobile, seguindo princípios de usabilidade (Fitts's Law) para que as áreas de interação fiquem próximas do polegar do usuário. Além disso, há um *Floating Action Button* (FAB) para ações rápidas.
- **Carrosséis Nativos (Scroll-Snap):** As galerias de imagens, seções de mercados, obras e o processo de fabricação utilizam a API nativa `scroll-snap-type: x mandatory` do CSS. Isso fornece uma rolagem horizontal perfeitamente ancorada, sem a necessidade de bibliotecas pesadas de JavaScript, sendo idêntica ao comportamento de *swipes* vistos no iOS e Android.

## 3. Arquitetura Técnica e Stack Frontend
O ecossistema foi desenvolvido visando performance de carregamento, permitindo que a aplicação funcione de forma instantânea mesmo em locais remotos (típicos de canteiros de obras) com conexões 3G.

### 3.1. Tecnologias Base
- **[Astro](https://astro.build/):** O framework escolhido baseia-se na entrega de HTML estático ultra-rápido (*Zero-JS by default*), eliminando gargalos de renderização (*Hydration*) no celular do cliente e permitindo um *Time to Interactive* quase nulo.
- **Vite-PWA:** O plugin injeta as capacidades de **Progressive Web App (PWA)**, registrando Service Workers. O aplicativo fornece um arquivo `manifest.webmanifest`, permitindo a instalação do ícone na tela inicial dos smartphones. Quando instalado, ele remove a barra de navegação do browser nativo, proporcionando experiência *Standalone* em tela cheia.
- **Vanilla CSS Global:** A fim de evitar *bloatwares*, todo o sistema de design (Tokens de design como `--primary-color`, `box-shadow`, etc.) foi centralizado no `global.css`. O layout foi modelado do zero, permitindo total controle sobre micro-interações (`.hover-scale`) e skeleton loadings.

### 3.2. Estratégias de Cache (Workbox)
Um dos diferenciais da plataforma é o cacheamento configurado nativamente. O padrão **CacheFirst** foi aplicado para as rotas e domínios de imagens externas (Unsplash e os servidores do Galleon). Isso significa que as fotos pesadas das obras só são baixadas na primeira visita. Depois, ficam armazenadas localmente no celular do usuário por **30 dias**, o que preserva os dados móveis de quem apresenta o portfólio repetidas vezes.

### 3.3. Optimização de Deploy
Uma integração via `astro-compress` foi inserida para minificar automaticamente HTML, CSS, JavaScript e SVGs durante o *build*, limpando quebras de linha e dados desnecessários para reduzir os *bytes* trafegados.

## 4. Estrutura de Dados e Conteúdo (Mocks)
Para simular um banco de dados real, a aplicação consome arrays mapeados no diretório `src/data/`:
- **`obras.js`:** Contém o escopo de engenharias avançadas (Galpões, Fábricas, Sedes Comerciais e Armazéns). Cada objeto registra métricas vitais como *Área Total (m²)*, *Volume de concreto (m³)*, *Prazo de execução*, além das peças pré-fabricadas atreladas ao projeto e arrays dinâmicos de galerias.
- **`produtos.js`:** Um catálogo das estruturas fabricadas na usina (ex: Fundações, Pilares, Vigas Protendidas, Lajes Alveolares, Painéis de fechamento), que são dinamicamente exibidas de acordo com suas propriedades e descrições técnicas.

## 5. Fluxo de Navegação e Estrutura de Arquivos
```text
📦 Protótipo Hilariom
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 BottomNav.astro (Barra principal de atalhos e navegação móvel)
 ┃ ┃ ┣ 📜 PageHeader.astro (Cabeçalho dinâmico com botão de "voltar")
 ┃ ┃ ┣ 📜 CtaOrcamento.astro (Banner persistente de indução a conversão)
 ┃ ┃ ┣ 📜 Fab.astro (Botão flutuante de WhatsApp/Contato)
 ┃ ┃ ┗ 📜 Sidebar.astro (Menu lateral para expansões futuras)
 ┃ ┣ 📂 data
 ┃ ┃ ┣ 📜 obras.js (Banco local de *Cases de Sucesso*)
 ┃ ┃ ┗ 📜 produtos.js (Catálogo técnico da fábrica)
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 index.astro (Dashboard Home: Vitrines e fluxos de processos)
 ┃ ┃ ┣ 📂 obras/ e 📜 obras.astro (Listagem geral e [id].astro com dinâmicas da obra)
 ┃ ┃ ┣ 📂 produtos/ e 📜 produtos.astro (Portfólio técnico e roteamento de peças)
 ┃ ┃ ┗ 📜 *Páginas complementares:* sobre, atuacao, parcerias, carreiras, contato
 ┃ ┗ 📂 styles
 ┃   ┗ 📜 global.css (Raiz de variáveis CSS, animações e media queries)
 ┣ 📜 astro.config.mjs (Regras gerais de infra, PWA, Caching e Minificação)
 ┗ 📜 package.json (Dependências do repositório NPM)
```

## 6. Instruções de Execução (Modo de Desenvolvimento)
Para que a equipe de engenharia/frontend acesse e edite o repositório localmente:

1. Clone o repositório e instale as dependências via NPM:
   ```bash
   npm install
   ```
2. Inicialize o servidor local no modo de visualização em tempo real (Hot-Reload):
   ```bash
   npm run dev
   ```
   > *(Nota de Arquitetura: As opções do PWA/Workbox estão programaticamente desativadas sob a flag "devOptions: { enabled: false }" no `astro.config.mjs` para impedir conflitos de Service Workers e garantir que as alterações no CSS atualizem na hora durante o desenvolvimento).*

3. O terminal liberará uma URL (ex: `http://localhost:4321`). Utilize as dev-tools do Google Chrome apertando `F12` e clicando em "Toggle Device Toolbar" para avaliar o layout Mobile-First.

## 7. Publicação, Build e Deploy (Produção)
Para gerar a versão estabilizada e transpilada da aplicação:
```bash
npm run build
```
O comando criará e compilará toda a aplicação dentro de um diretório `/dist`. Este pacote estará 100% otimizado e pronto para ser enviado para plataformas de Cloud estática sem servidor (como Netlify, Vercel ou Amazon S3 / CloudFront).
