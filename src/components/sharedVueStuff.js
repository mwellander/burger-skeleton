'use strict';

// Stuff that is used both in the ordering system and in the kitchen
var sharedVueStuff = {
  data: function () {
    return {
      orders: {},
      uiLabels: {},
      ingredients: {},
    }
  },
  created: function () {
    this.$store.state.socket.emit('pageReady');
    this.$store.state.socket.on('initialize', function (data) {
      this.orders = data.orders;
      this.uiLabels = data.uiLabels;
      this.ingredients = data.ingredients;
    }.bind(this));

    this.$store.state.socket.on('switchLang', function (data) {
      this.uiLabels = data;
    }.bind(this));

    this.$store.state.socket.on('currentQueue', function (data) {
      this.orders = data.orders;
      if (typeof data.ingredients !== 'undefined') {
        this.ingredients = data.ingredients;
      }
    }.bind(this));
  },
  methods: {
    switchLang: function () {
      if (this.uiLabels.lang === "en") {
        this.uiLabels.lang = "sv";
      } else {
        this.uiLabels.lang = "en";
      }
      this.$store.state.socket.emit('switchLang', this.uiLabels.lang);
    }
  }
};

export default sharedVueStuff;
