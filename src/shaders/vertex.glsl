varying vec3 vPosition; // communicate vertex to fragment shader


// attribute vec3 position; (vertex-specific)
// uniform mat4 projectionMatrix; (global)
// uniform mat4 modelViewMatrix


void main() {
  //modelmatrix is position,scale, rotation of model.
  //viewmatrix is position, orientation of model
  // projection matrix projects body onto screen
  vPosition = position;
  vec4 modelViewPosition = modelViewMatrix * vec4(position,1.0);
  vec4 projectedPosition = projectionMatrix * modelViewPosition;
  gl_Position = projectedPosition;

}