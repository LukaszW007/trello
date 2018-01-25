function Column (id, name) {
    var self = this;
    this.id = id;
    this.name = name;
    this.$element = createColumn(); // chodzi o to  ze to nie jest metoda ani funkcja tylko funkcja ktora ma sie wydarzyc w momencie utworzenia obiektu klasy Column!

    function createColumn () {
        // CREATING COMPONENTS OF COLUMNS
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title ' + self.id).text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
        // var $editCardName = $('.column');


        // ADDING EVENTS
        $columnDelete.click(function () {
            self.deleteColumn();
        });
        $columnAddCard.click(function (event) {
            var cardName = prompt("Enter the name of the card", "Do something");
            // console.log(cardName);
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

/*$('.column').on('dblclick', '.card-description', function () {
    var cardName = $(this).html();
    var editColumnName = $(this).closest('.column').find('.column-title').attr('class');
    var idOfColumn = editColumnName.slice(13, editColumnName.length); // "column-title" length is 12
    // this.editCardName(cardName, idOfColumn);
    var self = this;
    var newCardName = prompt("Enter new name of the card", presentCardName);
    console.log(columnID);
    if (newCardName) {
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'PUT',
            data: {
                name: newCardName,
                bootcamp_kanban_column_id: columnID
            },
            success: function () {
                console.log('old name of the card: ' + self.name)
                self.name = newCardName;
                $(self).text(newCardName);
            }
        })
    }
});*/

Column.prototype = {
    addCard: function (card) {
        this.$element.children('ul').append(card.$element);
    },
/*    removeColumn: function () {
        if (confirm('Are you sure to delete the column?')) {
            this.$element.remove();
        }
    },*/
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
    /*editCardName: function (presentCardName, columnID) {
        var self = this;
        var newCardName = prompt("Enter new name of the card", presentCardName);
        console.log(columnID);
        if (newCardName) {
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'PUT',
                data: {
                    name: newCardName,
                    bootcamp_kanban_column_id: columnID
                },
                success: function () {
                    console.log('old name of the card: ' + self.name)
                    self.name = newCardName;
                    $(self).text(newCardName);
                }
            })
        }

    }*/

};