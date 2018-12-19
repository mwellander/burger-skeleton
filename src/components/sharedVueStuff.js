'use strict';

// Stuff that is used both in the ordering system and in the kitchen
var sharedVueStuff = {
  data: function () {
    return {
      orders: {},
      // uiLabels: {},
      flag : {sv: "Flag_of_Britain.svg.png", en: "800px-Flag_of_Sweden.svg.png" },
      ingredients: {},
      // lang: store.getters.lang,
    }
  },
  computed: {
    uiLabels: function () {
      return this.$store.state.uiLabels;
    },
    lang: { get: function () {
      return this.$store.state.lang;
     },
     set: function (lang) {
      this.$store.commit('switchLang', lang);
     }
    }
  },
  created: function () {
    this.$store.state.socket.emit('pageLoaded');

    this.$store.state.socket.on('initialize', function (data) {
      this.orders = data.orders;
      // this.uiLabels = data.uiLabels;
      this.$store.commit('setUiLabels', data.uiLabels);
      this.ingredients = data.ingredients;
    }.bind(this));

    this.$store.state.socket.on('switchLang', function (data) {
      this.$store.commit('setUiLabels', data);
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
      if (this.lang === "en") {
        this.lang = "sv";
      } else {
        this.lang = "en";
      }
      this.$store.state.socket.emit('switchLang', this.lang);
    }
  }
};

export default sharedVueStuff;
