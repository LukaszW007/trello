function nextElement() {
    var lastInArray = arrayOfId.indexOf(arrayOfId.length - 1);
    arrayOfId.push(lastInArray + 1);
    console.log(lastInArray);
}

var arrayOfId = [];

// TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

// DODAWANIE KOLUMN DO TABLICY
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('Nowe zadanie');
var card2 = new Card('stworzyc tablice kanban');

// DODAWANIE KART DO KOLUMN
todoColumn.addCard(card1);
doingColumn.addCard(card2);