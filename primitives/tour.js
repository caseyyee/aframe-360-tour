const IMAGE_CLASS = '.panorama'; // Classname of images to be included in tour.

AFRAME.registerPrimitive('a-tour', {
  defaultComponents: {
    tour: {}
  },
  mappings: {}
});

AFRAME.registerComponent('tour', {
  schema: {
    images: { type: 'string', default: IMAGE_CLASS}
  },
  init: function () {
    var images = Array.prototype.slice.call(document.querySelectorAll(this.data.images));
    if (images.length === 0) {
      console.error('You need to specify at least 1 image!');
      return;
    }
    var start = images[0];
    this.loadSceneId(start.getAttribute('id'));
  },

  loadSceneId: function(id) {
    var image = document.querySelector('#' + id + IMAGE_CLASS);
    this.loadImage(image.getAttribute('src'));
    this.setHotspots(id);
  },

  loadImage: function (src) {
    var sky = document.createElement('a-sky');
    sky.setAttribute('src', src);
    this.el.appendChild(sky);
  },

  setHotspots: function(id) {
    var hotspots = Array.prototype.slice.call(this.el.querySelectorAll('a-hotspot'));
    hotspots.forEach(function (spot) {
      var visible = spot.getAttribute('for') == id ? true : false;
      spot.setAttribute('visible', visible);
    })
  }
});