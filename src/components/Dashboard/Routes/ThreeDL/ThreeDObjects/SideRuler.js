import * as THREE from 'three';
import { Geometry } from 'three';

class sideRuler {
    constructor(point1,point2,cameraDistance){
        this.point1 = point1
        this.point2 = point2
        
        console.log('sideRuler testParameter : ',point1, point2, cameraDistance)


        let v1 = new THREE.Vector3(-4,0,-3.5)
        let v2 = new THREE.Vector3(-4,0,3.5)
        let v3 = new THREE.Vector3(-3.9,0,-3.5)
        let v4 = new THREE.Vector3(-3.9,0,3.5)

        this.ruler = new THREE.Geometry()
        this.ruler.vertices.push(v1, v2, v3, v4)
        
        

        let face1 = new THREE.Face3(0,1,2)
        let face2 = new THREE.Face3(3,2,1)
        this.ruler.faces.push(face1)
        this.ruler.faces.push(face2)
    }
}

export default sideRuler