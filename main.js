import * as THREE from 'three';
import vertexShader from './src/shaders/vertex.glsl';
import fragmentShader from './src/shaders/fragment.glsl';
import { GUI } from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass, ShaderPass, SavePass } from 'three/examples/jsm/Addons.js';


const init = ()=>{

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
    
  camera.position.z = 5;


  // adding effectscomposer so that it's possible to chain multiple effects together for post-processing.

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
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


// adding GUI stuff
 const gui = new GUI();
 const cameraSettings = gui.addFolder('Camera');
 cameraSettings.add(camera.position,'z', 0, 10).name('zoom');
  cameraSettings.open();
 


  function animate() {
    requestAnimationFrame(animate);
    composer.render();
    // renderer.render(scene, camera);
}
animate();
}



init()
