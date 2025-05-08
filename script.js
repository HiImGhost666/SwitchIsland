import { games } from './new_games.js';

const gameGrid = document.getElementById('gameGrid');
const selectedList = document.getElementById('selectedList');
const searchInput = document.getElementById('searchInput');

// Render the games grid with info buttons
function renderGames(filter = '') {
    gameGrid.innerHTML = '';

    const sortedGames = [...games].sort((a, b) => a.name.localeCompare(b.name));
    const filteredGames = sortedGames.filter(game => 
        game.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredGames.length === 0) {
        gameGrid.innerHTML = '<p>No games found.</p>';
        return;
    }

    filteredGames.forEach(game => {
        const gameBox = document.createElement('div');
        gameBox.className = 'game-box';

        const gameImg = document.createElement('img');
        gameImg.src = game.image;
        gameImg.onerror = () => {
            gameImg.src = '../images/missing.png';
        };
        gameImg.alt = game.name;
        gameBox.appendChild(gameImg);

        // Show info button if any detailed info exists
        const hasDetails = game.description || game.releaseDate || game.genres || 
                         game.developers || game.publishers;
        
        if (hasDetails) {
            const infoBtn = document.createElement('button');
            infoBtn.className = 'info-btn';
            infoBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
            infoBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showGameInfo(game);
            });
            gameBox.appendChild(infoBtn);
        }

        const gameName = document.createElement('h3');
        gameName.textContent = game.name;
        gameBox.appendChild(gameName);

        gameBox.addEventListener('click', () => toggleGameSelection(game));
        gameGrid.appendChild(gameBox);
    });
}

// Create and show game info popup
function showGameInfo(game) {
    // Format release date
    const formatDate = (dateStr) => {
        if (!dateStr) return 'TBA';
        // Handle both "DD-MM-YYYY" and "DD MM, YYYY" formats
        const date = new Date(dateStr.replace(/(\d{2})[-\s](\d{2})[,\s]?(\d{4})?/, '$2/$1/$3'));
        return isNaN(date) ? dateStr : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Create popup
    const popup = document.createElement('div');
    popup.className = 'game-info-popup';
    
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    popup.innerHTML = `
        <div class="popup-content">
            <button class="close-popup"><i class="fas fa-times"></i></button>
            
            <div class="game-header-section">
                <img src="${game.image}" alt="${game.name}" class="game-cover" onerror="this.src='../images/missing.png'">
                <div class="game-header-info">
                    <h2>${game.name}</h2>
                    <div class="release-info">
                        ${game.releaseDate ? `<span class="release-date">${formatDate(game.releaseDate)}</span>` : ''}
                        ${game.developers?.length ? `
                        <div class="developers">
                            <span class="dev-label">Developed by:</span>
                            <span class="dev-names">${game.developers.join(', ')}</span>
                        </div>` : ''}
                    </div>
                    ${game.publishers?.length ? `
                    <div class="platforms">
                        <i class="fas fa-tv"></i> ${game.publishers.join(' • ')}
                    </div>` : ''}
                    ${game.genres?.length ? `
                    <div class="genres">
                        <i class="fas fa-tag"></i> ${game.genres.join(', ')}
                    </div>` : ''}
                </div>
            </div>
            
            <div class="game-content-grid">
                <div class="game-main-content">
                    ${game.description ? `
                    <div class="game-description-section">
                        <h3>About</h3>
                        <p>${game.description}</p>
                    </div>` : ''}
                </div>
                
                <div class="game-sidebar">
                    ${(game.gameModes?.length || game.perspectives?.length) ? `
                    <div class="game-facts-section">
                        <h3>Game Details</h3>
                        ${game.gameModes?.length ? `
                        <div class="fact-item">
                            <span class="fact-label"><i class="fas fa-users"></i> Modes:</span>
                            <span class="fact-value">${game.gameModes.join(', ')}</span>
                        </div>` : ''}
                        ${game.perspectives?.length ? `
                        <div class="fact-item">
                            <span class="fact-label"><i class="fas fa-eye"></i> Perspective:</span>
                            <span class="fact-value">${game.perspectives.join(', ')}</span>
                        </div>` : ''}
                    </div>` : ''}
                    
                    ${(game.themes?.length) ? `
                    <div class="game-themes-section">
                        <h3>Themes</h3>
                        <div class="theme-tags">
                            ${game.themes.map(theme => `<span class="theme-tag">${theme}</span>`).join('')}
                        </div>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;

    // Close functionality
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(popup);
        document.body.removeChild(overlay);
    });

    overlay.addEventListener('click', () => {
        document.body.removeChild(popup);
        document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}

// Rest of your existing functions remain the same
function toggleGameSelection(game) {
    const isSelected = [...selectedList.children].some(li => li.textContent === game.name);
    const gameBox = [...gameGrid.children].find(box => box.querySelector('h3').textContent === game.name);

    if (isSelected) {
        deselectGame(game, gameBox);
    } else {
        selectGame(game, gameBox);
    }
}

function selectGame(game, gameBox) {
    const listItem = document.createElement('li');
    listItem.textContent = game.name;
    listItem.classList.add('selected');
    listItem.addEventListener('click', () => deselectGame(game));
    selectedList.appendChild(listItem);
    gameBox.style.backgroundColor = '#7700ff';
}

function deselectGame(game, gameBox) {
    const listItem = [...selectedList.children].find(li => li.textContent === game.name);
    if (listItem) listItem.remove();
    if (gameBox) gameBox.style.backgroundColor = '#FFFFFF';
}

searchInput.addEventListener('input', function() {
    renderGames(searchInput.value);
});

renderGames();