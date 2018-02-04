function Column(id, name) {
    var self = this;
    this.id = id;
    this.name = name;
    this.$element = createColumn(); // chodzi o to  ze to nie jest metoda ani funkcja tylko funkcja ktora ma sie wydarzyc w momencie utworzenia obiektu klasy Column!

    function createColumn() {
        // CREATING COMPONENTS OF COLUMNS
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title ' + self.id).text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

        $($column).data("id", self.id);


        // ADDING EVENTS
        $columnDelete.click(function () {
            self.deleteColumn();
        });
        $columnAddCard.click(function (event) {
            var cardName = prompt("Enter the name of the card", "Do something");
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function (response) {
                    if (cardName != null && cardName != "") {
                        var card = new Card(response.id, cardName);
                        self.addCard(card);
                    }
                }
            })
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

var $draggable = $('.card').draggabilly();
$draggable.on('dragEnd', function () {
    var self = this;
    var cardName = self.name;
    self.removeCard;
    $.ajax({
        url: baseUrl + '/card',
        method: 'POST',
        data: {
            name: cardName,
            bootcamp_kanban_column_id: self.id
        },
        success: function (response) {
            if (cardName != null && cardName != "") {
                var card = new Card(response.id, cardName);
                self.addCard(card);
            }
        }
    })
});
Column.prototype = {
    addCard: function (card) {
        this.$element.children('ul').append(card.$element);
    },
    deleteColumn: function () {
        if (confirm('Are you sure to delete the column?')) {
            var self = this;
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'DELETE',
                success: function (response) {
                    self.$element.remove();
                }
            });
        }
    }
};
