import * as THREE from "three";
import { DOOR_SIZE, Door } from "../js/door";
import { Craft } from "../js/craft";

export const ROOM_SIZE = 20;
export const WALL_SIZE = 8;
export const WALL_HEIGHT = 8;
export const WALL_THICKNESS = 0.5;


let floorTextureImage = [];

import floorTextureImage0 from "../models/floor/1.jpg";
import floorTextureImage1 from "../models/floor/3.jpg";
import floorTextureImage2 from "../models/floor/4.jpg";
import floorTextureImage3 from "../models/floor/8.jpg";
floorTextureImage = [floorTextureImage0,floorTextureImage1,floorTextureImage2,floorTextureImage3];

let wallTextureImage = [];

import wallTextureImage0 from "../models/wall/1.jpg";
import wallTextureImage1 from "../models/wall/4.jpg";
import wallTextureImage2 from "../models/wall/6.jpg";
import wallTextureImage3 from "../models/wall/13.jpg";

wallTextureImage = [wallTextureImage0,wallTextureImage1,wallTextureImage2,wallTextureImage3];

let doorTextureImage = [];
import doorTextureImage0 from "../models/door/7.jpg";
import doorTextureImage1 from "../models/door/4.jpg";
import doorTextureImage2 from "../models/door/5.jpg";
import doorTextureImage3 from "../models/door/3.jpg";
 
doorTextureImage = [doorTextureImage0,doorTextureImage1,doorTextureImage2,doorTextureImage3];

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

let craftAddr = [];
import craftAddr0 from "../models/model/1/1.png";craftAddr.push(craftAddr0);
import craftAddr1 from "../models/model/2/2.png";craftAddr.push(craftAddr1);
import craftAddr2 from "../models/model/3/3.png";craftAddr.push(craftAddr2);
import craftAddr3 from "../models/model/4/4.png";craftAddr.push(craftAddr3);
import craftAddr4 from "../models/model/5/5.png";craftAddr.push(craftAddr4);
import craftAddr5 from "../models/model/6/6.png";craftAddr.push(craftAddr5);
import craftAddr6 from "../models/model/7/7.png";craftAddr.push(craftAddr6);
import craftAddr7 from "../models/model/8/8.png";craftAddr.push(craftAddr7);
import craftAddr8 from "../models/model/9/9.png";craftAddr.push(craftAddr8);
import craftAddr9 from "../models/model/10/10.png";craftAddr.push(craftAddr9);
import craftAddr10 from "../models/model/11/11.png";craftAddr.push(craftAddr10);
import craftAddr11 from "../models/model/12/12.png";craftAddr.push(craftAddr11);
import craftAddr12 from "../models/model/13/13.png";craftAddr.push(craftAddr12);
import craftAddr13 from "../models/model/14/14.png";craftAddr.push(craftAddr13);
import craftAddr14 from "../models/model/15/15.png";craftAddr.push(craftAddr14);
import craftAddr15 from "../models/model/16/16.png";craftAddr.push(craftAddr15);
import craftAddr16 from "../models/model/17/17.png";craftAddr.push(craftAddr16);
import craftAddr17 from "../models/model/18/18.png";craftAddr.push(craftAddr17);
import craftAddr18 from "../models/model/19/19.png";craftAddr.push(craftAddr18);
import craftAddr19 from "../models/model/20/20.png";craftAddr.push(craftAddr19);
import craftAddr20 from "../models/model/21/21.png";craftAddr.push(craftAddr20);
import craftAddr21 from "../models/model/22/22.png";craftAddr.push(craftAddr21);
import craftAddr22 from "../models/model/23/23.png";craftAddr.push(craftAddr22);
import craftAddr23 from "../models/model/24/24.png";craftAddr.push(craftAddr23);
import craftAddr24 from "../models/model/25/25.png";craftAddr.push(craftAddr24);
import craftAddr25 from "../models/model/26/26.png";craftAddr.push(craftAddr25);
import craftAddr26 from "../models/model/27/27.png";craftAddr.push(craftAddr26);
import craftAddr27 from "../models/model/28/28.png";craftAddr.push(craftAddr27);
import craftAddr28 from "../models/model/29/29.png";craftAddr.push(craftAddr28);
import craftAddr29 from "../models/model/30/30.png";craftAddr.push(craftAddr29);
import craftAddr30 from "../models/model/31/31.png";craftAddr.push(craftAddr30);
import craftAddr31 from "../models/model/32/32.png";craftAddr.push(craftAddr31);
import craftAddr32 from "../models/model/33/33.png";craftAddr.push(craftAddr32);
import craftAddr33 from "../models/model/34/34.png";craftAddr.push(craftAddr33);
import craftAddr34 from "../models/model/35/35.png";craftAddr.push(craftAddr34);
import craftAddr35 from "../models/model/36/36.png";craftAddr.push(craftAddr35);
import craftAddr36 from "../models/model/37/37.png";craftAddr.push(craftAddr36);
import craftAddr37 from "../models/model/38/38.png";craftAddr.push(craftAddr37);
import craftAddr38 from "../models/model/39/39.png";craftAddr.push(craftAddr38);
import craftAddr39 from "../models/model/40/40.png";craftAddr.push(craftAddr39);
import craftAddr40 from "../models/model/41/41.png";craftAddr.push(craftAddr40);


let roomModelNum = [];
let roomModelX = [];
let roomModelY = [];
let roomModelZ = [];
let roomModelType = [];
roomModelX[0] = [];roomModelY[0] = [];roomModelZ[0] = [];roomModelType[0] = [];roomModelNum[0] = 10;
roomModelX[0].push(8);roomModelY[0].push(1);roomModelZ[0].push(8);roomModelType[0].push(25);
roomModelX[0].push(5);roomModelY[0].push(1);roomModelZ[0].push(7);roomModelType[0].push(12);
roomModelX[0].push(15);roomModelY[0].push(1);roomModelZ[0].push(15);roomModelType[0].push(36);
roomModelX[0].push(15);roomModelY[0].push(1);roomModelZ[0].push(7);roomModelType[0].push(16);
roomModelX[0].push(15);roomModelY[0].push(2);roomModelZ[0].push(7);roomModelType[0].push(32);
roomModelX[0].push(2);roomModelY[0].push(1);roomModelZ[0].push(18);roomModelType[0].push(28);
roomModelX[0].push(7);roomModelY[0].push(1);roomModelZ[0].push(14);roomModelType[0].push(9);
roomModelX[0].push(6);roomModelY[0].push(1);roomModelZ[0].push(3);roomModelType[0].push(26);
roomModelX[0].push(7);roomModelY[0].push(1);roomModelZ[0].push(2);roomModelType[0].push(2);
roomModelX[0].push(18);roomModelY[0].push(1);roomModelZ[0].push(9);roomModelType[0].push(30);
roomModelX[1] = [];roomModelY[1] = [];roomModelZ[1] = [];roomModelType[1] = [];roomModelNum[1] = 10;
roomModelX[1].push(8);roomModelY[1].push(1);roomModelZ[1].push(8);roomModelType[1].push(33);
roomModelX[1].push(5);roomModelY[1].push(1);roomModelZ[1].push(13);roomModelType[1].push(14);
roomModelX[1].push(2);roomModelY[1].push(1);roomModelZ[1].push(2);roomModelType[1].push(31);
roomModelX[1].push(15);roomModelY[1].push(1);roomModelZ[1].push(15);roomModelType[1].push(18);
roomModelX[1].push(15);roomModelY[1].push(2);roomModelZ[1].push(15);roomModelType[1].push(40);
roomModelX[1].push(9);roomModelY[1].push(1);roomModelZ[1].push(2);roomModelType[1].push(6);
roomModelX[1].push(16);roomModelY[1].push(1);roomModelZ[1].push(6);roomModelType[1].push(0);
roomModelX[1].push(18);roomModelY[1].push(1);roomModelZ[1].push(12);roomModelType[1].push(22);
roomModelX[1].push(5);roomModelY[1].push(1);roomModelZ[1].push(10);roomModelType[1].push(5);
roomModelX[1].push(5);roomModelY[1].push(1);roomModelZ[1].push(18);roomModelType[1].push(3);
roomModelX[2] = [];roomModelY[2] = [];roomModelZ[2] = [];roomModelType[2] = [];roomModelNum[2] = 10;
roomModelX[2].push(8);roomModelY[2].push(1);roomModelZ[2].push(8);roomModelType[2].push(34);
roomModelX[2].push(15);roomModelY[2].push(1);roomModelZ[2].push(7);roomModelType[2].push(24);
roomModelX[2].push(3);roomModelY[2].push(1);roomModelZ[2].push(18);roomModelType[2].push(39);
roomModelX[2].push(17);roomModelY[2].push(1);roomModelZ[2].push(17);roomModelType[2].push(29);
roomModelX[2].push(17);roomModelY[2].push(2);roomModelZ[2].push(17);roomModelType[2].push(10);
roomModelX[2].push(16);roomModelY[2].push(1);roomModelZ[2].push(10);roomModelType[2].push(17);
roomModelX[2].push(5);roomModelY[2].push(1);roomModelZ[2].push(5);roomModelType[2].push(13);
roomModelX[2].push(16);roomModelY[2].push(1);roomModelZ[2].push(10);roomModelType[2].push(21);
roomModelX[2].push(10);roomModelY[2].push(1);roomModelZ[2].push(6);roomModelType[2].push(8);
roomModelX[2].push(13);roomModelY[2].push(1);roomModelZ[2].push(13);roomModelType[2].push(7);
roomModelX[3] = [];roomModelY[3] = [];roomModelZ[3] = [];roomModelType[3] = [];roomModelNum[3] = 10;
roomModelX[3].push(8);roomModelY[3].push(1);roomModelZ[3].push(8);roomModelType[3].push(35);
roomModelX[3].push(15);roomModelY[3].push(1);roomModelZ[3].push(13);roomModelType[3].push(20);
roomModelX[3].push(17);roomModelY[3].push(1);roomModelZ[3].push(3);roomModelType[3].push(38);
roomModelX[3].push(5);roomModelY[3].push(1);roomModelZ[3].push(5);roomModelType[3].push(37);
roomModelX[3].push(5);roomModelY[3].push(2);roomModelZ[3].push(5);roomModelType[3].push(10);
roomModelX[3].push(2);roomModelY[3].push(1);roomModelZ[3].push(18);roomModelType[3].push(23);
roomModelX[3].push(4);roomModelY[3].push(1);roomModelZ[3].push(15);roomModelType[3].push(1);
roomModelX[3].push(15);roomModelY[3].push(1);roomModelZ[3].push(5);roomModelType[3].push(27);
roomModelX[3].push(10);roomModelY[3].push(1);roomModelZ[3].push(15);roomModelType[3].push(15);
roomModelX[3].push(12);roomModelY[3].push(1);roomModelZ[3].push(5);roomModelType[3].push(19);




let craftPic = [];
import craftPic6 from "../models/model/7/7.png";craftPic[6] = craftPic6;

let textureLoader = new THREE.TextureLoader();
let jsloader = new THREE.ObjectLoader();


export class Room {
    constructor(control,row, column, walls, doors, roomModel,rowCount,columnCount) {
        this.row = row;
        this.column = column;
        this.crafts = [];
        //this.scene = scene;
        this.control = control;
        this.walls = walls;
        this.doors = doors;
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        // calc origin of the room
        let origin = new THREE.Vector3(column * ROOM_SIZE, 0, row * ROOM_SIZE);
        this.origin = origin;
        this.origin = origin;
        console.log(roomModel);
        let south = row == rowCount - 1 ? 0 : roomModel[row + 1][column];
        let east = column == columnCount - 1 ? 0 : roomModel[row][column + 1];
        let models = this.getRoomModel(roomModel[row][column],south,east);
        let floorModel = models[0];
        let wallModel = models[1];
        let doorModel = models[2];
       // let craftModel = models[3];
       // console.log(craftModel);
        // make floor
        let floor = floorModel.clone();
        floor.rotation.x =  -Math.PI / 2;
        floor.position.x = origin.x + ROOM_SIZE / 2;
        floor.position.z = origin.z + ROOM_SIZE / 2;
        this.floor = floor;

      //  this.craft = craftModel;
      
        //make door if needed 
        for (let i = 0;i < 4;i++){
           if (this.doors[i] === null) {
                let door = new Door(row,column,i,doorModel[i].clone());
                door.model.position.y = origin.y + WALL_HEIGHT / 2;
                switch (i) {
                    //north
                    case 0:
                        door.relationX = row - 1;
                        door.relationY = column;
                        door.model.position.x = origin.x + WALL_SIZE  + DOOR_SIZE / 2;
                        door.model.position.z = origin.z;
                        break;
                    //south
                    case 1: 
                        door.relationX = row + 1;
                        door.relationY = column;
                        door.model.position.x = origin.x + WALL_SIZE  + DOOR_SIZE / 2;
                        door.model.position.z = origin.z + ROOM_SIZE;
                        break;
                    //west 
                    case 2:
                        door.relationX = row;
                        door.relationY = column - 1;
                        door.model.rotation.y = Math.PI / 2;
                        door.model.position.x = origin.x;
                        door.model.position.z = origin.z + WALL_SIZE + DOOR_SIZE / 2;
                        break;
                    //east
                    case 3:
                        door.model.rotation.y = Math.PI / 2;
                        door.model.position.x = origin.x + ROOM_SIZE;
                        door.model.position.z = origin.z + WALL_SIZE + DOOR_SIZE / 2;
                        break;
                }
                this.doors[i] = door;
            }
        }

        // make wall if needed
        for (let i = 0; i < 8; i++) {
            if (this.walls[i] === null) {
                let wall = wallModel[i].clone();

                wall.position.y = origin.y + WALL_HEIGHT / 2;
                switch (i) {
                    // north 1
                    case 0:
                        wall.position.x = origin.x + WALL_SIZE / 2;
                        wall.position.z = origin.z;
                        break;
                    // south 1
                    case 1:
                        wall.position.x = origin.x + WALL_SIZE / 2;
                        wall.position.z = origin.z + ROOM_SIZE;
                        break;
                    // west 1
                    case 2:
                        wall.rotation.y = Math.PI / 2;
                        wall.position.x = origin.x;
                        wall.position.z = origin.z + WALL_SIZE / 2;
                        break;
                    // east 1
                    case 3:
                        wall.rotation.y = Math.PI / 2;
                        wall.position.x = origin.x + ROOM_SIZE;
                        wall.position.z = origin.z + WALL_SIZE / 2;
                        break;
                    // north 2
                    case 4:
                        wall.position.x = origin.x + ROOM_SIZE - WALL_SIZE / 2;
                        wall.position.z = origin.z;
                        break;
                    // south 2
                    case 5:
                        wall.position.x = origin.x + ROOM_SIZE - WALL_SIZE / 2;
                        wall.position.z = origin.z + ROOM_SIZE;
                        break;
                    // west 2
                    case 6:
                        wall.rotation.y = Math.PI / 2;
                        wall.position.x = origin.x;
                        wall.position.z = origin.z + ROOM_SIZE - WALL_SIZE / 2;
                        break;
                    // east 2
                    case 7:
                        wall.rotation.y = Math.PI / 2;
                        wall.position.x = origin.x + ROOM_SIZE;
                        wall.position.z = origin.z + ROOM_SIZE - WALL_SIZE / 2;
                        break;
                }

                this.walls[i] = wall;
            }
        }
    }
    getRoomCraft() {
        let texts = [];
        for(let craft of this.crafts) {
            texts.push(craft.name);
        }
        return texts;
    }
    getRoomModel(local,south,east) {
        let floorTexture = textureLoader.load(floorTextureImage[local]);
        let floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture, specular: 0xffffff });

        let wallTexture = textureLoader.load(wallTextureImage[local]);
        let wallMaterial = new THREE.MeshPhongMaterial({ map: wallTexture, specular: 0xffffff, side: THREE.DoubleSide });

        let doorTexture = textureLoader.load(doorTextureImage[local]);
        let doorMaterial = new THREE.MeshPhongMaterial({ map: doorTexture, specular: 0xffffff, side: THREE.DoubleSide });

        let floorModel = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_SIZE, ROOM_SIZE), floorMaterial);
        floorModel.receiveShadow = true;

        let wallModel = new THREE.Mesh(new THREE.CubeGeometry(WALL_SIZE, WALL_HEIGHT, WALL_THICKNESS), wallMaterial);
        wallModel.receiveShadow = true;
        wallModel.castShadow = true;

        let doorModel = new THREE.Mesh(new THREE.CubeGeometry(DOOR_SIZE,WALL_HEIGHT,WALL_THICKNESS),doorMaterial);
        doorModel.receiveShadow = true;
        doorModel.castShadow = true;

        let su = this;
        let control = this.control;
       // let craft;
        for(let i = 0 ;i < roomModelNum[local];++i) {
            let num = roomModelType[local][i];
            let craftTexture = textureLoader.load(craftAddr[num]);
            let craftMaterial = new THREE.MeshPhongMaterial({map: craftTexture,specular:0xffffff,side:THREE.DoubleSide});

            let craftModel = new THREE.Mesh(new THREE.CubeGeometry(1,1,1),craftMaterial);
            craftModel.receiveShadow = true;
            craftModel.castShadow = true;
            let craft = new Craft(num,craftName[num],craftAddr[num],craftModel,true);
            craft.model.position.x = this.origin.x + roomModelX[local][i];
            craft.model.position.z = this.origin.z + roomModelZ[local][i];
            craft.model.position.y = roomModelY[local][i];
            craft.model.craft  = craft;
            this.crafts.push(craft);
            control.setCraft(craft);
        }
        
        // jsloader.load(craftAddr[num],function(object) {
        //      //let material = new THREE.MeshFaceMaterial( materials/*{ color: 'red', wireframe: true } */);
        //      object.traverse(function(child) {
        //         if(child instanceof THREE.Mesh) {
        //             su.craft = new Craft(num,"ball",craftPic[num],child,true);
        //      // su.craft = object;
        //              su.craft.model.scale.set(0.01,0.01,0.01);
        //       //su.craft = new THREE.Mesh(geo,material);
        //              su.craft.model.position.x = su.origin.x + ROOM_SIZE / 2;
        //              su.craft.model.position.z = su.origin.z + ROOM_SIZE / 2;
        //              su.craft.model.position.y = 1;
        //              su.craft.model.craft = su.craft;
        //              control.setCraft(su.craft);
        //       //scene.add(su.craft.model);
        //              console.log("addi n");
        //         }
        //      });
              
             //mesh.scale.set(0.001,0.001,0.001);
        //       mixer[1] = new THREE.AnimationMixer(scene);  
        //         mixer[1].clipAction(geo.animations[0], mesh)  
        //             .setDuration(1)                 
        //             .startAt( -Math.random() )  
        //             .play();//开始播放   animations[0]  
             //localPlayer = new Player("ck",true,mesh,1);
             //localPlayer.addToScene(scene,0,0,0);
             //camera.position.set(0,3,0);
             //players.push(localPlayer);
           //  animate();
         //});
    //    while(craft == null || craft == undefined) {

    //    }
        let wallModels = [];
        let doorModels = [];
        let craftModels = [];
        for(let i = 0;i < 8;++i) wallModels.push(wallModel);
        for(let i = 0;i < 8;++i) doorModels.push(doorModel); 
        return [floorModel,[wallModel,wallModel,wallModel,wallModel,wallModel,wallModel,wallModel,wallModel],[doorModel,doorModel,doorModel,doorModel]];
    }
}
