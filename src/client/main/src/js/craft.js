import * as THREE from "three";


export class Craft{
	constructor(id,name,picture,model,pickable) {
		this.id = id;
		this.name = name;
		this.picture = picture;
		this.model = model;
		this.isDoor = false;
		this.pickable = pickable;
	}

	setDoor(door) {
		this.isDoor = true;
		this.door = door;
		this.pickable = false;
	}
	clone() {
		let copy = new Craft(this.id,this.name,this.picture,this.model,this.pickable);
		return copy;
	}


}