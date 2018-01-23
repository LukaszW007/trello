var board = {
    name: 'Kanban Board',
    addColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

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