// import assets

import skyTextureImage from "../../static/img/sky.jpg";
import floorTextureImage from "../../static/img/wood.jpg";
import wallTextureImage from "../../static/img/metal.jpg";
import ui_hint_normal  from "../../static/img/hint-normal.png";
import ui_hint_hover from "../../static/img/hint-hover.png";
import ui_hint_paper from "../../static/img/hint-paper.png";
import ui_voteInv from "../../static/img/voteInv.png";
import doorTextureImage from "../../static/img/door.jpg";
import music from "../../static/audio/ui_main.mp3";
import ui_loading from "../../static/img/loading.jpg";
import player1_tex from "../../static/models/playermodel/Tex_0018_0.png";
import player1_model from "../../static/models/playermodel/subway.json";

// import css
import "../css/main.css";

// import js
import * as THREE from "three";
import $ from "jquery";
import * as io from "socket.io-client";

import { WALL_SIZE, ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS, Room } from "./room";
import { Player } from "./player";
import { DOOR_SIZE, Door } from "./door";
import { KineticControl } from "./kinetic_control";
import { GameControl } from "./game_control";
import { Craft } from "./craft";


// init URL
const baseURL = "localhost:3000/game";


// init craftID
const ROOM_ID = 0;
const DOOR_ID = 1;
const WALL_ID = 2;


function getCookie(name)
{
	let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function getAvatarId() {
	return getCookie("avatarID");
}
//temporary get
function getPlayerId() {
	return getCookie("userID");
}

function getGameId() {
	return getCookie("gameID");
}

function getPlayers(users,model,rowCount,columnCount) {
	let players = [];
	if (users == null || users == undefined) {
		players.push(new Player("0",0,2,2));
		players.setIndex(0);
		return players;
	}
	for(let user of users) {
		let id = user[0];
		let roomNum = user[1];
		let positionX = Math.floor(roomNum / columnCount);
		 // user[1][0];
		let positionY = roomNum % columnCount;// user[1][1];
		players.push(new Player("" + id,id,positionX,positionY));
	}



	let temp;
	let num = players.length;
	for(let i = 0;i < players.length - 1;++i) {
		for(let j = i + 1;j < players.length;++j) {
			if (players[i].id > players[j].id) {
				let temp = players[i];
				players[i] = players[j];
				players[j] = temp;
			}
		}
	}
	for(let i = 0;i < players.length;++i) {
		players[i].setIndex(i);
		players[i].setModel(model.clone());
	}
	return players;
}



let bgm = document.createElement("audio");
bgm.src = music;
bgm.autoplay = true;
bgm.play();

let dirx = [-1,1,0,0];
let diry = [0,0,-1,1];

let randomMove = true;
let rowCount = 4,columnCount = 4,worldWidth = 0,worldHeight = 0,roomModel = [[0,0,1,1],[1,2,1,3],[3,2,1,0],[0,1,2,3]];
let currentPlayerId,currentPlayer,currentPlayerIndex;
let gameId;
let socket;
let players;
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

let currentPlayerModel = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 1), new THREE.MeshPhongMaterial({ color:0xffffff }));
let otherPlayerModel = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 1), new THREE.MeshPhongMaterial({ color:0xffffff }));
// let objloader = new THREE.ObjectLoader();
// let onProgress = function ( xhr ) {
				
// };
// let onError = function ( xhr ) { };
// objloader.setTexturePath(player1_tex);
// objloader.load(player1_model,function( object ) {
					
//         //         if(child instanceof THREE.Mesh) {
//         //             su.craft = new Craft(num,"ball",craftPic[num],child,true);
//         //      // su.craft = object;
//         //              su.craft.model.scale.set(0.01,0.01,0.01);
//         //       //su.craft = new THREE.Mesh(geo,material);
//         //              su.craft.model.position.x = su.origin.x + ROOM_SIZE / 2;
//         //              su.craft.model.position.z = su.origin.z + ROOM_SIZE / 2;
//         //              su.craft.model.position.y = 1;
//         //              su.craft.model.craft = su.craft;
//         //              control.setCraft(su.craft);
//         //       //scene.add(su.craft.model);
//         //              console.log("addi n");
//         //         }
// 	//currentPlayerModel=object;
// 	object.traverse(function(child) {
//         if(child instanceof THREE.Mesh) {
//         	otherPlayerModel = child;
//         	otherPlayerModel.scale.set(0.3,0.3,0.3);
//         	otherPlayerModel.position.y = 3;
//         	otherPlayerModel.ro
//         }
//     });
// }, onProgress, onError );

// let objloader = new THREE.ObjectLoader();
// let onProgress = function ( xhr ) {
				
// };
// let onError = function ( xhr ) { };
// objloader.setTexturePath(player1_tex);
// objloader.load(player1_model,function( object ) {
						
// 	//currentPlayerModel=object;
// 	object.traverse(function(child) {
//         if(child instanceof THREE.Mesh) {
//         	currentPlayerModel = child;
//         	console.log(currentPlayerModel);
//         }
//     });
// }, onProgress, onError );





//currentPlayerModel.visible = false;

// make sky
let sky = new THREE.Mesh(new THREE.SphereGeometry(1000, 100, 10), skyMaterial);
sky.position.set(worldWidth / 2, 0, worldHeight / 2);
scene.add(sky);

// light up
let ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);
let hemisphereLight = new THREE.HemisphereLight(0x444444, 0x444444, 1);
scene.add(hemisphereLight);
loadWarningFinish[0].innerHTML = "☑";
animate();
render();


let loadingPic = document.createElement("img");
loadingPic.src = ui_loading;
loadingPic.className = "ui_loading";
loadingPic.width = window.innerWidth;
loadingPic.height = window.innerHeight;
document.body.appendChild(loadingPic);
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
});

socket = io.connect(baseURL);




setTimeout(() => {
	init()}, 2000);

function init() {
	


	kineticControl = new KineticControl(renderer.domElement);
	gameController = new GameControl(gameId,currentPlayerId,scene,camera,kineticControl,0,socket);
	kineticControl.control = gameController;
	kineticControl.setCamera(camera);
	
	currentPlayerId = getPlayerId();
	gameId = getGameId();
	console.log(currentPlayerId + " " + gameId);

	
	socket.on("moved",function(userID,position) {
		if (userID != currentPlayerId) {
			for(let p of players) {
				if (p.id == userID) {
					p.move(camera,position[0],position[1],position[2]);
				}
			}
		}
	});
	socket.on("all are ready",function(hint) {
		for(let i = 0;i < loadWarningText.length;++i) {
			$(loadWarningFinish[i]).fadeOut(1000);
			$(loadWarning[i]).fadeOut(1000);
		}
		$(loadingPic).fadeIn(1500, function() {
			
			function callFn() {
				begin(hint,0);
				$(loadingPic).fadeOut(1500,function () {
					document.body.removeChild(loadingPic);
					
				});
			}
			setTimeout(() => callFn(),3000);

		});
	});
	socket.on("game info",function(users,mapLength,mapWidth,matrix) {
		console.log("infoinfoinfo");
		console.log("row:" + mapLength + " column:" + mapWidth);
		rowCount = mapLength;
		columnCount = mapWidth;
		worldWidth = ROOM_SIZE * columnCount;
		worldHeight = ROOM_SIZE * rowCount;
		roomModel = matrix;
		players = getPlayers(users,otherPlayerModel,rowCount,columnCount);
		console.log(users);
		console.log(players);
		let callCreateRoom = function() {
			let re = gameController.createRooms(rowCount,columnCount,roomModel);
			rooms = re[0];
		 	doors = re[1];
		 	walls = re[2];
		 	for(let room of rooms) {
				room.craft = new Craft(ROOM_ID,"room",floorTextureImage,room.floor,false);	
			}
			let dId = 0;
			for(let door of doors) {
				door.setID(dId);
				if((door.row == 0 && door.direction == 0) || (door.row == rowCount - 1 && door.direction == 1) || (door.column == 0 && door.direction == 2) || (door.row == columnCount - 1 && door.direction == 3)) {
					door.enable = false;
				}
				door.model.craft = new Craft(DOOR_ID,"door",doorTextureImage,door,false);
				door.model.craft.setDoor(door);
				++dId;
				kineticControl.addCollision(door.model);
			}
			for(let wall of walls) {
				wall.craft = new Craft(WALL_ID,"wall",wallTextureImage,wall,false);
				kineticControl.addCollision(wall);
			}
		 	loadWarningFinish[3].innerHTML = "☑";
		 	testForFinish();
		}

		let callCreatePlayers = function() {
			for(let i in players) {
				if(players[i].id == currentPlayerId) {
					currentPlayer = players[i];
					currentPlayer.setModel(currentPlayerModel);
					currentPlayer.isLocal = true;
					currentPlayer.model.visible = false;
					currentPlayerIndex = i;
					break;
				}
			}
			gameController.setPlayers(currentPlayer,players);
			kineticControl.setPlayer(currentPlayer);
			let re = gameController.createPlayers(players);
			loadWarningFinish[2].innerHTML = "☑";
			console.log("createPlayers done!");
			testForFinish();
		
		}
		callCreateRoom();
		callCreatePlayers();
	});
	socket.emit("join",currentPlayerId,gameId);
	loadWarningFinish[1].innerHTML = "☑";
	testForFinish();
}

function begin(hint,turn) {
	kineticControl.regist();
	randomMove = false;
	gameController.createBasicUI();
	setTimeout(() => gameController.preGaming(20,hint,turn),5000);
}

function testForFinish() {
	let i;
	for(i = 0;i < loadWarningText.length - 1;++i) {
		if (loadWarningFinish[i].innerHTML != "☑") break;
	}
	if( i >= loadWarningText.length - 1 ) {
		loadWarningFinish[loadWarningText.length - 1].innerHTML = "☑";
		let tag = [];
		for(let i = 0;i < rowCount;++i) {
			tag[i] = [];
			for(let j = 0;j < columnCount;++j) {
				tag[i][j] = false;
			}
		}
		let texts = getConnectionCraft(currentPlayer.roomX,currentPlayer.roomY,tag);
		socket.emit("ready",texts);
		//begin();
	}
}

function getConnectionCraft(x,y,tag) {
	if(tag[x][y]) return [];
	tag[x][y] = true;
	let room = getRoomAt(rooms,x,y);
	let itsdoors = room.doors;
	let texts = room.getRoomCraft();
	for(let i = 0;i < 4;++i) {
		let nx = x + dirx[i];
		let ny = y + diry[i];
		if (nx >= 0 && nx < rowCount && ny >= 0 && ny < columnCount) {
			if (itsdoors[i].open) {
				texts = texts.concat(getConnectionCraft(nx,ny,tag));
			}
		}
	}
	return texts;
}



function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();
    if(!randomMove) {
    	kineticControl.action(delta);
    	let f = currentPlayer.move(camera,0,0,0);
    	if(f) socket.emit("move",[currentPlayer.model.position.x,currentPlayer.model.position.y,currentPlayer.model.position.z]);
    }
   // if(randomMove) cameraRandomMove(camera);
    render();
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
function getRoomAt(rooms,row, column) {
    return rooms[row * columnCount + column];
}
