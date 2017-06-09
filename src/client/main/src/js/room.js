import * as THREE from "three";
import { DOOR_SIZE, Door } from "../js/door";
import { Craft } from "../js/craft";



//import floorTextureImage from "../../assets/images/wood.jpg";
//import wallTextureImage from "../../assets/images/metal.jpg";
//import doorTextureImage from "../ui/door.jpg";



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

let craftAddr = [];
import "../models/model/7/PlatonicSurface_Color.jpg";
import "../models/model/3/Page.jpg";
import "../models/model/8/metal.jpg";
import craftAddr0 from "../models/model/1/1.json";craftAddr.push(craftAddr0);
import craftAddr1 from "../models/model/2/2.json";craftAddr.push(craftAddr1);
import craftAddr2 from "../models/model/3/3.json";craftAddr.push(craftAddr2);
import craftAddr3 from "../models/model/4/4.json";craftAddr.push(craftAddr3);
import craftAddr4 from "../models/model/5/5.json";craftAddr.push(craftAddr4);
import craftAddr5 from "../models/model/6/6.json";craftAddr.push(craftAddr5);
import craftAddr6 from "../models/model/7/7.json";craftAddr.push(craftAddr6);
import craftAddr7 from "../models/model/8/8.json";craftAddr.push(craftAddr7);
import craftAddr8 from "../models/model/9/9.json";craftAddr.push(craftAddr8);
import craftAddr9 from "../models/model/10/10.json";craftAddr.push(craftAddr9);
import craftAddr10 from "../models/model/11/11.json";craftAddr.push(craftAddr10);
import craftAddr11 from "../models/model/12/12.json";craftAddr.push(craftAddr11);
import craftAddr12 from "../models/model/13/13.json";craftAddr.push(craftAddr12);
import craftAddr13 from "../models/model/14/14.json";craftAddr.push(craftAddr13);
import craftAddr14 from "../models/model/15/15.json";craftAddr.push(craftAddr14);
import craftAddr15 from "../models/model/16/16.json";craftAddr.push(craftAddr15);
import craftAddr16 from "../models/model/17/17.json";craftAddr.push(craftAddr16);
import craftAddr17 from "../models/model/18/18.json";craftAddr.push(craftAddr17);
import craftAddr18 from "../models/model/19/19.json";craftAddr.push(craftAddr18);
import craftAddr19 from "../models/model/20/20.json";craftAddr.push(craftAddr19);
import craftAddr20 from "../models/model/21/21.json";craftAddr.push(craftAddr20);
import craftAddr21 from "../models/model/22/22.json";craftAddr.push(craftAddr21);
import craftAddr22 from "../models/model/23/23.json";craftAddr.push(craftAddr22);
import craftAddr23 from "../models/model/24/24.json";craftAddr.push(craftAddr23);
import craftAddr24 from "../models/model/25/25.json";craftAddr.push(craftAddr24);
import craftAddr25 from "../models/model/26/26.json";craftAddr.push(craftAddr25);
import craftAddr26 from "../models/model/27/27.json";craftAddr.push(craftAddr26);
import craftAddr27 from "../models/model/28/28.json";craftAddr.push(craftAddr27);
import craftAddr28 from "../models/model/29/29.json";craftAddr.push(craftAddr28);
import craftAddr29 from "../models/model/30/30.json";craftAddr.push(craftAddr29);
import craftAddr30 from "../models/model/31/31.json";craftAddr.push(craftAddr30);
import craftAddr31 from "../models/model/32/32.json";craftAddr.push(craftAddr31);
import craftAddr32 from "../models/model/33/33.json";craftAddr.push(craftAddr32);
import craftAddr33 from "../models/model/34/34.json";craftAddr.push(craftAddr33);
import craftAddr34 from "../models/model/35/35.json";craftAddr.push(craftAddr34);
import craftAddr35 from "../models/model/36/36.json";craftAddr.push(craftAddr35);
import craftAddr36 from "../models/model/37/37.json";craftAddr.push(craftAddr36);
import craftAddr37 from "../models/model/38/38.json";craftAddr.push(craftAddr37);
import craftAddr38 from "../models/model/39/39.json";craftAddr.push(craftAddr38);
import craftAddr39 from "../models/model/40/40.json";craftAddr.push(craftAddr39);
import craftAddr40 from "../models/model/41/41.json";craftAddr.push(craftAddr40);


let craftPic = [];
import craftPic6 from "../models/model/7/7.png";craftPic[6] = craftPic6;

let textureLoader = new THREE.TextureLoader();
let jsloader = new THREE.ObjectLoader();


export class Room {
    constructor(control,row, column, walls, doors, roomModel,rowCount,columnCount) {
        this.row = row;
        this.column = column;
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
        let num = 6;//Math.floor(Math.random() * 9);
        jsloader.load(craftAddr[num],function(object) {
             //let material = new THREE.MeshFaceMaterial( materials/*{ color: 'red', wireframe: true } */);
             object.traverse(function(child) {
                if(child instanceof THREE.Mesh) {
                    su.craft = new Craft(num,"ball",craftPic[num],child,true);
             // su.craft = object;
                     su.craft.model.scale.set(0.01,0.01,0.01);
              //su.craft = new THREE.Mesh(geo,material);
                     su.craft.model.position.x = su.origin.x + ROOM_SIZE / 2;
                     su.craft.model.position.z = su.origin.z + ROOM_SIZE / 2;
                     su.craft.model.position.y = 1;
                     su.craft.model.craft = su.craft;
                     control.setCraft(su.craft);
              //scene.add(su.craft.model);
                     console.log("addi n");
                }
             });
              
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
         });
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
