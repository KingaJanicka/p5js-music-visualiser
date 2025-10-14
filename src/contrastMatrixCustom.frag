
precision highp float;

// x,y coordinates, given from the vertex shader
varying vec2 vTexCoord;

// the canvas contents, given from filter()
uniform sampler2D tex0;
// other useful information from the canvas
uniform vec2 texelSize;
uniform vec2 canvasSize;

// a custom variable from this sketch
uniform float lightness;
uniform vec2        u_tex0Resolution;
uniform vec2        u_resolution;
uniform float red;
uniform float green;
uniform float blue;

#include "../lygia/color/brightnessMatrix.glsl"
#include "../lygia/color/contrastMatrix.glsl"

void main (void) {
    vec4 color = vec4(red,green,blue,1.00);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec4 tex0 = texture2D(tex0, vTexCoord);
    mat4 brightness = brightnessMatrix(0.7 * step(0.5, st.x));
    mat4 contrast = contrastMatrix(1.9 + 1.0 * step(0.5, st.y));
    color = brightness * contrast * tex0 * color;

    gl_FragColor = color;
}
