import * as THREE from "three";

export class Player {
    constructor(name, model, id,index) {
        this.name = name;
        this.isLocal = false;
        this.model = model;
        this.id = id;
        this.keyNum = 0;
        this.isOut = false;
        this.isKeyCondition = false;
        this.isVoteCondition = false;
        this.index = index;
    }

    addToScene(scene, x, y, z) {
        scene.add(this.model);
        this.model.position.x = x;
        this.model.position.y = y;
        this.model.position.z = z;
    }

    move(camera) {
        if (this.isLocal) {
            let vector = camera.getWorldDirection();
            this.model.position.x = camera.position.x - vector.x * 0;
            this.model.position.z = camera.position.z - vector.z * 0;
            this.model.rotation.y = (vector.x >= 0 ? Math.acos(vector.z) : Math.PI * 2 - Math.acos(vector.z));
        }
        else {
            let vector = getSocketPosition(this);
            this.model.position.x = vector.x;
            this.model.position.y = vector.y;
            this.model.position.z = vector.z;
        }
       // console.log("player " + this.id + "(" + this.model.position.x + " " + this.model.position.z + ")");
        return true;
    }
}

function getSocketPosition(player) {
    let re = new THREE.Vector3(player.model.position.x, player.model.position.y, player.model.position.z);
    //re.x += 0.05;
    //re.z += 0.05;
    return re;
}
