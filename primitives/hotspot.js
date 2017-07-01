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

AFRAME.registerComponent('hotspot-helper', {
  schema: {
    distance: { type: 'number', default: 5 },
    distanceIncrement: { type: 'number', default: 0.25 }
  },

  init: function () {
    var self = this;
    this.camera = document.querySelector('a-entity[camera]');

    var uiContainer = document.createElement('div');
    uiContainer.style.cssText = 'position: absolute; top: 0; left: 0; padding: 10px; background: black; color: white; font-family: Helvetica, Arial, Sans-Serif';
    document.body.appendChild(uiContainer);

    var distanceInput = document.createElement('input');
    distanceInput.type = "text";
    distanceInput.size = 4;
    distanceInput.value = this.data.distance;
    this.distanceInput = distanceInput;
    distanceInput.addEventListener('input', function () {
      self.updateDistance(this.value);
    });
    uiContainer.appendChild(distanceInput);

    // mousewheel distance
    document.body.addEventListener('mousewheel', this.handleMouseWheel.bind(this));

    // coordinates
    var outEl = document.createElement('div');
    uiContainer.appendChild(outEl);
    this.out = outEl;

    // copy coordinates into clipboard
    var copyEl = document.createElement('button');
    copyEl.innerHTML = 'copy';
    uiContainer.appendChild(copyEl);
    copyEl.addEventListener('click', this.copyCordinates.bind(this));

    // reference mesh for position.
    var geometry = new THREE.BoxGeometry( 0.1, 0.2, 0.1 );
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff9c });
    var cube = new THREE.Mesh(geometry, material);
    this.cube = cube;
    this.dolly = new THREE.Object3D();
    this.dolly.add(this.cube);
    this.el.object3D.add(this.dolly);
    this.updateDistance(this.data.distance);
  },

  updateDistance: function (distance) {
    this.cube.position.z = -distance;
  },

  roundTo: function(num, x) {
    return +(Math.round(num + 'e+' + x)  + 'e-' + x);
  },

  copyCordinates: function () {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(this.out);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  },

  handleMouseWheel: function (e) {
    var input = this.distanceInput;
    var data = this.data;
    var increment = e.deltaY < 0 ? data.distanceIncrement : -data.distanceIncrement;
    input.value = parseFloat(input.value) + increment;
    this.updateDistance(input.value);
  },

  tick: function () {
    var rotation = this.camera.object3D.getWorldRotation();
    this.dolly.rotation.copy(rotation);
    var position = this.cube.getWorldPosition();
    var cords = this.roundTo(position.x, 3) + ' ' + this.roundTo(position.y, 3) + ' ' + this.roundTo(position.z, 3);
    this.out.innerHTML = cords;
  }
});