var board = {
    name: 'Kanban Board',
    addColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

$('.column-container')
    .on("dblclick", ".column-title", function () {
        var self = this;
        var columnName = $(this).html();
        var idOfColumn = $(this).closest('.column').data('id');
        var newColumnName = prompt("Enter new name of the column", columnName);
        if (newColumnName) {
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
    })
    .on('dblclick', '.card-description', function () {
        console.log('dziala');
        var cardName = $(this).html();
        var idOfColumn = $(this).closest('.column').data('id');
        var idOfCard = $(this).closest('.card').data('id'); // "column-title" length is 12
        var self = this;
        var newCardName = prompt("Enter new name of the card", cardName);
        console.log(idOfColumn);
        if (newCardName) {
            $.ajax({
                url: baseUrl + '/card/' + idOfCard,
                method: 'PUT',
                data: {
                    name: newCardName,
                    bootcamp_kanban_column_id: idOfColumn
                },
                success: function () {
                    console.log('old name of the card: ' + self.name)
                    self.name = newCardName;
                    $(self).text(newCardName);
                }
            })
        }
    });


function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}

$('.create-column')
    .click(function () {
        var name = prompt('Enter a column name', 'To Do');
        if (name != null && name != "") {
            $.ajax({
                url: baseUrl + '/column',
                method: 'POST',
                data: {
                    name: name
                },
                success: function (response) {
                    var column = new Column(response.id, name);
                    board.addColumn(column);
                }
            });
        }
    });