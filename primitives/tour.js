AFRAME.registerPrimitive('a-tour', {
  defaultComponents: {
    tour: {}
  }
});

AFRAME.registerComponent('tour', {
  init: function () {
    this.sky = document.createElement('a-sky');
    this.el.appendChild(this.sky);
    var images = Array.prototype.slice.call(this.el.querySelectorAll('a-panorama'));
    if (images.length === 0) {
      console.error('You need to specify at least 1 image!');
      return;
    }
    var start = images[0];
    this.loadSceneId(start.getAttribute('id'));
  },

  loadSceneId: function(id) {
    this.loadImage(this.el.querySelector('a-panorama#' + id));
    this.setHotspots(id);
  },

  loadImage: function (image) {
    var sky = this.sky;
    sky.setAttribute('src', image.getAttribute('src'));
    var camera = this.el.sceneEl.camera.el;
    camera.setAttribute('rotation', image.getAttribute('rotation'));
  },

  setHotspots: function(id) {
    var hotspots = Array.prototype.slice.call(this.el.querySelectorAll('a-hotspot'));
    hotspots.forEach(function (spot) {
      var visible = spot.getAttribute('for') == id ? true : false;
      spot.setAttribute('visible', visible);
    })
  }
});
