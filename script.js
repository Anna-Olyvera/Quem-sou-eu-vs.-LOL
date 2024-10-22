// Função para carregar dados do arquivo JSON
async function carregarDados() {
    try {
        const response = await fetch('data.json'); // Caminho para o arquivo JSON
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        const data = await response.json(); // Converter resposta em JSON

        // Exibir todos os campeões por padrão
        imprimirInformacoes(data.campeoes);

    } catch (error) {
        console.error(error); // Logar erro, se houver
    }
}

// Função para imprimir as informações dos campeões na página e agrupá-los por letra inicial
function imprimirInformacoes(campeoes) {
    const listaCampeoes = document.getElementById('listaCampeoes');
    listaCampeoes.innerHTML = ''; // Limpar a lista antes de adicionar novos campeões

    // Ordenar campeões por nome (ordem alfabética)
    campeoes.sort((a, b) => a.nome.localeCompare(b.nome));

    // Agrupar campeões por letra inicial
    const campeoesAgrupados = campeoes.reduce((acc, campeao) => {
        const letraInicial = campeao.nome[0].toUpperCase(); // Primeira letra do nome
        if (!acc[letraInicial]) {
            acc[letraInicial] = [];
        }
        acc[letraInicial].push(campeao);
        return acc;
    }, {});

    // Exibir campeões agrupados por letra inicial
    for (const letra in campeoesAgrupados) {
        // Criar uma div para o título da letra
        const letraContainer = document.createElement('div');
        letraContainer.classList.add('letra-container'); // Adiciona uma classe para estilização

        // Criar e adicionar o título da letra (h2) dentro da div
        const letraTitulo = document.createElement('h2');
        letraTitulo.classList.add('letra');
        letraTitulo.textContent = `${letra}`;
        letraContainer.appendChild(letraTitulo);

        // Criar uma div para agrupar os campeões dessa letra
        const campeoesContainer = document.createElement('div');
        campeoesContainer.classList.add('camp-container'); // Adiciona a classe 'camp-container'

        // Adicionar campeões sob essa letra
        campeoesAgrupados[letra].forEach(campeao => {
            // Criar um cartão para cada campeão
            const campeaoDiv = document.createElement('div');
            campeaoDiv.classList.add('campeao');

            // Adicionar conteúdo ao cartão
            campeaoDiv.innerHTML = `
                <img src="${campeao.foto}" alt="Foto de ${campeao.nome}" style="width:100px;height:auto;">
                <h2>${campeao.nome}</h2>
            `;

            // Adicionar o cartão ao camp-container
            campeoesContainer.appendChild(campeaoDiv);

            // Adicionar evento de clique para alternar entre verde, vermelho e cor original
            campeaoDiv.addEventListener('click', () => {
                if (campeaoDiv.style.backgroundColor === 'rgb(67, 252, 212)') {
                    campeaoDiv.style.backgroundColor = 'rgb(252, 67, 113)'; // Mudar para vermelho
                } else if (campeaoDiv.style.backgroundColor === 'rgb(252, 67, 113)') {
                    campeaoDiv.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Voltar à cor original
                } else {
                    campeaoDiv.style.backgroundColor = 'rgb(67, 252, 212)'; // Mudar para verde
                }
            });
        });

        // Adicionar a div da letra e o camp-container ao contêiner principal
        listaCampeoes.appendChild(letraContainer);
        listaCampeoes.appendChild(campeoesContainer);
    }
}

// Chamar a função para carregar os dados ao carregar a página
carregarDados();