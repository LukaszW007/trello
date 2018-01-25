var board = {
    name: 'Kanban Board',
    addColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

$('.column').on('dblclick', '.card-description', function () {
    console.log('dziala');
    var cardName = $(this).html();
    var editColumnName = $(this).closest('.column').find('.column-title').attr('class');
    var idOfColumn = editColumnName.slice(13, editColumnName.length); // "column-title" length is 12
    var self = this;
    var newCardName = prompt("Enter new name of the card",cardName);
    console.log(columnID);
    if (newCardName) {
        $.ajax({
            url: baseUrl + '/card/' + self.id,
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


/*$('.column-container').on("dblclick",".column-title",function () {
    var self = this;
    var editColumnName = $(this).attr('class');
    console.log(editColumnName);
    var idOfColumn = editColumnName.slice(13, editColumnName.length); // "column-title" length is 12
    var newColumnName = prompt("Enter new name of the column");
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
});*/


function initSortable () {
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