import * as THREE from "three";
import {WALL_HEIGHT} from "../js/room";

export class KineticControl {
    constructor(domElement) {
        this.colObj = [];
        this.direction = new THREE.Vector3(0, 0, 0);
        this.domElement = domElement;
        this.enable = true;
        this.moveSpeed = 10;
        this.lookSpeed = 0.2;
        this.lockAxisY = false;
        this.enableLook = true;
        this.angleLock = 80;
        this.autoSpeedFactor = 0.0;
        this.oldMouseX = 0;
        this.oldMouseY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.lat = 0;
        this.lon = 0;
        this.angleX = 0;
        this.angleZ = 0;
        this.moveW = false;
        this.moveS = false;
        this.moveA = false;
        this.moveD = false;
        this.halfX = this.domElement.offsetWidth / 2;
        this.halfY = this.domElement.offsetHeight / 2;
        this.pickMouse = new THREE.Vector2();
       
    }


    setPlayer(player) {
        this.player = player;
    }

    setCamera(camera) {
        this.camera = camera;
    }

    regist() {
        console.log(this.player);
        let playerSize = (new THREE.Box3().setFromObject(this.player.model)).getSize();
        this.camera.position.set(this.player.model.position.x, playerSize.y, this.player.model.position.z);

        if (this.domElement !== document) {
            this.domElement.setAttribute("tabindex", "-1");
        }
        this.bonMouseMove = this.bind(this, this.onMouseMove);
        this.bonKeyDown = this.bind(this, this.onKeyDown);
        this.bonKeyUp = this.bind(this, this.onKeyUp);
        this.bonTestForPick = this.bind(this,this.testForPick);
        this.domElement.addEventListener("contextmenu", KineticControl.contextMenu, false);
        this.domElement.addEventListener("mousemove", this.bonMouseMove, false);
        window.addEventListener("keydown", this.bonKeyDown, false);
        window.addEventListener("keyup", this.bonKeyUp, false);
        window.addEventListener("click", this.bonTestForPick, false);
    }

    addCollision(obj) {
        this.colObj.push(obj);
    }

    testForPick(e) {
        let ray = new THREE.Raycaster();
        ray.setFromCamera(this.pickMouse,this.camera);
        let pickResult = ray.intersectObjects(this.colObj);
        if (pickResult.length > 0) {
            let fObj = pickResult[0].object;
            console.log(fObj.craft);
            if(fObj.craft != undefined) {
                let craft = fObj.craft;
                if (this.player.isKeyCondition) {
                    if (craft.isDoor) {
                        console.log("success");
                        //fObj.position.y -= (WALL_HEIGHT * 2);
                        if(craft.door.enable) {
                            craft.door.openIt();
                            this.control.showNote("该门已经被打开")
                            this.player.keyNum--;
                            this.control.socket.emit("unlock",craft.door.id);
                        }
                        else {
                            this.control.showNote("此门是边界 无法打开");
                        }
                      //  let timer = setInterval( () => this.openTheDoor(timer,fObj),25);
                    }
                    else {
                        this.control.showNote("你未选择一扇门");
                    }
                    this.player.isKeyCondition = false;
                }
                else {
                    if(this.player.isVoteCondition) {
                        if(craft.pickable) {
                            this.control.changeInv(this.control.ui_voteCraft[this.player.index].name,craft.name,true,this.player.id);

                        }
                    }

                }
            }
            
        }

    }

    openTheDoor(timer,obj) {
        obj.position.y -= 0.5;
        if(obj.position.y <= -WALL_HEIGHT * 1.5) {
            clearInterval(timer);
        }
    }

    testForCollision(model, dx, dy, dz) {
        let originPoint = model.position.clone();
        originPoint.x += dx;
        originPoint.y += dy;
        originPoint.z += dz;

        for (let vertexIndex = 0; vertexIndex < model.geometry.vertices.length; vertexIndex++) {
            let localVertex = model.geometry.vertices[vertexIndex].clone();
            let globalVertex = localVertex.applyMatrix4(model.matrix);
            globalVertex.x += dx;
            globalVertex.y += dy;
            globalVertex.z += dz;
            let directionVector = globalVertex.sub(originPoint);
            let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            let collisionResults = ray.intersectObjects(this.colObj);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                return true;
            }
        }
        return false;
    }

    bind(scope, fn) {
        return function () {
            fn.apply(scope, arguments);
        };
    }


    onMouseMove(e) {
        this.mouseX = e.pageX - this.domElement.offsetLeft - this.halfX;
        this.mouseY = e.pageY - this.domElement.offsetTop - this.halfY;
        this.pickMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.pickMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case 87:
                this.moveW = true;
                break; // w
            case 65:
                this.moveA = true;
                break; // a
            case 83:
                this.moveS = true;
                break; // s 
            case 68:
                this.moveD = true;
                break; // d
        }
    }

    onKeyUp(e) {
        switch (e.keyCode) {
            case 87:
                this.moveW = false;
                break; // w 
            case 65:
                this.moveA = false;
                break; // a
            case 83:
                this.moveS = false;
                break; // s
            case 68:
                this.moveD = false;
                break; // d
        }
    }

    action(delta) {
        if (!this.enable) return;
        let speed = delta * this.moveSpeed;
        let angle = this.camera.getWorldDirection();
        let dx, dz;
        dx = this.camera.position.x;
        dz = this.camera.position.z;
        if (this.moveW) {
            dx += speed * angle.x;
            dz += speed * angle.z;
        }
        if (this.moveS) {
            dx -= speed * angle.x;
            dz -= speed * angle.z;
        }
        if (this.moveA) {
            dx += speed * angle.z;
            dz -= speed * angle.x;
        }
        if (this.moveD) {
            dx -= speed * angle.z;
            dz += speed * angle.x;
        }
        let collision = this.testForCollision(this.player.model, dx - this.camera.position.x, 0, dz - this.camera.position.z);
        if (!collision) {
            this.camera.position.x = dx;
            this.camera.position.z = dz;
        }
        speed = this.enableLook === true ? delta * this.lookSpeed : 0;
       // if (this.oldMouseX == this.mouseX && this.oldMouseY == this.mouseY) return;
        this.oldMouseX = this.mouseX;
        this.oldMouseY = this.mouseY;
        this.lon += this.mouseX * speed;
        if (!this.lockAxisY) this.lat -= this.mouseY * speed;
        this.lat = Math.max(-this.angleLock, Math.min(this.angleLock, this.lat));
        this.angleX = THREE.Math.degToRad(90 - this.lat);
        this.angleZ = THREE.Math.degToRad(this.lon);
       
        this.direction.x = this.camera.position.x + 100 * Math.sin(this.angleX) * Math.cos(this.angleZ);
        this.direction.y = this.camera.position.y + 100 * Math.cos(this.angleX);
        this.direction.z = this.camera.position.z + 100 * Math.sin(this.angleX) * Math.sin(this.angleZ);

        this.camera.lookAt(this.direction);
    }

    static contextMenu(event) {
        event.preventDefault();
    }
}
