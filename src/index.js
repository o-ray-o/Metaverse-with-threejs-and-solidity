import * as THREE from "three";
import Movements from "./movement.js";
import blockchain from "./web3.js";
import abi from "./abi/abi.json" assert { type: "json" };
// Declaration of a new scene with Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Camera and renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient_light = new THREE.AmbientLight(0xbda355);
const direction_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(direction_light);
scene.add(ambient_light);

//  Setting up a flat space of the Metaverse
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial({ color: 0xffffff });
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);

// Cube
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

// // Cone
// const coneGeometry = new THREE.ConeGeometry(5, 20, 32);
// const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
// const cone = new THREE.Mesh(coneGeometry, coneMaterial);
// cone.position.set(-10, 5, 0);
// scene.add(cone);

camera.position.set(10, 5, 40);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

function animate() {
  // cube.rotation.y += 0.01;

  // Movement to the left
  if (Movements.isPressed(37)) {
    camera.position.x -= 0.5;
  }
  // Movement to the right
  if (Movements.isPressed(39)) {
    camera.position.x += 0.5;
  }
  // Movement Upwards
  if (Movements.isPressed(38)) {
    camera.position.y += 0.5;
  }
  // Movement Downwards
  if (Movements.isPressed(40)) {
    camera.position.y -= 0.5;
  }

  // Convert position values to regular numbers
  const cameraPosition = {
    x: Number(camera.position.x),
    y: Number(camera.position.y),
    z: Number(camera.position.z),
  };
  camera.lookAt(space.position);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();

// New NFT
const buttonMint = document.getElementById("mint");
buttonMint.addEventListener("click", mintNFT);

function mintNFT() {
  var nft_name = document.getElementById("nft_name").value;
  var nft_width = document.getElementById("nft_width").value;
  var nft_height = document.getElementById("nft_height").value;
  var nft_depth = document.getElementById("nft_depth").value;
  var nft_x = document.getElementById("nft_x").value;
  var nft_y = document.getElementById("nft_y").value;
  var nft_z = document.getElementById("nft_z").value;

  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask to use it!");
  }

  // Web3 Instance
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x06e79Ba63efB8b325321ff6E3a08AD3a488C3213"
  );

  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
      .send({ from: accounts[0] })
      .then((data) =>
        console.log("NFT available in the metaverse, please refresh")
      );
  });
}

blockchain.then((result) => {
  // For each building paid for in the Smart Contract
  // a graphical representation is made in the Metaverse
  result.building.forEach((building, index) => {
    if (index <= result.supply) {
      //representation of NFT as boxes
      const boxGeometry = new THREE.BoxGeometry(
        Number(building.w),
        Number(building.h),
        Number(building.d)
      );
      const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x33fffc });
      const nft = new THREE.Mesh(boxGeometry, boxMaterial);
      nft.position.set(
        Number(building.x),
        Number(building.y),
        Number(building.z)
      );
      scene.add(nft);
      console.log("NFT added to Metaverse");
    }
  });
});
