import {Controller} from './controller.js';
import {Board} from './models/board.js';
import {BoardView} from './views/boardView.js';

const app = new Controller(new Board(), new BoardView());
