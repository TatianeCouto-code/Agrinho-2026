document.addEventListener('DOMContentLoaded', () => {
    // Configurações de Acessibilidade: Contraste
    const btnContraste = document.getElementById('btn-alto-contraste');
    
    btnContraste.addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
        
        // Atualiza estado do aria-pressed para leitores de tela
        const estaAtivo = document.body.classList.contains('alto-contraste');
        btnContraste.setAttribute('aria-pressed', estaAtivo);
    });

    // Configurações de Acessibilidade: Tamanho de Fonte
    const btnAumentar = document.getElementById('btn-fonte-aumentar');
    const btnDiminuir = document.getElementById('btn-fonte-diminuir');
    let tamanhoAtualBase = 100; // Percentual padrão

    btnAumentar.addEventListener('click', () => {
        if (tamanhoAtualBase < 140) { // Limite máximo seguro
            tamanhoAtualBase += 10;
            document.documentElement.style.fontSize = `${tamanhoAtualBase}%`;
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if (tamanhoAtualBase > 80) { // Limite mínimo seguro
            tamanhoAtualBase -= 10;
            document.documentElement.style.fontSize = `${tamanhoAtualBase}%`;
        }
    });
});
