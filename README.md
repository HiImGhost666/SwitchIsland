# SwitchIsland - Mig Switch

## Welcome to SwitchIsland: Mig Switch with Preloaded Games

**SwitchIsland** is a fun, conceptual project that simulates a business selling **Mig Switches**—a unique Nintendo Switch cartridge preloaded with your favorite games. This repository showcases the creation of a website that allows users to choose games to be preloaded onto their Mig Switch, simulating the experience of customizing and purchasing a Switch cartridge.

Please note, **this is a theoretical concept** and does not represent an actual product. It’s for educational and entertainment purposes only.

## Features

- **Game Selection**: Users can browse through a list of available games and select which ones they'd like preloaded onto their Mig Switch.
- **Preloaded Games**: The Mig Switch is presented as a physical product that arrives with games pre-installed, eliminating the need for downloads.
- **Interactive Website**: Built with **HTML**, **CSS**, and **JavaScript**, the website allows users to click on game boxes to add or remove their selections.
- **Plug-and-Play**: Once the Mig Switch is delivered, users can connect it to their Nintendo Switch and start playing immediately with no setup required.

## Technologies Used

- **HTML**: For structuring the website and displaying game data.
- **CSS**: For styling the website and creating a responsive layout.
- **JavaScript**: For handling user interactions, game selection, and search functionality.

## How It Works

1. **Browse the Game Catalog**: Users can explore an array of games available for preloading.
2. **Select Games**: Choose the games you want to have on your Mig Switch cartridge.
3. **Order the Mig Switch**: Users will theoretically “order” their Mig Switch, which would be preloaded with the selected games.
4. **Plug-and-Play**: Upon receiving the Mig Switch, users can plug it into their Nintendo Switch and start playing the preloaded games instantly.

## Installation

To get started with the project, follow these instructions to run it locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/switchisland.git
    ```

2. Open the project in your browser:
    - Navigate to the `index.html` file inside the cloned folder and open it with your browser.

3. Enjoy browsing the theoretical game selection!

## Game Library

The website simulates a game catalog where users can choose from various preloaded games. While the game selection is part of the demonstration, you can add your own game images and details to the `new_games.js` file.

### Example game structure in `new_games.js`:

```js
export const games = [
  {
    name: 'Game 1',
    image: 'game1.jpg'
  },
  {
    name: 'Game 2',
    image: 'game2.jpg'
  }
];
