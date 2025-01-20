document.addEventListener('DOMContentLoaded', () => {
    // Grid setup
    const grid = document.getElementById('minesGrid');
    const selectedMines = new Set();

    // Create grid items
    for (let i = 0; i < 25; i++) {
        const button = document.createElement('button');
        button.className = 'grid-item';
        button.setAttribute('data-index', i);

        const dot = document.createElement('div');
        dot.className = 'grid-item-dot';

        button.appendChild(dot);
        grid.appendChild(button);
    }

    // Handle grid item clicks
    grid.addEventListener('click', (e) => {
        const button = e.target.closest('.grid-item');
        if (!button) return;

        const index = parseInt(button.getAttribute('data-index'));

        if (selectedMines.has(index)) {
            // Deselect mine
            selectedMines.delete(index);
            button.classList.remove('selected');

            // Restore dot
            button.innerHTML = '';
            const dot = document.createElement('div');
            dot.className = 'grid-item-dot';
            button.appendChild(dot);
        } else {
            // Select mine
            selectedMines.add(index);
            button.classList.add('selected');

            // Add mine icon
            button.innerHTML = '<i class="fa-solid fa-bomb"></i>';
            
        }
    });

    // Input handlers
    const valueInput = document.querySelector('.value-input');
    valueInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

});

function getRandomName() {
    const names = ['Miguel', 'João', 'Ana', 'Pedro', 'Sofia', 'Lara', 'Carlos', 'Laura', 'Isabel', 'Lucas', 'Marina', 'Rafael', 'Beatriz', 'Gustavo', 'Júlia', 'Daniel', 'Maria', 'Luiza', 'Fernando', 'André'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

function createRandomUser() {
    const games = ['Mines'];
    const randomName = getRandomName();
    const randomGame = games[Math.floor(Math.random() * games.length)];
    const randomValue = (Math.random() * (500 - 10) + 10).toFixed(2);

    return `
        <div class="slider-item">
          <i class="fa-brands fa-pix"></i>
          <p class="player-name">${randomName} <span class="won-text">ganhou</span> <span class="won-value">R$${randomValue}</span> <span class="game-name">no ${randomGame}</span></p>
        </div>
      `;
}

function animateSlider() {
    const slider = $('#slider');
    const firstItem = slider.find('.slider-item:first');
    const itemWidth = firstItem.outerWidth(true);

    slider.animate({ marginLeft: -itemWidth }, 3000, 'linear', function () {
        firstItem.appendTo(slider);
        slider.css('margin-left', 0);
        animateSlider();
    });
}

$(document).ready(function () {
    for (let i = 0; i < 15; i++) {
        const randomUser = createRandomUser();
        $('#slider').append(randomUser);
    }

    animateSlider();
});

// Função para gerar uma cor aleatória
function gerarCorAleatoria() {
    const cores = ['#0066ff33', '#adadad'];
    return cores[Math.floor(Math.random() * cores.length)];
}

// Função para definir o avatar
function definirAvatar() {
    const avatarElement = document.getElementById("avatar");
    const nomeUsuario = localStorage.getItem("nome");
    
    if (nomeUsuario) {
        // Exibe a primeira letra do nome
        const primeiraLetra = nomeUsuario.charAt(0).toUpperCase();
        avatarElement.textContent = primeiraLetra;
        
        // Verifica se já tem uma cor salva no localStorage
        let corFundo = localStorage.getItem("avatarColor");
        
        if (!corFundo) {
            // Se não tiver cor salva, gera uma nova cor aleatória
            corFundo = gerarCorAleatoria();
            localStorage.setItem("avatarColor", corFundo); // Salva a cor no localStorage
        }
        
        avatarElement.style.backgroundColor = corFundo;
    }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", definirAvatar);
