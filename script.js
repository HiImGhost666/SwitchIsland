import { games } from './new_games.js'; // Ensure this import is correct

const gameGrid = document.getElementById('gameGrid');
const selectedList = document.getElementById('selectedList');
const searchInput = document.getElementById('searchInput'); // Get the search input element

// Render the games grid
function renderGames(filter = '') {
    gameGrid.innerHTML = ''; // Clear the grid

    // Sort games alphabetically by name
    const sortedGames = [...games].sort((a, b) => a.name.localeCompare(b.name));

    // Filter the games based on the search input
    const filteredGames = sortedGames.filter(game => game.name.toLowerCase().includes(filter.toLowerCase()));

    // Check if there are any filtered games
    if (filteredGames.length === 0) {
        gameGrid.innerHTML = '<p>No games found.</p>'; // Display message if no games match the filter
        return;
    }

    // Loop through the filtered games and render them
    filteredGames.forEach(game => {
        const gameBox = document.createElement('div');
        gameBox.className = 'game-box';

        const gameImg = document.createElement('img');
        const imgSrc = game.image; // Assuming images are .jpg format

        // Handle missing image fallback
        gameImg.src = imgSrc;
        gameImg.onerror = () => {
            gameImg.src = '../images/missing.png'; // Fallback image if not found
        };

        gameImg.alt = game.name;
        gameBox.appendChild(gameImg);

        const gameName = document.createElement('h3');
        gameName.textContent = game.name;
        gameBox.appendChild(gameName);

        // Add event listener to select/deselect the game
        gameBox.addEventListener('click', () => toggleGameSelection(game));

        gameGrid.appendChild(gameBox);
    });
}

// Handle game selection/deselection
function toggleGameSelection(game) {
    const isSelected = [...selectedList.children].some(li => li.textContent === game.name);

    const gameBox = [...gameGrid.children].find(box => box.querySelector('h3').textContent === game.name);

    if (isSelected) {
        deselectGame(game, gameBox);
    } else {
        selectGame(game, gameBox);
    }
}

// Add game to the selected list
function selectGame(game, gameBox) {
    const listItem = document.createElement('li');
    listItem.textContent = game.name;
    listItem.classList.add('selected'); // Mark as selected

    // Add event listener to deselect the game
    listItem.addEventListener('click', () => deselectGame(game));

    selectedList.appendChild(listItem);

    // Change the game box color to green when selected
    gameBox.style.backgroundColor = '#7700ff';  // Green
}

// Remove game from the selected list
function deselectGame(game, gameBox) {
    const listItem = [...selectedList.children].find(li => li.textContent === game.name);

    if (listItem) {
        listItem.remove(); // Remove from the selected list
    }

    // Change the game box color back to white when deselected
    gameBox.style.backgroundColor = '#FFFFFF';  // White
}

// Add an event listener to the search input field to filter games
searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value; // Get the search value
    renderGames(searchValue); // Render the games based on the search query
});

// Initial rendering
renderGames(); // Render games initially
