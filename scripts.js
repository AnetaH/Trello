$(function() {
  
  function randomString() {
    let chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    let str = '';
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function Column(name) {
    let self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      let $column = $('<div>').addClass('column');
      let $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      let $columnCardList = $('<ul>').addClass('column-card-list');
      let $columnDelete = $('<button>').addClass('btn-delete').text('x');
      let $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

      $columnDelete.click(function() {
        self.removeColumn();
      });
      $columnAddCard.click(function(event) {
        self.addCard(new Card(prompt('Wpisz nazwę karty')));
      });

      $column.append($columnTitle)
      .append($columnDelete)
      .append($columnAddCard)
      .append($columnCardList);
      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
    let self = this;

    this.id = randomString();
    this.description = description;

    let $card = $("<li>")
      .addClass("card")
      .attr({ 
        title: this.description + ' #' + this.id
      });
    let $cardDescription = $('<p>').addClass('card-description').text(self.description);
    let $cardDelete = $('<button>').addClass('btn-delete').text('x');

    $cardDelete.click(function() {
      self.removeCard();
    });

      $card.append($cardDelete)
        .append($cardDescription);

    this.$element = $card;
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    },
  };

  let board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container'),
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
    }).disableSelection();
  }

  $('.create-column')
    .click(function() {
      let name = prompt('Wpisz nazwę kolumny');
      let column = new Column(name);
      board.addColumn(column);
    });

  // TWORZENIE KOLUMN
  let todoColumn = new Column('Do zrobienia');
  let doingColumn = new Column('W trakcie');

  // DODAWANIE KOLUMN DO TABLICY
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(new Column('Skończone'));

  // TWORZENIE NOWYCH EGZEMPLARZY KART I DODAWANIE KART DO KOLUMN
  todoColumn.addCard(new Card('Skonczyc kurs'));
  doingColumn.addCard(new Card('Stworzyc tablice kanban'));
});