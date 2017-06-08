// import assets

import skyTextureImage from "../../assets/images/sky.jpg";
import floorTextureImage from "../../assets/images/wood.jpg";
import wallTextureImage from "../../assets/images/metal.jpg";
import ui_hint_normal  from "../ui/hint-normal.png";
import ui_hint_hover from "../ui/hint-hover.png";
import ui_hint_paper from "../ui/hint-paper.png";
import ui_voteInv from "../ui/voteInv.png";
import doorTextureImage from "../ui/door.jpg";
import $ from "jquery";

// import css
import "../css/main.css";

// import js
import * as THREE from "three";
// import * as TrackballControls from "three-trackballcontrols";

//import * from "./OrbitContr
import { WALL_SIZE, ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS, Room } from "./room";
import { Player } from "./player";
import { DOOR_SIZE, Door } from "./door";
import { KineticControl } from "./kinetic_control";
import { GameControl } from "./gameControl";
import { Craft } from "./craft";
import { Socket } from "./fakeSocket";
import { FakeNet } from "./fakeNet";


// init URL
const baseURL = "ws://10.132.141.33:2333";


// init craftID
const ROOM_ID = 0;
const DOOR_ID = 1;
const WALL_ID = 2;


//temporary get
function getPlayerId() {
	return 0;
}

function getGameId() {
	return 0;
}

function getPlayers() {
	let players = [];
	for(let i = 0;i < 1;++i) {
		players[i] = new Player("test" + i,null,i,i);
	}
	return players;
}

let randomMove = true;
let rowCount = 4,columnCount = 4,worldWidth = 0,worldHeight = 0,roomModel = [[0,0,1,1],[1,2,1,3],[3,2,1,0],[0,1,2,3]];
let currentPlayerId,currentPlayer,currentPlayerIndex;
let gameId;
let socket;
let players = getPlayers();
let playersPosition;
let gameController,kineticControl;

let rooms,doors,walls;
let loadWarningText = ["加载基础场景","登录服务器","加载玩家信息","加载房间信息","加载游戏环境"];

let [loadWarning,loadWarningFinish] = showLoadWarning(loadWarningText);


// init clock
let clock = new THREE.Clock();

// init renderer
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x666666);
renderer.shadowMap.enabled = true;
renderer.domElement.style.display = "none";
document.body.appendChild(renderer.domElement);
renderer.domElement.style.cssText = "position:absolute;";
//sleep(2000);
// init scene

let scene = new THREE.Scene();

// init camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
scene.add(camera);

let textureLoader = new THREE.TextureLoader();

// make materials
let skyTexture = textureLoader.load(skyTextureImage);
let skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });

let currentPlayerModel = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhongMaterial({ color:0xffffff }));
currentPlayerModel.visible = false;

// make sky
let sky = new THREE.Mesh(new THREE.SphereGeometry(1000, 100, 10), skyMaterial);
sky.position.set(worldWidth / 2, 0, worldHeight / 2);
scene.add(sky);


// light up
let ambientLight = new THREE.AmbientLight(0x666666);
scene.add(ambientLight);
let hemisphereLight = new THREE.HemisphereLight(0x666666, 0x666666, 1);
scene.add(hemisphereLight);
loadWarningFinish[0].innerHTML = "☑";
animate();
render();

setTimeout(() => {
	init()}, 2000);

// init gameControl


// generate rooms
/*

gameController.createBasicUI();
gameController.gameCounter();
*/
function init() {
	kineticControl = new KineticControl(renderer.domElement);
	gameController = new GameControl(gameId,currentPlayerId,scene,camera,kineticControl);
	kineticControl.control = gameController;
	kineticControl.setCamera(camera);
	socket = new Socket(baseURL);
	currentPlayerId = getPlayerId();
	gameId = getGameId();
	socket.emit("login",[currentPlayerId,gameId]);
	//socket.on("waitForLogin",function(errno) {
	//	if(errno) {
			loadWarningFinish[1].innerHTML = "☑";
			testForFinish();
	//	}
	//});
	//socket.on("getRoomInfo",function(data) {
	//	rowCount = data[0];
	//	columnCount = data[1];
	//	roomModel = data[2];
	//	worldWidth = ROOM_SIZE * columnCount;
	//	worldHeight = ROOM_SIZE * rowCount;
		sky.position.set(worldWidth / 2, 0, worldHeight / 2);
		camera.position.set(worldWidth / 2, 50, worldHeight / 2);
		let callFn1 = function() {
			let re = gameController.createRooms(rowCount,columnCount,roomModel);
			rooms = re[0];
		 	doors = re[1];
		 	walls = re[2];

		 	for(let room of rooms) {
				room.craft = new Craft(ROOM_ID,"room",floorTextureImage,room.floor,false);	
			}
			for(let door of doors) {
				door.model.craft = new Craft(DOOR_ID,"door",doorTextureImage,door,false);
				door.model.craft.setDoor();
				kineticControl.addCollision(door.model);
			}
			for(let wall of walls) {
				wall.craft = new Craft(WALL_ID,"wall",wallTextureImage,wall,false);
				kineticControl.addCollision(wall);
			}
		 	loadWarningFinish[3].innerHTML = "☑";
		 	testForFinish();

		}

	setTimeout(() => {
			callFn1()},2000);
		// finish RoomInfo
		// let 
		//todo.createRooms();
	//});
	//socket.on("getPlayers",function(data) {
	//	players = data[0];
	//	playersPosition = data[1];
		for(let i in players) {
			if(players[i].id == currentPlayerId) {
				currentPlayer = players[i];
				currentPlayer.isLocal = true;
				currentPlayer.model = currentPlayerModel.clone();
				currentPlayerIndex = i;
				console.log("there");
				break;
			}
		}
		gameController.setPlayers(currentPlayer,players);
		kineticControl.setPlayer(currentPlayer);
		console.log(currentPlayer);
		let callFn2 = function() {
			gameController.createPlayers(players);
			loadWarningFinish[2].innerHTML = "☑";
			testForFinish();
		};
		setTimeout(() => {
			callFn2()},2000);
		//todo.createPlayers();
		//finish PlayerInfo
	//});
	socket.on("waitGameBegin",function() {

	});


}

function begin() {
	kineticControl.regist();
	randomMove = false;
		for(let i = 0;i < loadWarningText.length;++i) {
			$(loadWarningFinish[i]).fadeOut();
			$(loadWarning[i]).fadeOut();
		}
	gameController.createBasicUI();
	gameController.preGaming(10);	
}

function testForFinish() {
	let i;
	for(i = 0;i < loadWarningText.length - 1;++i) {
		if (loadWarningFinish[i].innerHTML != "☑") break;
	}
	if( i >= loadWarningText.length - 1 ) {
		loadWarningFinish[loadWarningText.length - 1].innerHTML = "☑";
		socket.emit("ready",true);
		begin();
	}
}
/*
// init para
let rowCount = 4;
let columnCount = 4;
let worldWidth = ROOM_SIZE * columnCount;
let worldHeight = ROOM_SIZE * rowCount;




// init trackball controls
// let trackballControls = new TrackballControls(camera);
// trackballControls.staticMoving = true;
// trackballControls.addEventListener("change", render);

// init texture loader

//let directionalLight = new THREE.DirectionalLight(0x666666);
//directionalLight.position.set(0, 1000, 0);
//directionalLight.castShadow = true;
//scene.add(directionalLight);

// init players
let players = [];
let currentPlayer = new Player("test", true, currentPlayerModel, 0);
currentPlayer.addToScene(scene, 5, 0, 5);
players.push(currentPlayer);
players[1] = new Player("waa", false, new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshPhongMaterial({ color:0x123231 })), 1);
players[1].addToScene(scene, 5, 0, 5);

//players.push(anotherPlayer);
// init kinetic control
let kineticControl = new KineticControl(camera, renderer.domElement, currentPlayer);


// bind events
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // trackballControls.handleResize();
    render();
});

// init gameControl
let gameController = new GameControl(1,players,currentPlayer,scene,camera);


// generate rooms
let re = gameController.createRooms(rowCount,columnCount);
let rooms = re[0];
let doors = re[1];
let walls = re[2];
for(let room of rooms) {
	room.craft = new Craft(ROOM_ID,"room",floorTextureImage,room.floor,false);	
}
for(let door of doors) {
	door.model.craft = new Craft(DOOR_ID,"door",doorTextureImage,door,false);
	door.model.craft.setDoor();
	kineticControl.addCollision(door.model);
}
for(let wall of walls) {
	wall.craft = new Craft(WALL_ID,"wall",wallTextureImage,wall,false);
	kineticControl.addCollision(wall);
}

gameController.createBasicUI();
gameController.gameCounter();

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


*/

function animate() {
    requestAnimationFrame(animate);

    // trackballControls.update();
    let delta = clock.getDelta();
    if(!randomMove) {
    	kineticControl.action(delta);
    	for (let player of players) {
        	player.move(camera);
   	 	}
    }
    if(randomMove) cameraRandomMove(camera);
    render();
}
function render() {
    renderer.render(scene, camera);
}

function showLoadWarning(text) {
	let warning = [];
	let finish = [];
	for(let i = 0;i < text.length;++i) {
		warning[i] = document.createElement("div");
		warning[i].className = "load_warning";
		warning[i].innerHTML = text[i];
		warning[i].style.top = "" + (20 + 12 * i) + "%";
		finish[i] = document.createElement("div");
		finish[i].className = "load_finish";
		finish[i].innerHTML = "☐";
		finish[i].style.top = "" + (20 + 12 * i) + "%";
		document.body.appendChild(warning[i]);
		document.body.appendChild(finish[i]);
		$(warning[i]).fadeIn(1500); 
		$(finish[i]).fadeIn(1500);
	}
	return [warning,finish];
}

function cameraRandomMove(camera) {
	camera.position.x += 0.05;
	camera.position.y -= 0.01;
	camera.position.z += 0.05;
	camera.lookAt(new THREE.Vector3(camera.position.x + 15, 0, camera.position.z + 15));
}