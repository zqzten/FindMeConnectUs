import * as THREE from "three";

export class Player {
    constructor(name, id, roomX, roomY) {
        this.name = name;
        this.roomX = roomX;
        this.roomY = roomY;
        this.isLocal = false;
       // this.model = model;
        this.id = id;
        this.keyNum = 100;
        this.isOut = false;
        this.isKeyCondition = false;
        this.isVoteCondition = false;
        this.score = 0;
    }

    setAvatar(avaId) {

        this.avatarID = avaId;
        if(avaId == undefined) this.avatarID = 0;
    }
    setOut() {
        this.model.visible = false;
        let timer = setInterval(() => {
            this.model.position.y += 0.5;
            this.camera.position.y += 0.5;
            if(this.model.position.y >= 30){
                clearInterval(timer);
            }

        },25);
        //this.model.position.y = 30;
       // this.camera.position.y = 30;
    }
    setLocal() {
        this.isLocal = true;
    }

    setModel(model) {
        this.model = model;
    }
    setIndex(index) {
        this.index = index;
    }
    addToScene(scene, x, y, z) {
        scene.add(this.model);
        this.model.position.x = x;
        this.model.position.y = y;
        this.model.position.z = z;
    }

    move(camera,x,y,z) {
        let re = true;
        this.camera = camera;
        if (this.isLocal) {
            if(camera.position.x == this.model.position.x && camera.position.z == this.model.position.z) re = false;
            if(!this.isOut) {
                let vector = camera.getWorldDirection();
                //this.model.lookAt()
                this.model.position.x = camera.position.x - vector.x * 0;
                this.model.position.z = camera.position.z - vector.z * 0;
                this.model.rotation.y = (vector.x >= 0 ? Math.acos(vector.z) : Math.PI * 2 - Math.acos(vector.z));
            }
        }
        else {
            let vector = new THREE.Vector3(x,y,z);
            this.model.lookAt(vector);
            //let vector = getSocketPosition(this);
            this.model.position.x = x;
            this.model.position.y = y;
            this.model.position.z = z;
           
        }
       // console.log("player " + this.id + "(" + this.model.position.x + " " + this.model.position.z + ")");
        return re;
    }
}

function getSocketPosition(player) {
    let re = new THREE.Vector3(player.model.position.x, player.model.position.y, player.model.position.z);
    //re.x += 0.05;
    //re.z += 0.05;
    return re;
}
