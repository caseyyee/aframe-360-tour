AFRAME.registerPrimitive('a-panorama', {
  defaultComponents: {
    panorama: {}
  }
});

AFRAME.registerComponent('panorama', {
  schema: {
    rotation: { type: 'vec3' },
    src: { type: 'string' }
  }
});