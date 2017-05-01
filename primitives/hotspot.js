AFRAME.registerPrimitive('a-hotspot', {
  defaultComponents: {
    hotspot: {},
    text: {},
    mixin: 'hotspot-text'
  },
  // Maps HTML attributes to his ocean component's properties.
  mappings: {
    for: 'hotspot.for',
    to: 'hotspot.to',
    text: 'text.value'
  }
});

AFRAME.registerComponent('hotspot', {
  schema: {
    for: { type: 'string' },
    to: { type: 'string' }
  },

  init: function () {
    this.tour = document.querySelector('a-tour');

    this.el.setAttribute('geometry', {
      primitive: 'sphere',
      radius: 0.25
    });

    this.el.setAttribute('material', {
      color: 'yellow'
    });

    this.el.addEventListener('click', this.handleClick.bind(this));
  },

  handleClick: function () {
    var tour = this.tour.components['tour'];
    tour.loadSceneId(this.data.to);
  }
});