const game = {
  plays: "X",
  moves: 0,
  cells: [],
  winner: false,
	player_x_wins: 0,
	player_o_wins: 0,
	draw: 0,
	cells_heigth: [],
	time_start: Date.now(),
	time_end: 0
};


for(let i = 0 ; i < 6 ; i ++){
	game.cells[i]=[null,null,null,null,null,null,null];
	game.cells_heigth[i]=5;
}
game.cells_heigth[6]=5;

function game_start(){
	game.winner= false;
	game.moves = 0;

	for(let i = 0 ; i < 6 ; i ++){
		game.cells[i]=[null,null,null,null,null,null,null];
		game.cells_heigth[i]=5;
	}
	game.cells_heigth[6]=5;

	for(var i=0;i<6;i++){
		for(var j=0;j<7;j++){
		document.getElementById('p'+i+'_'+j).disabled=false;
		document.getElementById('p'+i+'_'+j).innerText="";
		document.getElementById('p'+i+'_'+j).className="";
		}
	}
	document.getElementById('message').innerHTML = "Player: "+game.plays + " starts the game!";
	game.time_start = Date.now();
}


function play(x,y){
	document.getElementById('p'+game.cells_heigth[y]+'_'+y).innerText=game.plays;
	game.time_end = Date.now() - game.time_start;
	game.time_end = game.time_end / 1000 ;
	game.cells[game.cells_heigth[y]][y]=game.plays;
	game.cells_heigth[y]--;
	game.moves++; 
	document.getElementById('message').innerHTML="Move "+ game.moves+ ". Player " + game.plays+"<br>" + "It took him a total of: "+ game.time_end + " seconds";
	console.log(game.cells);
	console.log(game);
	this.checkWinner(game.cells_heigth[y]+1,y);
	if(game.winner===false)
		setTurn();
	game.time_start=Date.now();
}





function disableButtons(){
	for(var i=0;i<6;i++){
			for(var j=0;j<7;j++){
			document.getElementById('p'+i+'_'+j).disabled=true;
			}
	}
}



function horizontalWin(row){
	
	for(let i = 0 ; i <4 ; i ++){
		if(game.cells[row][i]==game.cells[row][i+1] &&
			game.cells[row][i]==game.cells[row][i+2] &&
			game.cells[row][i]==game.cells[row][i+3] &&
			game.cells[row][i]!= null){

				for(let x = 0 ; x < 4 ; x++){
					let s = i + x;
					document.getElementById('p'+row+'_'+s).className="blinking"
				}
				return true;
			}
	}
	return false;
}


function verticalWin(y){
	for(let i = 0 ; i <3 ; i ++){
		if(game.cells[i][y]==game.cells[i+1][y] &&
			game.cells[i][y]==game.cells[i+2][y] &&
			game.cells[i][y]==game.cells[i+3][y] &&
			game.cells[i][y]!= null){

				for(let x = 0 ; x < 4 ; x++){
					let s = i + x;
					document.getElementById('p'+s+'_'+y).className="blinking"
				}
				return true;
			}
	}
	return false;
}

function diagonialWin(){
	for (let row = 0; row < game.cells.length - 3; row++)
    {
        for (let col = 0; col < game.cells[row].length - 3; col++)
        {
					let element = game.cells[row][col];
            if (element == game.cells[row + 1][col + 1] && 
                element == game.cells[row + 2][col + 2] && 
                element == game.cells[row + 3][col + 3] &&
								element != null)
            {
							for(let i = 0 ; i < 4 ; i++){
								
								document.getElementById('p'+row+'_'+col).className="blinking";
								row = row + 1;
								col = col + 1;
							}
                return true;
            }
        }
    }
		for (let row = 0; row < game.cells.length - 3; row++)
    {
        for (let col = 3; col < game.cells[row].length; col++)
        {
            let element = game.cells[row][col];
            if (element == game.cells[row + 1][col - 1] && 
                element == game.cells[row + 2][col - 2] && 
                element == game.cells[row + 3][col - 3] &&
								element != null)
            {
							for(let i = 0 ; i < 4 ; i++){
								
								document.getElementById('p'+row+'_'+col).className="blinking";
								row = row + 1;
								col = col -1;
							}
                return true;
            }
        }
    }
    return false;
  
	
}


function checkWinner(x,y){
	
	if(game.moves>=7 && (horizontalWin(x)==true || verticalWin(y)==true || diagonialWin()==true)){
		console.log(game);
		game.winner=true;
		if(game.plays == 'X'){
			game.player_x_wins++;
		}else{
			game.player_o_wins++;
		}
		disableButtons();
		document.getElementById('message').innerHTML+= game.plays + " won <br>And the final score is: <br> X = "+game.player_x_wins+" O="+game.player_o_wins+ " Draws:"+game.draw;
	}
	else if(game.moves===42){
		document.getElementById('message').innerHTML+="Draw";
		game.draw++;
		disableButtons();
	}
}



function setTurn(){
	if(game.plays=='X')
		game.plays='O';
	else
		game.plays='X';
	
}

function setTurn2(){
	if(game.moves==0){
		setTurn();
		document.getElementById('message').innerHTML = "Player turn changed to: " + game.plays; 
	}else{
		document.getElementById('message').innerHTML = "Need to start a new game to change player turn";
	}
}

google.charts.load("current", {packages:["corechart"]});


function print_chart(){
	
	if(game.draw==0 && game.player_o_wins == 0 && game.player_x_wins ==0){
		document.getElementById('message').innerHTML = "No round played , no statistics made :) pls play a round first";
	}else{
		document.getElementById('message').innerHTML = "<div id=\"piechart_3d\" style=\"width: 600px; height: 500px;\"></div>";
	
		var data = google.visualization.arrayToDataTable([
			['Player', 'Number of wins'],
			['X wins',     game.player_x_wins],
			['O wins',      game.player_o_wins],
			['Draws',  game.draw]
		]);
		var options = {
			title: 'Game statistics',
			pieHole: 0.4,
		};
	
		var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
		chart.draw(data, options);
	}
	
	
}