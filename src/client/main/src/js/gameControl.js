import * as THREE from "three";
import { Craft } from "../js/craft";
import { FakeNet } from "../js/fakeNet";
import { WALL_SIZE, ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS, Room } from "./room";
import { Player } from "./player";
import { DOOR_SIZE, Door } from "./door";


import ui_hint_normal from "../ui/hint-normal.png";
import ui_hint_hover from "../ui/hint-hover.png";
import ui_hint_paper from "../ui/hint-paper.png";
import ui_voteInv from "../ui/voteInv.png";
import ui_voteCraft_null from "../ui/voteCraft-null.png";
import ui_key_normal from "../ui/key-normal.png";
import ui_key_exist from "../ui/key-exist.png";



let defaultVoteCraft = new Craft(0,"default",ui_voteCraft_null,null);
let otherVoteCraft = new Craft(1,"another",ui_hint_hover,null);


export class GameControl {
	constructor(gameId,playerId,scene,camera,kineticControl,index) {
		this.index = index;
		this.gameId = gameId;
		this.playerId = playerId;
		this.rooms = [];
		this.doors = [];
		this.walls = [];
		this.crafts = [];
		this.camera = camera;
		this.scene = scene;
		this.kineticControl = kineticControl;
		this.netInstance = new FakeNet(1,0);
	}

	setPlayers(currentPlayer,players) {
		this.currentPlayer = currentPlayer;
		this.players = players;
		this.num = players.length;
	}

	
	gameCounter() {
		let timer = setInterval(() => {
			if (this.netInstance.allPlayersReady()) {
				clearInterval(timer);
				this.preGaming(3);
			}
		},100);
	}
	
	createPlayers(players) {
		for(let x of players) {
			x.model.position.set(5,0,5);
			this.scene.add(x.model);
			console.log("ok");
		}
	}


	setCraft(craft) {
		this.crafts.push(craft);
		this.scene.add(craft.model);
		this.kineticControl.addCollision(craft.model);
		console.log(craft.model);

	}

	createRooms(rowCount,columnCount,roomModel) {
		function getRoomAt(rooms,row, column) {
    		return rooms[row * columnCount + column];
		}
		for (let row = 0; row < rowCount; row++) {
	        for (let column = 0; column < columnCount; column++) {
	            // reuse existed wall
	            let northWallOne = row === 0 ? null : getRoomAt(this.rooms,row - 1, column).walls[1];
	            let westWallOne = column === 0 ? null : getRoomAt(this.rooms,row, column - 1).walls[3];
	            let northWallTwo = row === 0 ? null : getRoomAt(this.rooms,row - 1, column).walls[5];
	            let westWallTwo = column === 0 ? null : getRoomAt(this.rooms,row, column - 1).walls[7];
	            let northDoor = row === 0 ? null : getRoomAt(this.rooms,row - 1,column).doors[1];
	            let westDoor = column ===0 ? null : getRoomAt(this.rooms,row,column - 1).doors[3]; 
	            
	            // add room
	            let room = new Room(this,row, column, [northWallOne, null, westWallOne, null,northWallTwo,null,westWallTwo,null], [northDoor, null, westDoor, null], roomModel,rowCount,columnCount);
	            this.rooms.push(room);
	            // add floor
	            this.scene.add(room.floor);
	          // 	this.scene.add(room.craft);
	            // add doors
	            for (let i = 0;i < 4;++i) {
	            	if( (i === 0 && row !== 0) || (i === 2 && column !== 0)) continue;
	            	let door = room.doors[i];
	            	//kineticControl.addCollision(door.model);
	        		//door.model.isDoor = true;
	            	this.doors.push(door);
	            	this.scene.add(door.model);
	            }
	            // add walls
	            for (let i = 0; i < 8; i++) {
	                if ((i === 0 && row !== 0) || (i === 2 && column !== 0) || (i === 4 && row !== 0) || (i === 6 && column !== 0)) continue;
	                let wall = room.walls[i];
	              //  wall.isDoor = false;
	              //  kineticControl.addCollision(wall);
	              	this.walls.push(wall);
	                this.scene.add(wall);
	            }
	        }
	    }
	    let re = [this.rooms,this.doors,this.walls];
	    return re;
	}
	createBasicUI() {
		let ui_hint_image = document.createElement("img");
		ui_hint_image.src = ui_hint_normal;
		ui_hint_image.height = 100;
		ui_hint_image.width = 100;
		document.body.appendChild(ui_hint_image);
		ui_hint_image.id = "ui_hint_image";

		let ui_hint_paper_image = document.createElement("img");
		ui_hint_paper_image.src = ui_hint_paper;
		ui_hint_paper_image.height = window.innerHeight;
		ui_hint_paper_image.width = window.innerWidth;
		document.body.appendChild(ui_hint_paper_image);
		ui_hint_paper_image.style.display = "none";
		ui_hint_paper_image.id = "ui_hint_paper";

		let ui_key_image = document.createElement("img");
		ui_key_image.className = "ui_key";
		ui_key_image.height = 100;
		ui_key_image.width = 100;
		ui_key_image.src = ui_key_normal;
		document.body.appendChild(ui_key_image);

		ui_key_image.addEventListener("click", () => {
			if(this.currentPlayer.keyNum > 0) 
				this.currentPlayer.isKeyCondition = true;
			else 
				console.log("you don't have any key");

		});

		ui_hint_paper_image.addEventListener("click", () => {
		 	ui_hint_image.src = ui_hint_normal;
		 	ui_hint_paper_image.style.display = "none";
		 	this.hintContent.style.display = "none";

		});
		ui_hint_image.addEventListener("click",() => {
			ui_hint_image.src = ui_hint_hover;
			ui_hint_paper_image.style.display = "block";
			this.showHint();
		});

		let ui_voteInv_image = [];
		let initPosWidth = window.innerWidth / 2 - 60 * this.num;
		for(let i = 0;i < this.num;i++) {
			ui_voteInv_image[i] = document.createElement("img");
			ui_voteInv_image[i].src = ui_voteInv;
			ui_voteInv_image[i].height = 120;
			ui_voteInv_image[i].width = 120;
			ui_voteInv_image[i].className = "ui_voteInv";
			let j = initPosWidth + i * 120;
			ui_voteInv_image[i].style.left = j.toString() + "px";
			document.body.appendChild(ui_voteInv_image[i]);
			ui_voteInv_image[i].style.display = "none";
		}
		let ui_voteCraft = [];
		for(let i = 0;i < this.num;i++) {
			ui_voteCraft[i] = defaultVoteCraft.clone();
		}
		let ui_voteCraft_image = [];
		for(let i = 0;i < this.num;i++) {
			ui_voteCraft_image[i] = document.createElement("img");
			ui_voteCraft_image[i].src = ui_voteCraft[i].picture;
			ui_voteCraft_image[i].height = 120;
			ui_voteCraft_image[i].width = 120;
			ui_voteCraft_image[i].className = "ui_voteInv";
			let j = initPosWidth + i * 120;
			ui_voteCraft_image[i].style.left = j.toString() + "px";
			document.body.appendChild(ui_voteCraft_image[i]);
			ui_voteCraft_image[i].style.display = "none";
		}
		let ui_voteNum = [];
		for(let i = 0; i < this.num;++i) {
			ui_voteNum[i] = 0;
		}


		this.hintContent = document.createElement("div");
		this.hintContent.className = "ui_hint";
		this.hintContent.style.fontSize = "40px";
		this.hintContent.style.color = "black";
		this.hintContent.style.top = "400px";
		this.hintContent.style.display = "none";
		document.body.appendChild(this.hintContent);

		this.ui_voteCraft_image = ui_voteCraft_image;
		this.ui_hint_image = ui_hint_image;
		this.ui_hint_paper_image = ui_hint_paper_image;
		this.ui_voteInv_image = ui_voteInv_image;
		this.ui_voteNum = ui_voteNum;
		this.ui_voteCraft = ui_voteCraft;
		this.ui_key_image = ui_key_image;
	}

	changeVote(index,craft) {
		console.log(index,craft);
		this.ui_voteCraft_image[index].src = craft.picture;

	}

	preGaming(timeCount) {
		
		let timecounter = document.createElement("div");
		timecounter.className = "ui_warning";
		timecounter.style.fontSize = "100px";
		timecounter.style.color = "white";
		document.body.appendChild(timecounter);
		let timer = setInterval(() => this.preGamingCounter(timer,timeCount--,timecounter),1000);
	}

	preGamingCounter(t,timeCount,timecounter) {
		//console.log(timeCount);
		if(timeCount == 0) {
			timecounter.innerHTML = "<br>GameStart"; 
			let timer = setTimeout(() => { 
				timecounter.style.display = "none";
				document.body.removeChild(timecounter);
				this.start();
				clearTimeout(timer);
				}, 1000);
			clearInterval(t);
		}
		else {
			timecounter.innerHTML = "Ready For It" + "<br>" + (timeCount);
		}
	}

	showHint() {
		let pos;
		for(let i = 0;i < this.players.length;++i) {
			if (this.currentPlayer == this.players[i]) {
				pos = i;
				break;
			}
		}
		let hintText = pos < this.players.length ? this.hints[pos] : "error";
		this.hintContent.innerHTML = hintText;
		this.hintContent.style.display = "block";
	}


	beginVote(voteTime) {
		this.currentPlayer.isVoteCondition = true;
		for (let image of this.ui_voteInv_image) {
			image.style.display = "block";
		}
		for (let craft of this.ui_voteCraft_image) {
			craft.style.display = "block";
		}
		let voteWarning = document.createElement("div");
		voteWarning.className = "ui_warning";
		voteWarning.style.fontSize = "100px";
		voteWarning.style.color = "white";
		voteWarning.style.top = "150px";
		//selectWarning.innerHTML = "<br>The No." + (this.selectedPlayer + 1) + " Player has received a hint";
		document.body.appendChild(voteWarning);
		let timer = setInterval(() => {
			if(voteTime == 0) {
				clearInterval(timer);
				voteWarning.style.display = "none";
				document.body.removeChild(voteWarning);
				this.endVote();
			}
			else
				voteWarning.innerHTML = "Vote Time Left<br>" + (voteTime--);
		},1000);
	}

	endVote() {
		this.currentPlayer.isVoteCondition = false;
		let id = this.netInstance.getMaxVotedCraft();
		let votedCraft = this.ui_voteCraft[id];
		let answer = defaultVoteCraft;
		let voteWarning = document.createElement("div");
		voteWarning.className = "ui_warning";
		voteWarning.style.fontSize = "100px";
		voteWarning.style.color = "white";
		voteWarning.style.top = "150px";
		voteWarning.innerHTML = "The No." + (id + 1) + " Craft got the highest vote";
		document.body.appendChild(voteWarning);
		let timer = setTimeout(() => {
			voteWarning.style.display = "none";
			document.body.removeChild(voteWarning);
			console.log(answer);
			console.log(votedCraft);
			console.log(answer == votedCraft);
			for (let image of this.ui_voteInv_image) {
				image.style.display = "none";
			}
			for (let craft of this.ui_voteCraft_image) {
				craft.style.display = "none";
			}
			if (answer.picture == votedCraft.picture) {
				this.turnWin(id);
			} 
			else {
				this.turnLose(id);
			}
			clearTimeout(timer);
		},2000);
		
		
	}

	turnLose(playId) {
		let turnWarning = document.createElement("div");
		turnWarning.className = "ui_warning";
		turnWarning.style.fontSize = "100px";
		turnWarning.style.color = "white";
		turnWarning.style.top = "150px";
		turnWarning.innerHTML = "Sorry This Turn Lose!";
		document.body.appendChild(turnWarning);
		let timer = setTimeout(() => {
			turnWarning.style.display = "none";
			document.body.removeChild(turnWarning);
			// kick one person and lock one door
			this.preGaming(10);
				clearTimeout(timer);
		},2000);
	}

	turnWin(playId) {
		this.players[playId].keyNum++;
		if (this.currentPlayer.keyNum > 0) {
			this.ui_key_image.src = ui_key_exist;
		}
		else {
			this.ui_key_image.src = ui_key_normal;
		}
		let turnWarning = document.createElement("div");
		turnWarning.className = "ui_warning";
		turnWarning.style.fontSize = "100px";
		turnWarning.style.color = "white";
		turnWarning.style.top = "150px";
		turnWarning.innerHTML = "Okay This Turn Win!";
		document.body.appendChild(turnWarning);
		let timer = setTimeout(() => {
			turnWarning.style.display = "none";
			document.body.removeChild(turnWarning);
			// get an key
			this.preGaming(10);
			clearTimeout(timer);
		},2000);
		
	}

	start() {
		this.selectedPlayer = this.netInstance.getSelectedPlayer();
		let selectWarning = document.createElement("div");
		selectWarning.className = "ui_warning";
		selectWarning.style.fontSize = "100px";
		selectWarning.style.color = "white";
		//selectWarning.innerHTML = "<br>The No." + (this.selectedPlayer + 1) + " Player has received a hint";
		selectWarning.innerHTML = "Hint has been received";
		selectWarning.style.top = "150px";
		document.body.appendChild(selectWarning);
		let timer = setTimeout(() => { 
			selectWarning.innerHTML = "";
			selectWarning.style.display = "none";
			document.body.removeChild(selectWarning);
			this.beginVote(10);
			clearTimeout(timer);
		}, 2000);
		this.hints = [];
		for(let i = 0;i < this.players.length;++i) {
			//if(i == this.selectedPlayer) {
			this.hints[i] = this.netInstance.getHint();
			//}
			//else  {
			//	this.hints[i] = "现在暂时没有线索噢~";
		//	}
		}
		//if (this.currentPlayer == this.players[this.selectedPlayer]) {
		this.ui_hint_image.src = ui_hint_hover;
		//}
		
		

	}

}
