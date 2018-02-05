function nextElement () {
    var lastInArray = arrayOfId.indexOf(arrayOfId.length - 1);
    arrayOfId.push(lastInArray + 1);
    console.log(lastInArray);
}

var arrayOfId = [];

/*// Creating ne coulmns
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

// Adding columns to the board
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// Creating new cards
var card1 = new Card('Nowe zadanie');
var card2 = new Card('stworzyc tablice kanban');

// Adding cards to columns
todoColumn.addCard(card1);
doingColumn.addCard(card2);*/

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '2701',
    'X-Auth-Token': 'cd7acb669674b840fc2cc1a3d6570393'
};

$.ajaxSetup({
    headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function (response) {
        setupColumns(response.columns);
    }
});

function setupColumns (columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards (col, cards) {
    cards.forEach(function (card) {
        var card = new Card(card.id, card.name,card.bootcamp_kanban_column_id);
        col.addCard(card);
    });
}

