### `script.js`
```javascript
document.addEventListener("DOMContentLoaded", () => {
    
    // SISTEMA ACCORDION (EXPANSÍVEIS)
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const isCurrentlyActive = item.classList.contains("active");

            // Fecha todos antes de abrir o atual (comportamento clássico)
            document.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("active"));
            document.querySelectorAll(".accordion-header").forEach(h => h.setAttribute("aria-expanded", "false"));

            if (!isCurrentlyActive) {
                item.classList.add("active");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });

    // MENU DE ACESSIBILIDADE - FONTES E TEMA
    let baseFontSize = 100; // Representa 100% ou 1rem
    const body = document.body;

    document.getElementById("btn-aumentar").addEventListener("click", () => {
        if (baseFontSize < 130) {
            baseFontSize += 5;
            document.documentElement.style.fontSize = `${baseFontSize}%`;
        }
    });

    document.getElementById("btn-diminuir").addEventListener("click", () => {
        if (baseFontSize > 85) {
            baseFontSize -= 5;
            document.documentElement.style.fontSize = `${baseFontSize}%`;
        }
    });

    document.getElementById("btn-tema").addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    });

    // ACESSIBILIDADE - SPEECHSYNTHESIS (LEITURA POR VOZ)
    const synth = window.speechSynthesis;
    let utterance = null;

    document.getElementById("btn-ouvir").addEventListener("click", () => {
        // Cancela qualquer leitura em andamento
        synth.cancel();

        // Seleciona exclusivamente o conteúdo principal de texto
        const mainContent = document.getElementById("conteudo-principal");
        
        // Clona o conteúdo para limpar elementos dinâmicos/interativos indesejados na leitura
        const clone = mainContent.cloneNode(true);
        const accordionsFechados = clone.querySelectorAll(".accordion-body");
        
        // Remove caixas de imagem ou áreas ocultas para focar estritamente no texto principal estruturado
        clone.querySelectorAll(".imagem, form, .comment-list, label").forEach(el => el.remove());

        const textToRead = clone.innerText;

        if (textToRead.trim().length > 0) {
            utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = "pt-BR";
            utterance.rate = 1.0; // Velocidade padrão estável
            synth.speak(utterance);
        }
    });

    document.getElementById("btn-parar").addEventListener("click", () => {
        synth.cancel();
    });

    // FORMULÁRIO DE INSCRIÇÃO NO SEMINÁRIO
    const seminarForm = document.getElementById("seminar-form");
    seminarForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;

        // Feedback moderno para inscrição simulada
        alert(`Parabéns, ${nome}! Sua vaga para o seminário online foi reservada. Enviamos as credenciais de acesso para ${email}.`);
        seminarForm.reset();
    });

    // ÁREA INTERATIVA DE COMENTÁRIOS
    const commentForm = document.getElementById("comment-form");
    const commentList = document.getElementById("comment-list");

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const txtComentario = document.getElementById("txt-comentario").value;

        if (txtComentario.trim() !== "") {
            const commentItem = document.createElement("div");
            commentItem.className = "comment-item";
            
            // Sanitização simples para evitar brechas em produção
            commentItem.innerText = txtComentario;
            
            // Adiciona de forma invertida para o mais novo aparecer no topo
            commentList.insertBefore(commentItem, commentList.firstChild);
            
            document.getElementById("txt-comentario").value = "";
            alert("Obrigado pela sua contribuição! Seu comentário foi postado com sucesso.");
        }
    });
});

