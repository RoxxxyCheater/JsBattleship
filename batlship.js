//Здесь представление

var view = {
	displayMessage: function(msg){ //Метод отвечает за вывод информационного сообщения
		var messageArea = document.querySelector("#messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location){ // //Метод отвечает за попадвния
		var selectHit = document.getElementById(location);
		selectHit.setAttribute("class", "hit");

	},
	displayMiss: function(location){ //Метод отвечает за промах
		var selectHit = document.getElementById(location);
		selectHit.setAttribute("class", "miss");
	}
};
//Здесь модель поведение игры
/*var ships = [
	var ship1 = { location: ['10', '20', '30'],	hits: ['', 'hit', '']},
	var ship2 = { location: ['32', '33', '34'],	hits: ['', '', '']},
	var ship3 = { location: ['63', '64', '65'],	hits: ['hit', '', '']}
];*/

var model = {
	boardSize: 7,  //размер игрового поля
	numShips: 3,   //колл-во кораблей в игре
	shipLength: 3, //длина корабля в клетках
	shipsSunk: 0,  // кол-во пораженных кораблей

	ships: [
		ship1 = { locations: [0, 0, 0],	hits: ['', '', '']},
		ship2 = { locations: [0, 0, 0],	hits: ['', '', '']},
		ship3 = { locations: [0, 0, 0],	hits: ['', '', '']}
		  ],
		   
	fire: function(guess){ // функция/метод получает кординаты выстрела и сравнивает с позицией кораблей
		for (var i = 0; i < this.numShips; i++){ 
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			//Refactoring:
			//Ниже избавляемся от временной переменной.
			/*location = ship.location; // получаем массив клеток, которые занимает корабль и это свойство корабля в которх храниться сам масив.
			var index = location.indexOf(guess); // Метод индексОФФ ищет в масиве указаное значение и если точка есть он возвращает индекс. Если значения нет выводит минус 1*/
				
			if (ship.hits[index] === 'hit') {
				view.displayMessage("Ух ты,помойму ты мне бочину распиТарасил!")
				return true;
			}else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("Ну ты попал!");

				if (this.isSunk(ship)){
					view.displayMessage("Приплыл Титаник!")
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("Даже не поцарапал - Мимо)");
	 return false;
	},

	isSunk: function(ship){
		for(var i = 0; i < this.shipLength; i++){
			if (ship.hits[i] !== "hit") {
				return false;

			}
		}
		return true;
	},

	//Генерация кораблей на игровом поле
	
		generateShipLocations: function(){ // Этод метод создает в игре масив кораблей - все корабли
			var locations; // Добавляем метод в обьект модели см.model
			for(var i = 0; i < this.numShips; i++){ // внутри нашего цикла генерируем для каждого корабля набор позиций, т.е. занимаемые им клеток
				do{
					locations = this.generateShip(); // в Самом локэйшн генерируем набор позицийю За это отвечает метод generateShip
				}while(this.collision(locations)); // Здесь проверяем перекрываются ли позиции уже существующими кораблями на поле до ьех пор пока не избежит перекрытия.
				this.ships[i].locations = locations; // Отвечает за получение позиций уже без перекрытий которая сохранения в свойстве location обьекта ships.
			} //Цикл будет проходить до тех пор,пока колличество кораблейне будет равно колличеству кораблей
		console.log("Ships array: ");
		console.log(this.ships);
		},

		generateShip: function(){
			var direction = Math.floor(Math.random() * 2);
			var row, col;

			if(direction === 1){
				//Сгенерировать горизонтальную позицию для корабля
				row = Math.floor(Math.random() * this.boardSize);
				col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			}else{
				//Сгенерировать вертикального позицию для корабля
				row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
				col = Math.floor(Math.random() * this.boardSize);
			}

			var newShipLocations = []; // Массив набор позиций для нвоого корабля. Начиная с пустого масива в который последовательно будут добавлятся пустые элементы

				for(var i = 0; i < this.shipLength; i++){
					if(direction === 1){
						// Добавить масив для горизонтального корабля
						newShipLocations.push(row + "" + (col + i));
					}else{
						// Добавить масив для вертикального корабля
						newShipLocations.push((row  + i) + "" + col);
					}
				}
				return newShipLocations;
		},
							//location(см. ниже) - это масив корабля который мы собираемся разместить на игровом поле,но ещё не знаем есть ли там пересечение
		collision: function(locations){ // Метод колишн отвечает за то что бы корабли не пересекалисьюПринимает данные корабля и проверяет что бы те не пересекались
			for(var i = 0; i < this.numShips; i++){ //Первый цикл переберает позиции проверяя на перекрытие
				var ship = this.ships[i];
				for(var j = 0; j < locations.length; j++){ 
					if (ship.locations.indexOf(locations[j]) >= 0) {
						return true; // если совпадения здесь в location... Проверяется совпадение через indexOf, если совпадение есть он возвращет номер индекса совпадения.
					}
				}
			}return false; //если совпадений здесь не находится в location...
		} 
};

/*
model.fire("23");

model.fire("32");

model.fire("15");

model.fire("13");

model.fire("20");
*/


/*view.displayMessage("Some fuck");
view.displayHit("35");
view.displayMiss("20");*/

//Controller:

var controller = {
	guesses: 0,

	processGuess: function(guess){
		
		var location = parseGuess(guess);
		if (location){
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips){
				view.displayMessage("Вы потопили " + model.numShips + " корабля за " + this.guesses + " выстрелов");
			}
		}
	}
}

function parseGuess(guess){
	var alphabet = ["A", "B", "C", "D", "E","F", "G"];
	if(guess === null || guess.length !== 2){
		alert("Неверные кординаты");
	}else{
		firstChar = guess.charAt(0); // извлекаем из строки первый символ
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		// alert(row); alert(column);
		if(isNaN(row) || isNaN(column)){
		 alert("Нихуя Неверные кординаты");
		}else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
			alert("Вообще нихуя неверные кординаты");
		}else{
			return row + column;
		}
	}return null;
}


function init(){  //Создаём функцию инит
	var fireButton = document.getElementById("fireButton"); // Получаем ссылку на кнопку Файрбаттон
	fireButton.onclick = handleFireButton; // Назначаем кнопке обработчик событий при нажатии будет выполнятся функция handleFireButton
	//добавляяем Энтер
	var guessInput = document.getElementById('guessInput'); // доюавляем новый обработчик
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
}
function handleFireButton(){
	var guessInput = document.getElementById('guessInput');
	var guess = guessInput.value; 
	controller.processGuess(guess);

	guessInput.value = "";
}

function handleKeyPress(e){
	var fireButton = document.getElementById("fireButton");
	/*console.log(e.keyCode);*/
	if(e.keyCode === 13){
		fireButton.click();
		return false;
	}
}

window.onload = init;

/*controller.processGuess("B0");
controller.processGuess("C0");
controller.processGuess("D0");

controller.processGuess("B5");
controller.processGuess("C4");
controller.processGuess("F0");

controller.processGuess("G4");
controller.processGuess("G3");
controller.processGuess("G5");

controller.processGuess("D2");
controller.processGuess("D3");
controller.processGuess("D4");

*/
