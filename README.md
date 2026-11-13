# TOP III Refrigeração e Equipamentos — Loja virtual

Landing page / vitrine B2B-B2C com a identidade visual da TOP III (Deep Crimson Red, Dark Steel-Grey, Cool Ice-Blue).

Site estático: abra `index.html` no navegador ou publique a pasta em qualquer hospedagem (Vercel, Netlify, GitHub Pages, Hostinger…).

## Seções
Barra superior · Cabeçalho com menu (Início, Vitrine de Produtos, Assistência Técnica, Orçamentos, Contato) · Hero com CTA de orçamento · Faixa de benefícios · Categorias · Vitrine com filtros e especificações técnicas · Faixa CTA · Assistência técnica · Números · Depoimentos · Formulário de orçamento (envia pelo WhatsApp) · FAQ · Rodapé com contato, pagamentos e selos · Botão flutuante do WhatsApp.

A lista "Meu orçamento" guarda os produtos escolhidos e envia tudo de uma vez pelo WhatsApp.

## Personalizar
- **WhatsApp:** `CONFIG.whatsapp` no início de `assets/js/main.js` (formato `55DDDNUMERO`).
- **Produtos:** array `PRODUCTS` em `assets/js/main.js` (nome, categoria, especificações, selo).
- **Telefone, e-mail, endereço, CNPJ, redes sociais:** em `index.html`.
- **Cores:** variáveis no topo de `assets/css/style.css`.
- As imagens dos produtos são ilustrações em SVG; troque por fotos reais quando disponíveis.
