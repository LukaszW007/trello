function Column(id, name) {
    var self = this;
    // this.id = nextElement();
    this.id = id;
    this.name = name;
    this.$element = createColumn(); // chodzi o to  ze to nie jest metoda ani funkcja tylko funkcja ktora ma sie wydarzyc w momencie utworzenia obiektu klasy Column!

    /*function getIdOfColumn(column) {
        var idOfColumn='';
    $.ajax({
        url: baseUrl + '/column',
        method: 'GET',
        success: function (response) {
            idOfColumn=response.id;
        }
    })
    }*/
    function createColumn() {
        // CREATING COMPONENTS OF COLUMNS
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title-' + self.id).text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
        var $editColumnName = $('.column-title-' + self.id);
        var idColumn=self.id;
        var editColumnName = $('.column-title-' + idColumn);
        console.log(idColumn);
        console.log('title ' + editColumnName.text());//nie dziala bo kolumna jeszcze w nie stworzona w drzewie DOM


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
            var newColumnName = prompt("Enter new name of the column");
            var columnTitle = self.text();
            console.log(columnTitle);
            if (newColumnName != null && newColumnName != "") {
                var idOfColumn = '';
                $.ajax({
                    url: baseUrl + '/column',
                    method: 'GET',
                    data: {
                        name: columnTitle
                    },
                    success: function (response) {
                        idOfColumn = response.id;
                        console.log("response.id " + response.id);
                    }
                });
                var self = idOfColumn;
                console.log(self);
                $.ajax({
                    url: baseUrl + '/column/' + self.id,
                    method: 'PUT',
                    data: {
                        name: newColumnName
                    },
                    success: function (response) {
                        console.log(self.id);
                        self.name = newColumnName;
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