// made by Kaendass
// I used x for red player and o for blue player in variable names
// this "for loop" is for creating board pattern. (checker pattern)
for (i = 0; i < 8; i++) {
	for (j = 0; j < 8; j++) {
		cell = 'cell' + i + j;

		if ((i % 2 == 0) & (j % 2 == 1)) {
			document.getElementById(cell).style.backgroundColor = '#fff';
		}
		if ((i % 2 == 1) & (j % 2 == 0)) {
			document.getElementById(cell).style.backgroundColor = '#fff';
		}
	}
}
game_started = false; //the game isn't started at first. players must start it. so this boolean value is false

// a function for placing checker pieces. with the following if statements, certain table cells
// are filled with pieces. the red ones are in the bottom and the blue ones are in the top.
function place_pieces() {
	for (i = 0; i < 8; i++) {
		for (j = 0; j < 8; j++) {
			cell_no = 'cell' + i + j + '_';
			document.getElementById(cell_no).innerHTML = '';
			if (i < 3) {
				if ((i % 2 == 0) & (j % 2 == 1)) {
					document.getElementById(cell_no).innerHTML = '🔵';
				}
				if ((i % 2 == 1) & (j % 2 == 0)) {
					document.getElementById(cell_no).innerHTML = '🔵';
				}
			}
			if (i > 4 && i < 8) {
				if ((i % 2 == 0) & (j % 2 == 1)) {
					document.getElementById(cell_no).innerHTML = '🔴';
				}
				if ((i % 2 == 1) & (j % 2 == 0)) {
					document.getElementById(cell_no).innerHTML = '🔴';
				}
			}
		}
	}
}
turn = ''; // a variable that determines the turn
// a function for starting and restarting the game
function start_game() {
	// random is used to select randomly the player who will start first.
	turn_randomizer = Math.floor(Math.random() * 2);
	if (turn_randomizer == 0) {
		turn = 'Red';
	} else {
		turn = 'Blue';
	}
	// information about the game and players is given here
	document.getElementById('turn_text').innerHTML = turn + " Player's turn!";
	red_score = 0;
	blue_score = 0;
	document.getElementById('blue_points').innerHTML = 'Blue: 0';
	document.getElementById('red_points').innerHTML = 'Red: 0';
	// once players start, the pieces are placed.
	place_pieces();
	document.getElementById('piece_table').style.cursor = 'pointer';
	game_started = true;
	document.getElementById('start_button').innerText = 'Restart';
	// all the cells' colors are returned their former colors which are black and white
	// this is required because if a piece is clicked, cells' colors will be green and if
	// players restart the game after clicking a piece, the cells' colors must not be green.
	for (i = 0; i < 8; i++) {
		for (j = 0; j < 8; j++) {
			cell_no = 'cell' + i + j + '_';
			make_transparent(cell_no);
		}
	}
}

clicked_cell = ''; // a variable helping colorize and uncolorize cells
// a function for selecting cells
function select(x, y) {
	// to select pieces, the game must be started
	if (game_started) {
		// cell id of a cell is created here
		cell = 'cell' + x + y + '_';
		// td_element is the piece in selected cell
		td_element = document.getElementById(cell).innerHTML;
		if (turn == 'Red') {
			// this if statement is used to make a move after clicking a piece and
			// choose a cell to move.
			if (document.getElementById(cell).style.backgroundColor == 'green') {
				move(clicked_cell, cell);
			}

			// this huge if statement is to make color of cells of selected cell white or black again
			if (clicked_cell != cell && clicked_cell != '') {
				a_x = Number(clicked_cell[4]);
				b_x = Number(clicked_cell[5]);
				// these variables are created to spot the cells around the clicked cell
				clx_cell_upright = 'cell' + (a_x - 1) + (b_x + 1) + '_';
				clx_cell_upleft = 'cell' + (a_x - 1) + (b_x - 1) + '_';
				clx_cell_downright = 'cell' + (a_x + 1) + (b_x + 1) + '_';
				clx_cell_downleft = 'cell' + (a_x + 1) + (b_x - 1) + '_';
				clx_cell_upupright = 'cell' + (a_x - 2) + (b_x + 2) + '_';
				clx_cell_upupleft = 'cell' + (a_x - 2) + (b_x - 2) + '_';
				clx_cell_downdownright = 'cell' + (a_x + 2) + (b_x + 2) + '_';
				clx_cell_downdownleft = 'cell' + (a_x + 2) + (b_x - 2) + '_';

				document.getElementById(clicked_cell).style.boxShadow = '';
				// these if statements is to prevent cell numbers to exceed boundries
				if (a_x - 1 >= 0) {
					if (b_x + 1 <= 7) {
						make_transparent(clx_cell_upright);
					}
					if (b_x - 1 >= 0) {
						make_transparent(clx_cell_upleft);
					}
				}
				if (a_x + 1 <= 7) {
					if (b_x + 1 <= 7) {
						make_transparent(clx_cell_downright);
					}
					if (b_x - 1 >= 0) {
						make_transparent(clx_cell_downleft);
					}
				}
				if (a_x - 2 >= 0) {
					if (b_x + 2 <= 7) {
						make_transparent(clx_cell_upupright);
					}
					if (b_x - 2 >= 0) {
						make_transparent(clx_cell_upupleft);
					}
				}
				if (a_x + 2 <= 7) {
					if (b_x + 2 <= 7) {
						make_transparent(clx_cell_downdownright);
					}
					if (b_x - 2 >= 0) {
						make_transparent(clx_cell_downdownleft);
					}
				}
			}
			// clicked cell is the former clicked cell
			clicked_cell = cell;

			// this if statement is to select a cell when it's red player's turn and make
			// cells around that cell green
			if (td_element == '🔴' || td_element == '🟥') {
				// these variables are like the previous ones
				cell_x_upright = 'cell' + (x - 1) + (y + 1) + '_';
				cell_x_upleft = 'cell' + (x - 1) + (y - 1) + '_';
				cell_x_downright = 'cell' + (x + 1) + (y + 1) + '_';
				cell_x_downleft = 'cell' + (x + 1) + (y - 1) + '_';
				cell_x_upupright = 'cell' + (x - 2) + (y + 2) + '_';
				cell_x_upupleft = 'cell' + (x - 2) + (y - 2) + '_';
				cell_x_downdownright = 'cell' + (x + 2) + (y + 2) + '_';
				cell_x_downdownleft = 'cell' + (x + 2) + (y - 2) + '_';
				// to highlight the selected cell
				document.getElementById(cell).style.boxShadow =
					'0px 0px 15px 0px green inset';
				// if statements for boundries as above
				if (x - 1 >= 0) {
					if (y + 1 <= 7) {
						make_green(cell_x_upright);
					}
					if (y - 1 >= 0) {
						make_green(cell_x_upleft);
					}
				}
				// square is the king and this if statement is to give red player a move all around
				// that selected piece if the piece is king
				if (x + 1 <= 7 && document.getElementById(cell).innerHTML == '🟥') {
					console.log('alertt');
					if (y + 1 <= 7) {
						make_green(cell_x_downright);
					}
					if (y - 1 >= 0) {
						make_green(cell_x_downleft);
					}
				}
				// these x-2 and x+2 if statements are for making cells that are over
				// enemy cells green. the enemy can be a circle (man) or a square (king)
				if (x - 2 >= 0) {
					if (
						y + 2 <= 7 &&
						(document.getElementById(cell_x_upright).innerHTML == '🔵' ||
							document.getElementById(cell_x_upright).innerHTML == '🟦')
					) {
						make_green(cell_x_upupright);
					}
					if (
						y - 2 >= 0 &&
						(document.getElementById(cell_x_upleft).innerHTML == '🔵' ||
							document.getElementById(cell_x_upleft).innerHTML == '🟦')
					) {
						make_green(cell_x_upupleft);
					}
				}
				if (x + 2 <= 7) {
					if (
						y + 2 <= 7 &&
						(document.getElementById(cell_x_downright).innerHTML == '🔵' ||
							document.getElementById(cell_x_downright).innerHTML == '🟦')
					) {
						make_green(cell_x_downdownright);
					}
					if (
						y - 2 >= 0 &&
						(document.getElementById(cell_x_downleft).innerHTML == '🔵' ||
							document.getElementById(cell_x_downleft).innerHTML == '🟦')
					) {
						make_green(cell_x_downdownleft);
					}
				}
			}
		}
		// this else statement is for blue player. statements in this else statement
		// are all the same above. only the directions differ
		else {
			if (document.getElementById(cell).style.backgroundColor == 'green') {
				move(clicked_cell, cell);
			}
			if (clicked_cell != cell && clicked_cell != '') {
				a_o = Number(clicked_cell[4]);
				b_o = Number(clicked_cell[5]);
				clo_cell_upright = 'cell' + (a_o + 1) + (b_o + 1) + '_';
				clo_cell_upleft = 'cell' + (a_o + 1) + (b_o - 1) + '_';
				clo_cell_downright = 'cell' + (a_o - 1) + (b_o + 1) + '_';
				clo_cell_downleft = 'cell' + (a_o - 1) + (b_o - 1) + '_';
				clo_cell_upupright = 'cell' + (a_o + 2) + (b_o + 2) + '_';
				clo_cell_upupleft = 'cell' + (a_o + 2) + (b_o - 2) + '_';
				clo_cell_downdownright = 'cell' + (a_o - 2) + (b_o + 2) + '_';
				clo_cell_downdownleft = 'cell' + (a_o - 2) + (b_o - 2) + '_';
				document.getElementById(clicked_cell).style.boxShadow = '';
				if (a_o + 1 <= 7) {
					if (b_o + 1 <= 7) {
						make_transparent(clo_cell_upright);
					}
					if (b_o - 1 >= 0) {
						make_transparent(clo_cell_upleft);
					}
				}
				if (a_o - 1 >= 0) {
					if (b_o + 1 <= 7) {
						make_transparent(clo_cell_downright);
					}
					if (b_o - 1 >= 0) {
						make_transparent(clo_cell_downleft);
					}
				}
				if (a_o + 2 <= 7) {
					if (b_o + 2 <= 7) {
						make_transparent(clo_cell_upupright);
					}
					if (b_o - 2 >= 0) {
						make_transparent(clo_cell_upupleft);
					}
				}
				if (a_o - 2 >= 0) {
					if (b_o + 2 <= 7) {
						make_transparent(clo_cell_downdownright);
					}
					if (b_o - 2 >= 0) {
						make_transparent(clo_cell_downdownleft);
					}
				}
			}
			clicked_cell = cell;
			if (td_element == '🔵' || td_element == '🟦') {
				cell_o_upright = 'cell' + (x + 1) + (y + 1) + '_';
				cell_o_upleft = 'cell' + (x + 1) + (y - 1) + '_';
				cell_o_downright = 'cell' + (x - 1) + (y + 1) + '_';
				cell_o_downleft = 'cell' + (x - 1) + (y - 1) + '_';
				cell_o_upupright = 'cell' + (x + 2) + (y + 2) + '_';
				cell_o_upupleft = 'cell' + (x + 2) + (y - 2) + '_';
				cell_o_downdownright = 'cell' + (x - 2) + (y + 2) + '_';
				cell_o_downdownleft = 'cell' + (x - 2) + (y - 2) + '_';
				document.getElementById(cell).style.boxShadow =
					'0px 0px 15px 0px green inset';

				if (x + 1 <= 7) {
					if (y + 1 <= 7) {
						make_green(cell_o_upright);
					}
					if (y - 1 >= 0) {
						make_green(cell_o_upleft);
					}
				}
				if (x - 1 >= 0 && document.getElementById(cell).innerHTML == '🟦') {
					if (y + 1 <= 7) {
						make_green(cell_o_downright);
					}
					if (y - 1 >= 0) {
						make_green(cell_o_downleft);
					}
				}
				if (x + 2 <= 7) {
					if (
						y + 2 <= 7 &&
						(document.getElementById(cell_o_upright).innerHTML == '🔴' ||
							document.getElementById(cell_o_upright).innerHTML == '🟥')
					) {
						make_green(cell_o_upupright);
					}
					if (
						y - 2 >= 0 &&
						(document.getElementById(cell_o_upleft).innerHTML == '🔴' ||
							document.getElementById(cell_o_upleft).innerHTML == '🟥')
					) {
						make_green(cell_o_upupleft);
					}
				}
				if (x - 2 >= 0) {
					if (
						y + 2 <= 7 &&
						(document.getElementById(cell_o_downright).innerHTML == '🔴' ||
							document.getElementById(cell_o_downright).innerHTML == '🟥')
					) {
						make_green(cell_o_downdownright);
					}
					if (
						y - 2 >= 0 &&
						(document.getElementById(cell_o_downleft).innerHTML == '🔴' ||
							document.getElementById(cell_o_downleft).innerHTML == '🟥')
					) {
						make_green(cell_o_downdownleft);
					}
				}
			}
		}
	}
}
// a function to make cells' colors green
function make_green(cell) {
	if (document.getElementById(cell).innerHTML == '') {
		document.getElementById(cell).style.backgroundColor = 'green';
	}
}

// a function to make cells' colors their former colors which are black or white
function make_transparent(cell) {
	document.getElementById(cell).style.backgroundColor = '';
}

// a function to give the ability of move to players
function move(cell, to_cell) {
	// these 4 big if statements is to make a score if conditions are satisfied
	// if a player makes a score, then the game searches for the combos.
	// I wrote all of these codes, and I did not ask for help from anybody or any website.
	// but I can't explain some pieces of the code, I wrote it but cannot explain sometimes you know
	if (turn == 'Red' && Number(cell[4]) - Number(to_cell[4]) == 2) {
		if (Number(cell[5]) - Number(to_cell[5]) > 0) {
			lost_cell = 'cell' + (Number(cell[4]) - 1) + (Number(cell[5]) - 1) + '_';
		} else {
			lost_cell = 'cell' + (Number(cell[4]) - 1) + (Number(cell[5]) + 1) + '_';
		}
		document.getElementById(lost_cell).innerHTML = '';
		score('Red');
		search_combo(turn, to_cell);
	} else if (turn == 'Red' && Number(cell[4]) - Number(to_cell[4]) == -2) {
		if (Number(cell[5]) - Number(to_cell[5]) > 0) {
			lost_cell = 'cell' + (Number(cell[4]) + 1) + (Number(cell[5]) - 1) + '_';
		} else {
			lost_cell = 'cell' + (Number(cell[4]) + 1) + (Number(cell[5]) + 1) + '_';
		}
		document.getElementById(lost_cell).innerHTML = '';
		score('Red');
		search_combo(turn, to_cell);
	} else if (turn == 'Blue' && Number(cell[4]) - Number(to_cell[4]) == 2) {
		if (Number(cell[5]) - Number(to_cell[5]) > 0) {
			lost_cell = 'cell' + (Number(cell[4]) - 1) + (Number(cell[5]) - 1) + '_';
		} else {
			lost_cell = 'cell' + (Number(cell[4]) - 1) + (Number(cell[5]) + 1) + '_';
		}
		document.getElementById(lost_cell).innerHTML = '';
		score('Blue');
		search_combo(turn, to_cell);
	} else if (turn == 'Blue' && Number(cell[4]) - Number(to_cell[4]) == -2) {
		if (Number(cell[5]) - Number(to_cell[5]) > 0) {
			lost_cell = 'cell' + (Number(cell[4]) + 1) + (Number(cell[5]) - 1) + '_';
		} else {
			lost_cell = 'cell' + (Number(cell[4]) + 1) + (Number(cell[5]) + 1) + '_';
		}
		document.getElementById(lost_cell).innerHTML = '';
		score('Blue');
		search_combo(turn, to_cell);
	}

	// to exchange cell values after making a move
	a = document.getElementById(cell).innerHTML;
	b = document.getElementById(to_cell).innerHTML;
	temp = a;
	document.getElementById(cell).innerHTML = b;
	document.getElementById(to_cell).innerHTML = a;
	// determines if a piece is a king. if it is, game makes the piece a king
	make_king(turn, to_cell);

	// turn changes every move but if a combo exist, the turn doesn't change
	if (turn == 'Red' && is_combo == false) {
		turn = 'Blue';
	} else if (turn == 'Blue' && is_combo == false) {
		turn = 'Red';
	}

	// to update the text of ..player's turn
	document.getElementById('turn_text').innerHTML = turn + " Player's turn!";
	// once a player makes a score of 12, s/he wins because there are no enemy pieces
	if (red_score == 12) {
		document.getElementById('turn_text').innerHTML = 'Red Player Won!';
	}
	if (blue_score == 12) {
		document.getElementById('turn_text').innerHTML = 'Blue Player Won!';
	}
}

// variables for scores
red_score = 0;
blue_score = 0;

// a function to make a score and update the score text
function score(player) {
	switch (player) {
		case 'Red':
			red_score++;
			break;
		case 'Blue':
			blue_score++;
			break;
	}
	document.getElementById('blue_points').innerHTML = 'Blue: ' + blue_score;
	document.getElementById('red_points').innerHTML = 'Red: ' + red_score;
}

// a function to determine if a piece is king. if it is, the game make the piece a king
function make_king(player, cell) {
	if (player == 'Red' && Number(cell[4]) == 0) {
		document.getElementById(cell).innerHTML = '🟥';
	}
	if (player == 'Blue' && Number(cell[4]) == 7) {
		document.getElementById(cell).innerHTML = '🟦';
	}
}

// a variable for existence of a combo
is_combo = false;

// a function to search combos. if there are any combos, the turn doesn't change and green cells appear
// again and again as long as a combo exists
function search_combo(player, cell) {
	row = Number(cell[4]);
	col = Number(cell[5]);
	if (player == 'Red') {
		enemy_men = '🔵';
		enemy_king = '🟦';
	} else {
		enemy_men = '🔴';
		enemy_king = '🟥';
	}
	// cells' ids created as above
	right_up = 'cell' + (row + 1) + (col + 1) + '_';
	left_up = 'cell' + (row + 1) + (col - 1) + '_';

	right_down = 'cell' + (row - 1) + (col + 1) + '_';
	left_down = 'cell' + (row - 1) + (col - 1) + '_';

	right_upup = 'cell' + (row + 2) + (col + 2) + '_';
	left_upup = 'cell' + (row + 2) + (col - 2) + '_';

	right_downdown = 'cell' + (row - 2) + (col + 2) + '_';
	left_downdown = 'cell' + (row - 2) + (col - 2) + '_';
	is_combo = false;

	// these if statements check the cells around of moved piece and determines if
	// there is a combo
	// again, it's too difficult to explain this piece of code by writing comments
	if (row + 2 <= 7) {
		if (
			col + 2 <= 7 &&
			(document.getElementById(right_up).innerHTML == enemy_men ||
				document.getElementById(right_up).innerHTML == enemy_king) &&
			document.getElementById(right_upup).innerHTML == ''
		) {
			is_combo = true;
			make_green(right_upup);
		}
		if (
			col - 2 >= 0 &&
			(document.getElementById(left_up).innerHTML == enemy_men ||
				document.getElementById(left_up).innerHTML == enemy_king) &&
			document.getElementById(left_upup).innerHTML == ''
		) {
			is_combo = true;
			make_green(left_upup);
		}
	}
	if (row - 2 >= 0) {
		if (
			col + 2 <= 7 &&
			(document.getElementById(right_down).innerHTML == enemy_men ||
				document.getElementById(right_down).innerHTML == enemy_king) &&
			document.getElementById(right_downdown).innerHTML == ''
		) {
			is_combo = true;
			make_green(right_downdown);
		}
		if (
			col - 2 >= 0 &&
			(document.getElementById(left_down).innerHTML == enemy_men ||
				document.getElementById(left_down).innerHTML == enemy_king) &&
			document.getElementById(left_downdown).innerHTML == ''
		) {
			is_combo = true;
			make_green(left_downdown);
		}
	}
}

// the piece of code below is written for fun
// a variable for theme no
no = 0;

// a function to change theme
function change_theme() {
	no++;
	themes = [
		'#fc466b, #3f5efb',
		'#20002c, #cbb4d4',
		'#C33764, #1D2671',
		'#34e89e, #0f3443',
		'#6190E8, #A7BFE8',
		'#200122, #6f0000',
		'#43C6AC, #191654',
		'#DBE6F6, #C5796D',
		'#3494E6, #EC6EAD',
		'#F3904F, #3B4371',
	];
	if (no == 10) {
		no = 0;
	}
	document.getElementById('content').style.background =
		'linear-gradient(to right,' + themes[no] + ')';
}
