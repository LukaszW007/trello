function Card(description) {
    var self = this;

    this.id = nextElement();
    this.description = description;
    this.$element = createCard();

    function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
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
            this.$element.remove();
        }
    }
};