varying vec3 vPosition;

void main() {
    vec4 color = vec4(vPosition,1.0);
    gl_FragColor = color;
}