
### `script.js`
```javascript
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SISTEMA DE COMPONENTES EXPANSÍVEIS (ACCORDION)
    // ==========================================
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute("aria-expanded") === "true";

            // Fecha apenas as outras abas abertas para visualização limpa
            document.querySelectorAll(".accordion-header").forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute("aria-expanded", "false");
                    otherHeader.nextElementSibling.hidden = true;
                    otherHeader.querySelector(".icon").textContent = "+";
                }
            });

            // Alterna o estado atual
            header.setAttribute("aria-expanded", !isExpanded);
            content.hidden = isExpanded;
            header.querySelector(".icon").textContent = isExpanded ? "+" : "−";
        });
    });

    // ==========================================
    // 2. ACESSIBILIDADE: CONTROLE DE FONTE E TEMA
    // ==========================================
    let tamanhoFonteAtual = 100;
    const btnAumentar = document.getElementById("btn-aumentar");
    const btnDiminuir = document.getElementById("btn-diminuir");
    const btnTema = document.getElementById("btn-tema");

    btnAumentar.addEventListener("click", () => {
        if (tamanhoFonteAtual < 130) {
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (tamanhoFonteAtual > 80) {
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });

    btnTema.addEventListener("click", () => {
        const temaAtual = document.documentElement.getAttribute("data-theme");
        if (temaAtual === "dark") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    });

    // ==========================================
    // 3. ACESSIBILIDADE: LEITURA POR VOZ (SpeechSynthesis)
    // ==========================================
    const btnFalar = document.getElementById("btn-falar");
    const btnParar = document.getElementById("btn-parar");
    let engrenagemVoz = window.speechSynthesis;
    let leituraAtual = null;

    btnFalar.addEventListener("click", () => {
        // Evita sobreposição de vozes
        if (engrenagemVoz.speaking) {
            engrenagemVoz.cancel();
        }

        // Seleciona exclusivamente o escopo do conteúdo principal