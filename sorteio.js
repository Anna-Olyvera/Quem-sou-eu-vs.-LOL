// Função para carregar os dados do arquivo JSON e fazer o sorteio
async function realizarSorteio() {
    try {
        const response = await fetch('data.json'); // Caminho para o arquivo JSON
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        const data = await response.json(); // Converter resposta em JSON

        // Selecionar um campeão aleatório
        const campeoes = data.campeoes;
        const campeaoSorteado = campeoes[Math.floor(Math.random() * campeoes.length)];

        // Substituir a imagem e o nome dentro do botão
        const botaoSorteio = document.querySelector('.sorteio');
        const imgSorteio = botaoSorteio.querySelector('img');
        const pSorteio = botaoSorteio.querySelector('p');

        imgSorteio.src = campeaoSorteado.foto; // Substituir a imagem
        imgSorteio.alt = `Foto de ${campeaoSorteado.nome}`; // Atualizar o texto alternativo
        pSorteio.textContent = campeaoSorteado.nome; // Substituir o texto com o nome do campeão

    } catch (error) {
        console.error('Erro ao realizar o sorteio:', error);
    }
}

// Adicionar evento de clique ao botão de sorteio
document.querySelector('.sorteio').addEventListener('click', realizarSorteio);