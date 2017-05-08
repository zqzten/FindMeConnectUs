#pragma glslify: cnoise2 = require(glsl-noise/classic/2d);

varying vec2 vUV;

uniform float u_time;
uniform float u_speed;
uniform float u_amp;

void main(void) {
  vUV = uv;

	float displacement = u_amp * cnoise2( vec2( position * 0.01 ) + u_time * u_speed );

	vec3 newPosition = position + normal * displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
