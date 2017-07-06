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
    to: { type: 'string' },
    positioning: { type: 'boolean', default: false }
  },

  init: function () {
    this.tour = document.querySelector('a-tour');
    this.el.addEventListener('click', this.handleClick.bind(this));
  },

  handleClick: function () {
    if (this.data.positioning) return;
    var tour = this.tour.components['tour'];
    tour.loadSceneId(this.data.to);
  }
});

AFRAME.registerComponent('hotspot-helper', {
  schema: {
    distance: { type: 'number', default: 5 },
    distanceIncrement: { type: 'number', default: 0.25 },
    target: { type: 'selector' },
    size: { type: 'number', default: 0.5 }
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
    var object = new THREE.Object3D();
    if (!this.data.target) {
      var geometry = new THREE.OctahedronGeometry( this.data.size );
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff9c });
      object = new THREE.Mesh(geometry, material);
    }
    this.targetObject = object;

    this.dolly = new THREE.Object3D();
    this.dolly.add(object);
    this.el.object3D.add(this.dolly);
    this.updateDistance(this.data.distance);

    // set positioning on target so that clicks are not triggered when placing hotspot.
    if (this.data.target) {
      this.data.target.setAttribute('hotspot', { positioning: true });
    }
  },

  updateDistance: function (distance) {
    this.targetObject.position.z = -distance;
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
    var position = this.targetObject.getWorldPosition();
    var cords = this.roundTo(position.x, 3) + ' ' + this.roundTo(position.y, 3) + ' ' + this.roundTo(position.z, 3);
    var target = this.data.target;
    if (target) {
      target.setAttribute('position', { x: position.x, y: position.y, z: position.z });
    }
    this.out.innerHTML = cords;
  }
});