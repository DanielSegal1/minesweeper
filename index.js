import {Controller} from './src/controller.js';
import {Board} from './src/models/board.js';
import {BoardView} from './src/views/boardView.js';
import {ThemeToggleView} from './src/views/themeToggleView.js'

const app = new Controller(new ThemeToggleView(), new Board(), new BoardView());
