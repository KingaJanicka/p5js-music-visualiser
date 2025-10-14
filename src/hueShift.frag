precision highp float;

// x,y coordinates, given from the vertex shader
varying vec2 vTexCoord;

// the canvas contents, given from filter()
uniform sampler2D tex0;
// other useful information from the canvas
uniform vec2 texelSize;
uniform vec2 canvasSize;

// a custom variable from this sketch
uniform float angle;

#include ../lygia/color/hueShift;

void main() {
  // get the color at current pixel
  vec4 color = texture2D(tex0, vTexCoord);
  gl_FragColor = hueShift(vec4(color.rgb, 1.0), float(angle));
}