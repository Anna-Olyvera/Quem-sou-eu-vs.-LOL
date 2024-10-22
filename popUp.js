document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const regrasButton = document.querySelector('.botaoPopUp');

    // Função para fechar o pop-up
    function fecharPopup() {
        popup.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Permitir rolagem novamente
    }

    // Mostrar o pop-up ao carregar a página
    popup.style.display = 'block';
    document.body.classList.add('no-scroll'); // Impedir rolagem do fundo

    // Fechar o pop-up ao clicar em qualquer lugar, incluindo dentro dele
    document.addEventListener('click', function() {
        fecharPopup();
    });

    // Abrir o pop-up ao clicar no botão de regras
    regrasButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Evitar que o clique feche o pop-up imediatamente
        popup.style.display = 'block';
        document.body.classList.add('no-scroll'); // Impedir rolagem do fundo
    });
});