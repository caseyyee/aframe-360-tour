AFRAME.registerPrimitive('a-hotspot', {
  defaultComponents: {
    hotspot: {}
  },
  mappings: {
    for: 'hotspot.for',
    to: 'hotspot.to'
  }
});

AFRAME.registerComponent('hotspot', {
  schema: {
    for: { type: 'string' },
    to: { type: 'string' }
  },

  init: function () {
    this.tour = document.querySelector('a-tour');
    this.el.addEventListener('click', this.handleClick.bind(this));
  },

  handleClick: function () {
    var tour = this.tour.components['tour'];
    tour.loadSceneId(this.data.to);
  }
});