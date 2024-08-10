import * as THREE from 'three';
import vertexShader from './src/shaders/vertex.glsl';
import fragmentShader from './src/shaders/fragment.glsl';


const init = ()=>{
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  

  const dirLight = new THREE.DirectionalLight('#ffffff', 1);
  dirLight.position.set(5, 5, 5).normalize();
  scene.add(dirLight);

  const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
  scene.add(ambientLight);

  const geometry = new THREE.IcosahedronGeometry(1, 4);
  // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

const material = new THREE.ShaderMaterial(
  vertexShader,
  fragmentShader
)

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  camera.position.z = 5;
  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();
}



init()
