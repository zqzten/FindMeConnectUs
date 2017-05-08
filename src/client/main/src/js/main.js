// import assets
import skyTextureImage from "../../assets/images/sky.jpg";
import floorTextureImage from "../../assets/images/wood.jpg";
import wallTextureImage from "../../assets/images/metal.jpg";

// import css
import "../css/main.css";

// import js
import * as THREE from "three";
import { ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS, Room } from "./room";
import { Player } from "./player";
import { KineticControl } from "./kinetic_control";

// init para
let rowCount = 10;
let columnCount = 10;
let worldWidth = ROOM_SIZE * columnCount;
let worldHeight = ROOM_SIZE * rowCount;

// init clock
let clock = new THREE.Clock();

// init renderer
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x666666);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// init scene
let scene = new THREE.Scene();

// init camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);

// init trackball controls
// let trackballControls = new TrackballControls(camera);
// trackballControls.staticMoving = true;
// trackballControls.addEventListener("change", render);

// init texture loader
let textureLoader = new THREE.TextureLoader();

// make materials
let skyTexture = textureLoader.load(skyTextureImage, () => render());
let skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });

let floorTexture = textureLoader.load(floorTextureImage, () => render());
let floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture, specular: 0xffffff });

let wallTexture = textureLoader.load(wallTextureImage, () => render());
let wallMaterial = new THREE.MeshPhongMaterial({ map: wallTexture, specular: 0xffffff, side: THREE.DoubleSide });

// make/load models
let floorModel = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_SIZE, ROOM_SIZE), floorMaterial);
floorModel.receiveShadow = true;

let wallModel = new THREE.Mesh(new THREE.CubeGeometry(ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS), wallMaterial);
wallModel.receiveShadow = true;
wallModel.castShadow = true;

let currentPlayerModel = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhongMaterial({ color:0xffffff }));

// make sky
let sky = new THREE.Mesh(new THREE.SphereGeometry(1000, 1000, 1000), skyMaterial);
sky.position.set(worldWidth / 2, 0, worldHeight / 2);
scene.add(sky);

// light up
let ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
let hemisphereLight = new THREE.HemisphereLight(0x666666, 0x666666, 1);
scene.add(hemisphereLight);
let directionalLight = new THREE.DirectionalLight(0x666666);
directionalLight.position.set(0, 1000, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// init players
let players = [];
let currentPlayer = new Player("test", true, currentPlayerModel, 0);
currentPlayer.addToScene(scene, 5, 0, 5);
players.push(currentPlayer);

// init kinetic control
let kineticControl = new KineticControl(camera, renderer.domElement, currentPlayer);

// gen rooms
let rooms = [];
genRooms(rowCount, columnCount, kineticControl);

// bind events
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // trackballControls.handleResize();
    render();
});

// render
render();
animate();

// helper functions
function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);

    // trackballControls.update();
    let delta = clock.getDelta();
    kineticControl.action(delta);

    for (let player of players) {
        player.move(camera);
    }

    render();
}

function getRoomAt(row, column) {
    return rooms[row * columnCount + column];
}

function genRooms(rowCount, columnCount, kineticControl) {
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            // reuse existed wall
            let northWall = row === 0 ? null : getRoomAt(row - 1, column).walls[1];
            let westWall = column === 0 ? null : getRoomAt(row, column - 1).walls[3];
            // add room
            let room = new Room(row, column, [northWall, null, westWall, null], floorModel, wallModel);
            rooms.push(room);
            // add floor
            scene.add(room.floor);
            // add walls
            for (let i = 0; i < 4; i++) {
                if ((i === 0 && row !== 0) || (i === 2 && column !== 0)) continue;
                let wall = room.walls[i];
                kineticControl.addCollision(wall);
                scene.add(wall);
            }
        }
    }
}
