#define PHONG

precision highp float;

varying vec2 vUV;

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

void main(void) {

	//gl_FragColor = vec4(vUV.x, vUV.y, 0.0, 1.0);
  gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);

}
