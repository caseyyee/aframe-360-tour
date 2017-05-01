# 360 tour built using A-Frame

[Check it out!](https://caseyyee.github.io/aframe-360-tour/)

String together a tour using 360&deg; panorama images.

## Usage

### Basic setup

1. Include the primitive and component scripts needed for the tour along with A-Frame:

```html
<script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
<script src="primitives/tour.js"></script>
<script src="primitives/hotspot.js"></script>
```

1. Specify the panorama images for your tour:

```html
<a-assets>
  <img id="livingroom" class="panorama" src="images/livingroom.jpg">
  <img id="kitchen" class="panorama" src="images/kitchen.jpg">
</a-assets>
```

1. Setup the tour and define the hotspots for each panorama:

```html
<a-tour>
  <!-- sets a hotspot from livingroom to kitchen -->
  <a-hotspot for="livingroom" to="kitchen" mixin="hotspot-target" position="5 0 0" rotation="0 -90 0"></a-hotspot>
  <!-- sets a hotspot from kitchen to livingroom -->
  <a-hotspot for="kitchen" to="livingroom" mixin="hotspot-target" position="2 0 5" rotation="0 180 0"></a-hotspot>
</a-tour>
```

1. Style hotspots

We use a _mixin_ to configure the style of the hotspots:

```html
<a-assets>
  <a-mixin id="hotspot-target" geometry="primitive: sphere; radius: 0.15" material="color: yellow"></a-mixin>
</a-assets>
```
