# 360 tour built using A-Frame

[Check it out!](https://caseyyee.github.io/aframe-360-tour/)

String together a tour using 360&deg; panorama images.

## Usage

### Basic setup

1. Include the primitive and component scripts needed for the tour along with A-Frame

    ```html
    <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
    <script src="primitives/tour.js"></script>
    <script src="primitives/hotspot.js"></script>
    ```

1. Setup the tour and define panorama images

    ```html
    <a-tour>
      <a-panorama id="livingroom" src="images/livingroom.jpg"></a-panorama>
      <a-panorama id="kitchen" src="images/kitchen.jpg"></a-panorama>
    </a-tour>
    ```

1. Define the hotspots for each panorama

    ```html
    <a-tour>
      <!-- sets a hotspot from livingroom to kitchen -->
      <a-hotspot for="livingroom" to="kitchen" mixin="hotspot-target" position="5 0 0"></a-hotspot>
      <!-- sets a hotspot from kitchen to livingroom -->
      <a-hotspot for="kitchen" to="livingroom" mixin="hotspot-target" position="2 0 5"></a-hotspot>
    </a-tour>
    ```

1. Style hotspots

    We use a _mixin_ to set the hotspot style:

    ```html
    <a-assets>
      <a-mixin id="hotspot-target" geometry="primitive: sphere; radius: 0.15" material="color: yellow"></a-mixin>
    </a-assets>
    ```
