function Card(id,name) {
    var self = this;

    this.id = id;
    this.name = name;
    this.$element = createCard();

    function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);
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
        if (confirm('Are you sure to delete the card?')) {
            var self = this;
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'DELETE',
                success: function(){
                    self.$element.remove();
                }
            });
        }
    }
};