import {Controller} from './src/controller.js';
import {Board} from './src/models/board.js';
import {BoardView} from './src/views/boardView.js';

const app = new Controller(new Board(), new BoardView());
