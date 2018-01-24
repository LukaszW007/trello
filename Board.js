var board = {
    name: 'Kanban Board',
    addColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

$('.column-container').on("dblclick","column-title",function () {
    var self = this;
    var editColumnName = $('.column-title').attr('class');
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
});


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