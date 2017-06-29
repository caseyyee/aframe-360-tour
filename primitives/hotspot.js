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

AFRAME.registerPrimitive('a-hotspot-helper', {
  defaultComponents: {
    'hotspot-helper': {}
  },
  mappings: {
    distance: 'hotspot-helper.distance'
  }
});


AFRAME.registerComponent('hotspot-helper', {
  schema: {
    distance: { type: 'number', default: 5 }
  },

  init: function () {
    this.camera = document.querySelector('a-entity[camera]');

    var panelEl = document.createElement('div');
    panelEl.style.cssText = 'position: absolute; top: 0; left: 0; padding: 10px; background: black; color: white; font-family: Helvetica, Arial, Sans-Serif';
    document.body.appendChild(panelEl);

    var distanceEl = document.createElement('input');
    distanceEl.type = "text";
    distanceEl.size = 4;
    distanceEl.value = this.data.distance;
    var self = this;
    distanceEl.addEventListener('input', function () {
      self.updateDistance(this.value);
    });

    distanceEl.addEventListener('mousewheel', function (e) {
      var value = e.deltaY < 0 ? 1 : -1;
      this.value = parseInt(this.value) + value;
      self.updateDistance(this.value);
    });

    panelEl.appendChild(distanceEl);

    var outEl = document.createElement('div');
    panelEl.appendChild(outEl);
    this.out = outEl;

    var copyEl = document.createElement('button');
    copyEl.innerHTML = 'copy';
    copyEl.addEventListener('click', function () {
      var selection = window.getSelection();    // Save the selection.
      var range = document.createRange();
      range.selectNodeContents(outEl);
      selection.removeAllRanges();          // Remove all ranges from the selection.
      selection.addRange(range);

      try {
        // Now that we've selected the anchor text, execute the copy command
        var successful = document.execCommand('copy');
      } catch(err) {
        console.log('Oops, unable to copy');
      }
    })
    panelEl.appendChild(copyEl);

    var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    this.cube = cube;
    this.el.object3D.add( cube );
    this.updateDistance(this.data.distance);
  },

  updateDistance: function (distance) {
    this.cube.position.z = -distance;
  },

  tick: function () {
    // use camera world rotation.
    var rotation = this.camera.object3D.getWorldRotation();

    this.el.object3D.rotation.copy(rotation);
    var position = this.cube.getWorldPosition();

    //this.el.object3D.rotation = rotation;
    //var quarternion = this.el.object3D.quaternion;
    var cords = this.roundTo(position.x, 3) + ' ' + this.roundTo(position.y, 3) + ' ' + this.roundTo(position.z, 3);
    this.out.innerHTML = cords;
    //this.out.setAttribute('text', { value: cords });
    //var rotation = this.camera.getAttribute('rotation');
  },

  roundTo: function(num, x) {
    return +(Math.round(num + "e+" + x)  + "e-" + x);
  }
});