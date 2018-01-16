function Column (name) {
    var self = this;
    this.id = nextElement();
    this.name = name;
    this.$element = createColumn(); // chodzi o to  ze to nie jest metoda ani funkcja tylko funkcja ktora ma sie wydarzyc w momencie utworzenia obiektu klasy Column!

    function createColumn () {
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
            var cardName = prompt("Enter the name of the card", "Do something");
            console.log(cardName);
            if (cardName != null && cardName != "") {
                self.addCard(new Card(cardName));
            }

            // self.addCard(add());
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