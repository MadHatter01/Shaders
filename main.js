import * as THREE from 'three';
import vertexShader from './src/shaders/vertex.glsl';
import fragmentShader from './src/shaders/fragment.glsl';
import { GUI } from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass, ShaderPass, SavePass, BlendShader, CopyShader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const init = () => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 5;


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; 
  controls.dampingFactor = 0.25;
  


  const dirLight = new THREE.DirectionalLight('#ffffff', 1);
  dirLight.position.set(5, 5, 5).normalize();
  scene.add(dirLight);

  const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
  scene.add(ambientLight);

  const geometry = new THREE.IcosahedronGeometry(1, 4);
  // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  }
  )

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);


  // adding GUI stuff
  const gui = new GUI();
  const cameraSettings = gui.addFolder('Camera');
  cameraSettings.add(camera.position, 'z', 0, 10).name('zoom');
  cameraSettings.open();

  // adding effectscomposer so that it's possible to chain multiple effects together for post-processing.
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera)); //captures screen current state


  const renderTargetParameters = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    stencilBuffer: false,
  };

  // for creating effects that rely on the previous frame. Saves the output of a scene to a texture that can be reused.
  const savePass = new SavePass(new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters));

  // blend textures together
  const blendPass = new ShaderPass(BlendShader, 'tDiffuse1');
  blendPass.uniforms['tDiffuse2'].value = savePass.renderTarget.texture;
  // blendPass.uniforms['mixRatio'].value = 0.125; 

  // copy the output of previous pass to the screen
  const outputPass = new ShaderPass(CopyShader);

  composer.addPass(blendPass);
  composer.addPass(savePass);
  outputPass.renderToScreen = true;
  //render the result of the post-processing to screen
  composer.addPass(outputPass);



  function animate() {
    requestAnimationFrame(animate);
    composer.render();
    controls.update();
    // renderer.render(scene, camera);
  }
  animate();
}



init()
