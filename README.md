# TOP III Refrigeração e Equipamentos — Loja virtual

Landing page / vitrine B2B-B2C com a identidade visual da TOP III (Deep Crimson Red, Dark Steel-Grey, Cool Ice-Blue).

Site estático: abra `index.html` no navegador ou publique a pasta em qualquer hospedagem (Vercel, Netlify, GitHub Pages, Hostinger…).

## Seções
Barra superior · Cabeçalho com menu (Início, Vitrine de Produtos, Assistência Técnica, Obras, Orçamentos, Contato) · Hero com selo de 25 anos · Faixa de benefícios · Categorias · Vitrine dividida em seções (Freezers, Expositores, Geladeiras e Balcões, Câmaras Frias, Prateleiras e Gôndolas, Cestinhas e Carrinhos, Checkouts, Peças) com barra de navegação fixa · Faixa CTA · Assistência técnica · 25 anos + números · Obras em andamento · Formulário de orçamento (envia pelo WhatsApp) · FAQ · Rodapé com contato, pagamentos e selos · Botão flutuante do WhatsApp.

Aparência de aplicativo: no celular há uma barra de abas fixa (Início, Produtos, Orçamento, Obras, WhatsApp), busca de produtos, carrosséis por seção e detalhes do produto em painel deslizante. O site pode ser adicionado à tela inicial do celular (manifest.webmanifest).

A lista "Meu orçamento" guarda os produtos escolhidos e envia tudo de uma vez pelo WhatsApp. A empresa não faz entregas: todos os textos indicam retirada na fábrica.

## Personalizar
- **WhatsApp:** `CONFIG.whatsapp` no início de `assets/js/main.js` (formato `55DDDNUMERO`).
- **Seções e produtos:** arrays `CATS` (seções da vitrine) e `PRODUCTS` em `assets/js/main.js`. Para criar uma seção nova, adicione uma entrada em `CATS` e produtos com o mesmo `cat`.
- **Obras em andamento:** cartões na seção `#obras` do `index.html` — altere nome, cidade, escopo, `--p:75%` (barra de progresso) e previsão de entrega.
- **Telefone, e-mail, endereço, CNPJ, redes sociais:** em `index.html`.
- **Cores:** variáveis no topo de `assets/css/style.css`.
- As imagens dos produtos são ilustrações em SVG; troque por fotos reais quando disponíveis.
