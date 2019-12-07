import * as THREE from 'three';
import { Geometry } from 'three';

class StorageSquareLayerOutline {
    constructor(position,width){
        // this.v1 = new THREE.Vector3(position.x-width/2,position.y,position.z-width/2)
        // this.v2 = new THREE.Vector3(position.x-width/2,position.y,position.z+width/2)
        // this.v3 = new THREE.Vector3(position.x+width/2,position.y,position.z+width/2)
        // this.v4 = new THREE.Vector3(position.x+width/2,position.y,position.z-width/2)

        this.v1 = new THREE.Vector3(0-width/2,0,0-width/2)
        this.v2 = new THREE.Vector3(0-width/2,0,0+width/2)
        this.v3 = new THREE.Vector3(0+width/2,0,0+width/2)
        this.v4 = new THREE.Vector3(0+width/2,0,0-width/2)

        this.layout = new THREE.Geometry()
        this.layout.vertices.push(this.v1, this.v2, this.v3, this.v4)
        
        let color = new THREE.Color(0xffaa00)

        let face1 = new THREE.Face3(0,1,2)
        let face2 = new THREE.Face3(2,3,0)
        this.layout.faces.push(face1)
        this.layout.faces.push(face2)
    }
}

export default StorageSquareLayerOutline