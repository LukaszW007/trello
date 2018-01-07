$(function () {
    function nextElement() {
        var lastInArray = arrayOfId.indexOf(arrayOfId.length - 1);
        arrayOfId.push(lastInArray + 1);
        console.log(lastInArray);
    }

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    var arrayOfId = [];

    function Column(name) {
        var self = this;
        this.id = nextElement();
        this.name = name;
        this.$element = createColumn(); // chodzi o to  ze to nie jest metoda ani funkcja tylko funkcja ktora ma sie wydarzyc w momencie utworzenia obiektu klasy Column!

        function createColumn() {
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            // ADDING EVENTS
            $columnDelete.click(function () {
                self.removeColumn();
            });
            $columnAddCard.click(function (event) {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });

            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            // RETURN OF CREATED COLUMN
            return $column;
        }
    }

    Column.prototype = {
        addCard: function (card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function () {
            this.$element.remove();
        }
    };

    function Card(description) {
        var self = this;

        this.id = nextElement();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $card.append($cardDescription)
                .append($cardDelete);

            $cardDelete.click(function () {
                self.removeCard();
            });
            return $card;
        }
    }

    Card.prototype = {
        removeCard: function () {
            this.$element.remove();
        }
    };
    $('.create-column')
        .click(function(){
            var name = prompt('Enter a column name');
            var column = new Column(name);
            board.addColumn(column);
        });

    var card = {
        id: '2kd8s958ka',
        description: 'Create Kanban app',
        color: 'green',
        element: $('<div>')
    };

});
