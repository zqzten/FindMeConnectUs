import * as THREE from "three";
import { Craft } from "./craft";
import { WALL_SIZE, ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS, Room } from "./room";
import { Player } from "./player";
import { DOOR_SIZE, Door } from "./door";
import $ from "jquery";

import ui_hint_normal from "../../static/img/hint-normal.png";
import ui_hint_hover from "../../static/img/hint-hover.png";
import ui_hint_paper from "../../static/img/hint-paper.png";
import ui_voteInv from "../../static/img/voteInv.png";
import ui_voteCraft_null from "../../static/img/voteCraft-null.png";
import ui_key_normal from "../../static/img/key-normal.png";
import ui_key_exist from "../../static/img/key-exist.png";
import ui_voteInv_Choose from "../../static/img/voteChoose.png";
import ui_sound from "../../static/img/sound.png";

let craftAddr = [];
import craftAddr0 from "../../static/models/model/1/1.png";craftAddr.push(craftAddr0);
import craftAddr1 from "../../static/models/model/2/2.png";craftAddr.push(craftAddr1);
import craftAddr2 from "../../static/models/model/3/3.png";craftAddr.push(craftAddr2);
import craftAddr3 from "../../static/models/model/4/4.png";craftAddr.push(craftAddr3);
import craftAddr4 from "../../static/models/model/5/5.png";craftAddr.push(craftAddr4);
import craftAddr5 from "../../static/models/model/6/6.png";craftAddr.push(craftAddr5);
import craftAddr6 from "../../static/models/model/7/7.png";craftAddr.push(craftAddr6);
import craftAddr7 from "../../static/models/model/8/8.png";craftAddr.push(craftAddr7);
import craftAddr8 from "../../static/models/model/9/9.png";craftAddr.push(craftAddr8);
import craftAddr9 from "../../static/models/model/10/10.png";craftAddr.push(craftAddr9);
import craftAddr10 from "../../static/models/model/11/11.png";craftAddr.push(craftAddr10);
import craftAddr11 from "../../static/models/model/12/12.png";craftAddr.push(craftAddr11);
import craftAddr12 from "../../static/models/model/13/13.png";craftAddr.push(craftAddr12);
import craftAddr13 from "../../static/models/model/14/14.png";craftAddr.push(craftAddr13);
import craftAddr14 from "../../static/models/model/15/15.png";craftAddr.push(craftAddr14);
import craftAddr15 from "../../static/models/model/16/16.png";craftAddr.push(craftAddr15);
import craftAddr16 from "../../static/models/model/17/17.png";craftAddr.push(craftAddr16);
import craftAddr17 from "../../static/models/model/18/18.png";craftAddr.push(craftAddr17);
import craftAddr18 from "../../static/models/model/19/19.png";craftAddr.push(craftAddr18);
import craftAddr19 from "../../static/models/model/20/20.png";craftAddr.push(craftAddr19);
import craftAddr20 from "../../static/models/model/21/21.png";craftAddr.push(craftAddr20);
import craftAddr21 from "../../static/models/model/22/22.png";craftAddr.push(craftAddr21);
import craftAddr22 from "../../static/models/model/23/23.png";craftAddr.push(craftAddr22);
import craftAddr23 from "../../static/models/model/24/24.png";craftAddr.push(craftAddr23);
import craftAddr24 from "../../static/models/model/25/25.png";craftAddr.push(craftAddr24);
import craftAddr25 from "../../static/models/model/26/26.png";craftAddr.push(craftAddr25);
import craftAddr26 from "../../static/models/model/27/27.png";craftAddr.push(craftAddr26);
import craftAddr27 from "../../static/models/model/28/28.png";craftAddr.push(craftAddr27);
import craftAddr28 from "../../static/models/model/29/29.png";craftAddr.push(craftAddr28);
import craftAddr29 from "../../static/models/model/30/30.png";craftAddr.push(craftAddr29);
import craftAddr30 from "../../static/models/model/31/31.png";craftAddr.push(craftAddr30);
import craftAddr31 from "../../static/models/model/32/32.png";craftAddr.push(craftAddr31);
import craftAddr32 from "../../static/models/model/33/33.png";craftAddr.push(craftAddr32);
import craftAddr33 from "../../static/models/model/34/34.png";craftAddr.push(craftAddr33);
import craftAddr34 from "../../static/models/model/35/35.png";craftAddr.push(craftAddr34);
import craftAddr35 from "../../static/models/model/36/36.png";craftAddr.push(craftAddr35);
import craftAddr36 from "../../static/models/model/37/37.png";craftAddr.push(craftAddr36);
import craftAddr37 from "../../static/models/model/38/38.png";craftAddr.push(craftAddr37);
import craftAddr38 from "../../static/models/model/39/39.png";craftAddr.push(craftAddr38);
import craftAddr39 from "../../static/models/model/40/40.png";craftAddr.push(craftAddr39);
import craftAddr40 from "../../static/models/model/41/41.png";craftAddr.push(craftAddr40);


let soundfx = [];
import soundfx0 from "../../static/audio/voice/0.mp3";soundfx.push(soundfx0);
import soundfx1 from "../../static/audio/voice/1.mp3";soundfx.push(soundfx1);
import soundfx2 from "../../static/audio/voice/2.mp3";soundfx.push(soundfx2);
import soundfx3 from "../../static/audio/voice/3.mp3";soundfx.push(soundfx3);
import soundfx4 from "../../static/audio/voice/4.mp3";soundfx.push(soundfx4);
import soundfx5 from "../../static/audio/voice/5.mp3";soundfx.push(soundfx5);
import soundfx6 from "../../static/audio/voice/6.mp3";soundfx.push(soundfx6);
import soundfx7 from "../../static/audio/voice/7.mp3";soundfx.push(soundfx7);
import soundfx8 from "../../static/audio/voice/8.mp3";soundfx.push(soundfx8);
import soundfx9 from "../../static/audio/voice/9.mp3";soundfx.push(soundfx9);
import soundfx10 from "../../static/audio/voice/10.mp3";soundfx.push(soundfx10);
import soundfx11 from "../../static/audio/voice/11.mp3";soundfx.push(soundfx11);


let dirx = [-1,1,0,0];
let diry = [0,0,-1,1];

let craftName = [];
let hints = [];
craftName[0] = "斧子";hints[0] = "可以砍树的工具";
craftName[1] = "扳手";hints[1] = "汽车修理工常用工具";craftName[2] = "书本";hints[2] = "只有到期末才看一看的东西";
craftName[3] = "老板椅";hints[3] = "可以旋转的椅子";craftName[4] = "茶杯";hints[4] = "可以喝茶的容器";
craftName[5] = "耳机";hints[5] = "BEATS";craftName[6] = "足球";hints[6] = "中国和巴西的最大差距";
craftName[7] = "剃须刀";hints[7] = "男人专属物品";craftName[8] = "医疗箱";hints[8] = "救命箱子";
craftName[9] = "棒槌";hints[9] = "可以锤爆两个头的工具";craftName[10] = "音响";hints[10] = "动次打次";
craftName[11] = "玫瑰";hints[11] = "带刺的花朵";craftName[12] = "三星手机";hints[12] = "可以替代C4的电子产品";
craftName[13] = "宝剑";hints[13] = "盖伦的武器";craftName[14] = "信用卡";hints[14] = "银行和POS机";
craftName[15] = "游戏机";hints[15] = "任天堂";craftName[16] = "课桌";hints[16] = "就明确告诉你，是个课桌，你都不一定找得到";
craftName[17] = "女装";hints[17] = "顶级程序员必备";craftName[18] = "圆桌";hints[18] = "三条腿，没法跑";
craftName[19] = "羽毛拍";hints[19] = "林丹";craftName[20] = "applewatch";hints[20] = "计时工具";
craftName[21] = "黑沙发";hints[21] = "黑色，休息";craftName[22] = "木桶";hints[22] = "一个可以装很多酒的容器";
craftName[23] = "网球";hints[23] = "越前龙马";craftName[24] = "代码";hints[24] = "我们吃饭的家伙";
craftName[25] = "喷火龙";hints[25] = "神奇宝贝";craftName[26] = "锅";hints[26] = "总得有人背一下的东西";
craftName[27] = "香烟";hints[27] = "有害健康";craftName[28] = "男装";hints[28] = "海澜之家";
craftName[29] = "柜子";hints[29] = "藏钱的地方";craftName[30] = "灭火器";hints[30] = "消消火";
craftName[31] = "坦克";hints[31] = "我们的军队保持了最大程度的克制";craftName[32] = "收音机";hints[32] = "英语考试必备";
craftName[33] = "狮子";hints[33] = "辛巴";craftName[34] = "马里奥";hints[34] = "水管工";
craftName[35] = "索尼克";hints[35] = "世界上速度最快的刺猬";craftName[36] = "飞机";hints[36] = "航母的儿子";
craftName[37] = "白沙发";hints[37] = "白色，休息";craftName[38] = "抽水马桶";hints[38] = "最适合玩手机的地方";
craftName[39] = "三轮车";hints[39] = "三条腿，跑得快";craftName[40] = "茶壶";hints[40] = "泡茶工具";




let defaultVoteCraft = new Craft(0,"default",ui_voteCraft_null,null);
let otherVoteCraft = new Craft(1,"another",ui_hint_hover,null);


export class GameControl {
	constructor(gameId,playerId,scene,camera,kineticControl,index,socket) {
		this.socket = socket;
		this.index = index;
		this.gameId = gameId;
		this.playerId = playerId;
		this.rooms = [];
		this.doors = [];
		this.walls = [];
		this.crafts = [];
		this.camera = camera;
		this.hint = "";
		this.scene = scene;
		this.kineticControl = kineticControl;
		this.isHintTime = false;
		this.over = false;
		let self = this;
		this.zuse = false;
		this.rowCount = 4;
		this.columnCount = 4;
		this.socket.on("sound played",function(userID,soundID) {
			if(self.rowCount == undefined) return;
			let rowCount = self.rowCount;
			let columnCount = self.columnCount;
			function getPlayerPosition(getPlayer) {
				let x = getPlayer.model.position.x;
				let z = getPlayer.model.position.z;
				let row = Math.floor(z / ROOM_SIZE);
				let column = Math.floor(x / ROOM_SIZE);
				if(row > rowCount) row = rowCount;
				if(column > columnCount) column = columnCount;
				return [row,column];
			}
			if(self.currentPlayer != null && self.currentPlayer != undefined) {
				let index = 0;
				for(let i in self.players) {
					if(self.players[i].id == userID) {
						let index = i;break;
					}
				}
				let x1 = getPlayerPosition(self.players[index]);
				let x2 = getPlayerPosition(self.currentPlayer);
				if(x1[0] == x2[0] && x1[1] == x2[1]) {
					let sound = document.createElement("audio");
					sound.src = soundfx[soundID];
					sound.play();
				}
			}
		});
		this.socket.on("vote model changed",function(userID,newModelName,oldModelName) {
			if (userID != self.currentPlayer.id)  { 
				console.log("i am here in changed model " + oldModelName + " " + newModelName);
				self.changeInv(oldModelName,newModelName,false,userID);
			}
		});
		this.socket.on("next round",function(votes,hint,success,lockedDoor,outUser) {
			
			
			if(!self.zuse){
				self.zuse = true;
				console.log(votes);
				console.log(hint);
				console.log(success);
				console.log("lock " + lockedDoor);
				console.log("out " + outUser);
				self.hint = hint;
				if(success) {
					console.log("victory");
					self.turnWin();
				}
				else {
					console.log("lose");
					self.turnLose(lockedDoor,outUser);
				}


			}
		});
		this.socket.on("unlocked",function(doorID) {
			console.log(doorID);
			let fObj = self.doors[doorID].model;
			self.doors[doorID].openIt();
			let timer = setInterval( () => self.openTheDoor(timer,fObj),25);
			let qqq = self.checkVictory(self.doors[doorID].row,self.doors[doorID].column);
			console.log("unlock and game is " + qqq);
			if(qqq) {
				self.currentPlayer.setOut();
				//if(!self.currentPlayer.isOut) {
				self.socket.emit("game over",true,self.currentPlayer.score);
				//}
			}
		});
		this.socket.on("game is over",function(scores) {
			self.over = true;
			self.showNote("game is over");
			for(let score of scores) { 
				console.log("" + score[0] + " " + score[1]);
			}
			//setTimeout(history.go(-1),3000);
			self.gameOver("Game Over");
		});

	}

	gameOver(str) {

	}

	openTheDoor(timer,obj) {
        obj.position.y -= 0.5;
        if(obj.position.y <= -WALL_HEIGHT * 1.5) {
            clearInterval(timer);
        }
    }

    lockTheDoor(timer,obj) {
        obj.position.y += 0.5;
        if(obj.position.y >= WALL_HEIGHT * 0.5) {
            clearInterval(timer);
        }
    }

	setPlayers(currentPlayer,players) {
		this.currentPlayer = currentPlayer;
		this.players = players;
		this.num = players.length;
	}
	
	createPlayers(players) {
		let row,column;
		let origin;
		for(let x of players) {
			row = x.roomX;
			column = x.roomY;
			origin = new THREE.Vector3(column * ROOM_SIZE, 0, row * ROOM_SIZE);
			x.model.position.set(origin.x + ROOM_SIZE / 2,0,origin.z + ROOM_SIZE / 2);
			this.scene.add(x.model);
		}
	}


	setCraft(craft) {
		this.crafts.push(craft);
		this.scene.add(craft.model);
		this.kineticControl.addCollision(craft.model);

	}

	createRooms(rowCount,columnCount,roomModel) {
		this.rowCount = rowCount;
		this.columnCount = columnCount;
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

	showNote(str) {
		this.ui_leftNote.innerHTML = str;
		$(this.ui_leftNote).fadeIn(1000);
		setTimeout(() => {
			$(this.ui_leftNote).fadeOut(1000);
		},5000);
	}
	createBasicUI() {
		let ui_leftNote = document.createElement("div");
		ui_leftNote = document.createElement("div");
		ui_leftNote.className = "ui_note";
		ui_leftNote.style.fontSize = "40px";
		ui_leftNote.style.color = "white";
		//ui_leftNote.style.top = "400px";
		ui_leftNote.style.display = "none";
		document.body.appendChild(ui_leftNote);

		let ui_hint_image = document.createElement("img");
		ui_hint_image.src = ui_hint_normal;
		ui_hint_image.height = 100;
		ui_hint_image.width = 100;
		ui_hint_image.id = "ui_hint_image";
		ui_hint_image.style.marginTop = "" + window.innerHeight/window.innerWidth * 72 + "%";
		document.body.appendChild(ui_hint_image);

		let ui_sound_image = document.createElement("img");
		ui_sound_image.src = ui_sound;
		ui_sound_image.height = 100;
		ui_sound_image.width = 100;
		ui_sound_image.className = "ui_key";
		ui_sound_image.style.marginTop = "" + window.innerHeight/window.innerWidth * 80 + "%";
		document.body.appendChild(ui_sound_image);
		ui_sound_image.addEventListener("click", () => {
			if(this.currentPlayer) {
				this.socket.emit("play sound");
			}
		});

		
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
		ui_key_image.style.marginTop = "" + window.innerHeight/window.innerWidth * 88 + "%";
		document.body.appendChild(ui_key_image);


		ui_key_image.addEventListener("click", () => {
			if(this.currentPlayer.keyNum > 0) {
				this.showNote("你选择了一把钥匙,还剩" + (this.currentPlayer.keyNum - 1) + "把钥匙");
				this.currentPlayer.isKeyCondition = true;
			}
			else { 
				this.showNote("你并没有钥匙");
			}
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
			ui_voteCraft_image[i].className = "ui_voteCraft";
			let j = initPosWidth + i * 120;
			ui_voteCraft_image[i].style.left = j.toString() + "px";
			document.body.appendChild(ui_voteCraft_image[i]);
			ui_voteCraft_image[i].style.display = "none";
			let q = ui_voteCraft[i];
			console.log("finish " + i);
			ui_voteCraft_image[i].addEventListener("click", () => {
				//console.log(q);
				console.log(this.ui_voteCraft[i]);
				this.changeVote(this.ui_voteCraft[i].name);
			});
		}
		let ui_voteNum = [];
		for(let i = 0; i < this.num;++i) {
			ui_voteNum[i] = 0;
		}

		let ui_voteChoose_Image;
		ui_voteChoose_Image = document.createElement("img");
		ui_voteChoose_Image.src = ui_voteInv_Choose;
		ui_voteChoose_Image.height = 120;
		ui_voteChoose_Image.width = 120;
		ui_voteChoose_Image.className = "ui_voteChoose";

		for(let i in this.players) {
			if (this.players[i].id == this.currentPlayer.id) {
				let j = initPosWidth + i * 120;
				ui_voteChoose_Image.style.left = j.toString() + "px";
				break;
			} 
		}
		document.body.appendChild(ui_voteChoose_Image);
		ui_voteChoose_Image.style.display = "none";
		ui_voteChoose_Image.addEventListener("click", () => {
			this.changeVote("default");
		});

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
		this.initPosWidth = initPosWidth;
		this.ui_voteChoose_Image = ui_voteChoose_Image;
		this.ui_sound_image = ui_sound_image;
		this.ui_leftNote = ui_leftNote;
	}



	preGaming(timeCount, hint, turn) {
		this.playerVoteName = "";
		if(this.over) return;
		for (let image of this.ui_voteInv_image) {
			image.style.display = "none";
		}
		for (let craft of this.ui_voteCraft_image) {
			craft.style.display = "none";
		}
		this.ui_voteChoose_Image.style.display = "none";
		this.hint = hint;
		this.turn = turn;
		let timecounter = document.createElement("div");
		timecounter.className = "ui_warning";
		timecounter.style.fontSize = "100px";
		timecounter.style.color = "white";
		timecounter.style.display = "none";
		timecounter.style.top = "20%";
		document.body.appendChild(timecounter);
		$(timecounter).fadeIn(2000);
		let timer = setInterval(() => this.preGamingCounter(timer,timeCount--,timecounter),1000);
	}

	preGamingCounter(t,timeCount,timecounter) {
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
			timecounter.innerHTML = "第" + (this.turn + 1) + "轮寻找即将开始" + "<br>" + (timeCount);
		}
	}



	showHint() {
		let pos;
		if (this.isHintTime) {
			this.hintContent.innerHTML = this.hint;
			this.hintContent.style.display = "block";
		}
		else {
			this.hintContent.innerHTML = "现在暂时没有线索噢~";
			this.hintContent.style.display = "block";
		}
		
	}

	playerVote(cname) {
		
		if(cname == "default" || cname == "" || cname == null || cname == undefined) {

		}
		else {
			console.log("vote " + cname);
			this.socket.emit("vote",cname);
		}
	}

	playerUnvote(cname) {

		if(cname == "default" || cname == "" || cname == null || cname == undefined) {

		}
		else {
			console.log("unvote " + cname);
			this.socket.emit("unvote",cname);
		}

	}

	changeInv(oldName,newName,isEmit,userID) {
		let index = 0;
		let canChange = true;
		if (oldName == "default") {
			for(let i in this.players) {
				if(this.players[i].id == userID){
					index = i;break;
				}
			}
		}
		else {
			for(let i in this.ui_voteCraft) {
				if(this.ui_voteCraft[i].name == oldName) {
					index = i;break;
				}
			}
		}
		for(let i in this.ui_voteCraft) {
			if(this.ui_voteCraft[i].name == newName && this.ui_voteCraft[i].name != "default") {
				canChange = false;break;
			}
		}
		console.log("canchange: " + canChange);
		if (canChange) {
			let pos = 0;
			for(let i = 0;i <= 40;++i) {
				if(craftName[i] == newName) {
					pos = i;
					break;
				}
			} 
			console.log("ok change index is " + index);
			this.ui_voteCraft[index] = new Craft(pos,craftName[pos],craftAddr[pos],null,true);
			this.ui_voteCraft_image[index].src = craftAddr[pos];
			if(isEmit) {
				if(this.playerVoteName == oldName) {
					this.playerVote(newName);
					this.playerVoteName = newName;
				}
				else {
					this.changeVote(newName);
				}
				console.log("i changed the model");
				this.socket.emit("change vote model",newName,oldName);
			}
			else {
				if(this.playerVoteName == oldName) {
					this.ui_voteChoose_Image.style.display = "none";
					this.playerVoteName = "";
				}	
			}
		}
		else {
			console.log("exist");
		}

	}
	changeVote(name) {
		console.log("i am here in change " + name);
		if(this.currentPlayer.isOut) return;
		if (name == "default") {
			this.playerVoteName = "default";
			this.ui_voteChoose_Image.style.display = "none";
			console.log("can't vote null");
			return;
		}
		let index = 0;
		for(let i in this.ui_voteCraft) {
			if (this.ui_voteCraft[i].name == name) {
				index = i;break;
			}
		}
		console.log("index is " + index);
		this.playerUnvote(this.playerVoteName);
		this.playerVoteName = name;
		this.playerVote(this.playerVoteName);
		this.ui_voteChoose_Image.style.display = "block";
		this.ui_voteChoose_Image.style.left = (this.initPosWidth + 120 * index) + "px";
	}

	beginVote(voteTime) {
		this.zuse = false;
		this.currentPlayer.isVoteCondition = true;
		if(this.currentPlayer.isOut) {
			this.currentPlayer.isVoteCondition = false;
		}
		for (let craft of this.ui_voteCraft) {
			craft = defaultVoteCraft.clone();
		}
		for (let image of this.ui_voteInv_image) {
			image.style.display = "block";
			image.src = ui_voteInv;
		}
		for (let craft of this.ui_voteCraft_image) {
			craft.style.display = "block";
			craft.src = ui_voteCraft_null;
		}
		let voteWarning = document.createElement("div");
		voteWarning.className = "ui_warning";
		voteWarning.style.fontSize = "40px";
		voteWarning.style.color = "white";
		voteWarning.style.textAlign = 'left';
		voteWarning.style.display = "none";
		document.body.appendChild(voteWarning);
		$(voteWarning).fadeIn(2000);
		let timer = setInterval(() => {
			if(voteTime == 0) {
				clearInterval(timer);
				voteWarning.style.display = "none";
				document.body.removeChild(voteWarning);
				this.endVote();
			}
			else
				voteWarning.innerHTML = "距离投票结束还有<br>" + (voteTime--) + "秒";
		},1000);
	}



	endVote() {
		console.log("in endvote");
		let sdoors = this.doors;
		let rowCount = this.rowCount;
		let columnCount = this.columnCount;
		this.isHintTime = false;
		this.currentPlayer.isVoteCondition = false;
		function getPlayerPosition(getPlayer) {
			let x = getPlayer.model.position.x;
			let z = getPlayer.model.position.z;
			let row = Math.floor(z / ROOM_SIZE);
			let column = Math.floor(x / ROOM_SIZE);
			return [row,column];
		}

		function getRoomAt(rooms,row, column) {
    		return rooms[row * columnCount + column];
		}
		function getConnectionCraft(x,y,tag,rooms) {
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
						texts = texts.concat(getConnectionCraft(nx,ny,tag,rooms));
					}
				}
			}
			return texts;
		}
		function getConnectionDoor() {
			let reDoors = [];
			for(let i in sdoors) {
				if (sdoors[i].open) reDoors.push(i);
			}
			return reDoors;
		}
		let posInfo = getPlayerPosition(this.currentPlayer);
		let row = posInfo[0];
		let column = posInfo[1];
		let tag = [];
		this.currentPlayer.roomX = row;
		this.currentPlayer.roomY = column;
		for(let i = 0;i < this.rowCount;++i) {
			tag[i] = [];
			for(let j = 0;j < this.columnCount;++j) {
				tag[i][j] = false;
			}
		}
		let texts = getConnectionCraft(this.currentPlayer.roomX,this.currentPlayer.roomY,tag,this.rooms);
		let doors = getConnectionDoor();
		console.log("ok round end");
		console.log(texts);
		console.log(doors);
		this.socket.emit("round end",texts,doors);
		
	}

	turnLose(lockedDoor,outUser) {
		console.log("i am in lose");
		let turnWarning = document.createElement("div");
		turnWarning.className = "ui_warning";
		turnWarning.style.fontSize = "80px";
		turnWarning.style.color = "white";
		turnWarning.style.top = "150px";
		turnWarning.innerHTML = "该轮游戏失败<br>正确的物品未被正确选出<br>第" + outUser + "号玩家已经出局";
		document.body.appendChild(turnWarning);
		if(lockedDoor != null) {
			let fObj = this.doors[lockedDoor].model;
			this.doors[lockedDoor].closeIt();
			turnWarning.innerHTML += "<br>一扇房门已经被关闭";
			let timer2 = setInterval( () => this.lockTheDoor(timer2,fObj),25);
		}
		for(let p of this.players) {
			if (p.id == outUser) {
				p.isOut = true;
				p.model.visible = false;
				break;
			}
		}
		if(outUser == this.currentPlayer.id) {
			//console.log("you are out");
			this.currentPlayer.setOut();
			turnWarning.innerHTML = "由于该轮游戏失败<br>你已经出局<br>你已进入上帝模式<br>可以一览全景";
			//$(turnWarning).fadeOut(10000, function() {
			//	document.body.removeChild(turnWarning);
			//});
		}
		let snum = 0;
		for(let p of this.players) {
			if(!p.isOut) ++snum;
		}
		console.log("num is " + snum + " and yu is " + Math.ceil(this.players.length / 2))
		if(snum < Math.ceil(this.players.length / 2)) {
			turnWarning.innerHTML = "游戏结束";
			this.currentPlayer.setOut();
			this.socket.emit("game over",false,this.currentPlayer.score);
		}
 		//if(!this.currentPlayer.isOut) {

		let timer = setTimeout(() => {
			if(this.over) return;
			turnWarning.style.display = "none";
			document.body.removeChild(turnWarning);
			if(!this.over) {
				this.preGaming(10,this.hint,this.turn + 1);
			}
			clearTimeout(timer);
		},5000);
		//}
	}

	turnWin() {
		this.currentPlayer.keyNum++;
		if (this.currentPlayer.keyNum > 0) {
			this.ui_key_image.src = ui_key_exist;
		}
		else {
			this.ui_key_image.src = ui_key_normal;
		}
		let turnWarning = document.createElement("div");
		turnWarning.className = "ui_warning";
		turnWarning.style.fontSize = "80px";
		turnWarning.style.color = "white";
		turnWarning.style.top = "150px";
		turnWarning.innerHTML = "成功地投票出了正确物品<br>该轮胜利<br>所有玩家获得了一把钥匙";
		document.body.appendChild(turnWarning);
		let timer = setTimeout(() => {
			turnWarning.style.display = "none";
			document.body.removeChild(turnWarning);
			this.preGaming(10,this.hint,this.turn + 1);
			clearTimeout(timer);
		},5000);
		
	}
	
	checkVictory(srow,scolumn) {
		console.log("" + srow + " " + scolumn);
		console.log(this.rooms);
		let rooms = this.rooms;
		let rowCount = this.rowCount;
		let columnCount = this.columnCount;
		function getPlayerPosition(getPlayer) {
			let x = getPlayer.model.position.x;
			let z = getPlayer.model.position.z;
			let row = Math.floor(z / ROOM_SIZE);
			let column = Math.floor(x / ROOM_SIZE);
			if(row > rowCount) row = rowCount;
			if(column > columnCount) column = columnCount;
			return [row,column];
		}
		function getRoomAt(rooms,row, column) {
    		return rooms[row * columnCount + column];
		}
		function getConnectionRooms(x,y,tag) {
			if(tag[x][y]) return [];
			tag[x][y] = true;
			let room = getRoomAt(rooms,x,y);
			let itsdoors = room.doors;
			let re = [];
			re.push(room);
			//let texts = room.getRoomCraft();
			for(let i = 0;i < 4;++i) {
				let nx = x + dirx[i];
				let ny = y + diry[i];
				if (nx >= 0 && nx < rowCount && ny >= 0 && ny < columnCount) {
					if (itsdoors[i].open) {
						re = re.concat(getConnectionRooms(nx,ny,tag));
					}
				}
			}
			return re;
		}
		let roomX = [];
		let roomY = [];
		let roomConnect = [];
		let tag = [];
		console.log("" + rowCount + " " + columnCount);
		for(let i = 0;i < rowCount;++i) {
			tag[i] = [];
			for(let j = 0;j < columnCount;++j) {
				tag[i][j] = false;
			}
		}
		for(let p of this.players) {
			if(!p.isOut) {
				let posInfo = getPlayerPosition(p);
				roomX.push(posInfo[0]);
				roomY.push(posInfo[1]);
			}
		}
		for(let i in roomX) {
			roomConnect[i] = false;
		}
		let eRooms = getConnectionRooms(srow,scolumn,tag);
		console.log(eRooms);
		for(let r of eRooms) {
			for(let i in roomX) {
				if(r.row == roomX[i] && r.column == roomY[i]) {
					roomConnect[i] = true;
				}
			}
		}
		for(let i in roomX) {
			if(roomConnect[i] == false) return false;
		}
		return true;

 	}

}
