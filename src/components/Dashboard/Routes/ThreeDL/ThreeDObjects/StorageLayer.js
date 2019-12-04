import * as THREE from 'three';
import { Geometry } from 'three';

class StorageLayerOutline {
    constructor(){
        this.v1 = new THREE.Vector3(-3.5,0,-3.5)
        this.v2 = new THREE.Vector3(-3.5,0,3.5)
        this.v3 = new THREE.Vector3(3.5,0,-3.5)
        this.v4 = new THREE.Vector3(3.5,0,3.5)

        this.layout = new THREE.Geometry()
        this.layout.vertices.push(this.v1, this.v2, this.v3, this.v4)
        
        let color = new THREE.Color(0xffaa00)

        let face1 = new THREE.Face3(0,1,2)
        let face2 = new THREE.Face3(3,2,1)
        this.layout.faces.push(face1)
        this.layout.faces.push(face2)
    }
}

export default StorageLayerOutline