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
        var $editColumnName = $('.column-title');
        var $cardEditName = $('.card');


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

        $editColumnName.dblclick(function () {
            var self = this;
            var editColumnName = $('.column-title').attr('class');
            var idOfColumn = editColumnName.slice(13, editColumnName.length); // "column-title" length is 12
            var newColumnName = prompt("Enter new name of the column");
            if (newColumnName != null && newColumnName != "") {
                $.ajax({
                    url: baseUrl + '/column/' + idOfColumn,
                    method: 'PUT',
                    data: {
                        name: newColumnName
                    },
                    success: function () {
                        console.log(self.id);
                        self.name = newColumnName;
                        $('.' + idOfColumn).text(newColumnName);
                    }
                })
            }
        });

        $cardEditName.dblclick(function () {
            var self = this;
            var cardText = $(this).children(".card-description").html();
            console.log(cardText, typeof cardText);
            var editColumnName = $(this).closest('.column').find('.column-title').attr('class');
            var idOfColumn = editColumnName.slice(13, editColumnName.length); // "column-title" length is 12
            console.log(editColumnName, idOfColumn)
            var newCardName = prompt("Enter new name of the card");
            if (newCardName) {
                $.ajax({
                    url: baseUrl + '/card/' + self.id,
                    method: 'PUT',
                    data: {
                        name: newCardName,
                        bootcamp_kanban_column_id: idOfColumn
                    },
                    success: function () {
                        self.name = newCardName;
                        
                    }
                })
            }

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
        if (confirm('Are you sure to delete the column?')) {
            this.$element.remove();
        }
    },
    deleteColumn: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.$element.remove();
            }
        });
    }
};