import * as THREE from "three";

export const ROOM_SIZE = 20;
export const WALL_HEIGHT = 8;
export const WALL_THICKNESS = 0.5;

export class Room {
    constructor(row, column, walls, floorModel, wallModel) {
        this.row = row;
        this.column = column;
        this.walls = walls;

        // calc origin of the room
        let origin = new THREE.Vector3(column * ROOM_SIZE, 0, row * ROOM_SIZE);
        this.origin = origin;

        // make floor
        let floor = floorModel.clone();
        floor.rotation.x =  -Math.PI / 2;
        floor.position.x = origin.x + ROOM_SIZE / 2;
        floor.position.z = origin.z + ROOM_SIZE / 2;
        this.floor = floor;

        // make wall if needed
        for (let i = 0; i < 4; i++) {
            if (this.walls[i] === null) {
                let wall = wallModel.clone();

                wall.position.y = origin.y + WALL_HEIGHT / 2;
                switch (i) {
                    // north
                    case 0:
                        wall.position.x = origin.x + ROOM_SIZE / 2;
                        wall.position.z = origin.z;
                        break;
                    // south
                    case 1:
                        wall.position.x = origin.x + ROOM_SIZE / 2;
                        wall.position.z = origin.z + ROOM_SIZE;
                        break;
                    // west
                    case 2:
                        wall.rotation.y = Math.PI / 2;
                        wall.position.x = origin.x;
                        wall.position.z = origin.z + ROOM_SIZE / 2;
                        break;
                    // east
                    case 3:
                        wall.rotation.y = Math.PI / 2;
                        wall.position.x = origin.x + ROOM_SIZE;
                        wall.position.z = origin.z + ROOM_SIZE / 2;
                        break;
                }

                this.walls[i] = wall;
            }
        }
    }
}
