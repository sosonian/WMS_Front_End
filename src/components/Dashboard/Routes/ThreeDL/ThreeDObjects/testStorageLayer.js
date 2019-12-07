import * as THREE from 'three';
import { Geometry } from 'three';

class testStorageSquareLayerOutline extends THREE.Mesh{
    constructor(geometry,material,position,width){
           
        super(geometry,material)
      
        this.material = new THREE.MeshBasicMaterial({color: 0x0000ff})
        this.geometry = this.createGeometry(width)
        this.p1 = this.getWorldPoint(position,width)
        this.p2 = this.getP1(position,width)
        
        
    }

    getP1=(position,width)=>{
        let p1 = {
            x:position-width/2,
            y:position.y,
            z:position-width/2
        }
        return p1
    }

    

    createGeometry=(width)=>{
        let v1 = new THREE.Vector3(0-width/2,0,0-width/2)
        let v2 = new THREE.Vector3(0-width/2,0,0+width/2)
        let v3 = new THREE.Vector3(0+width/2,0,0+width/2)
        let v4 = new THREE.Vector3(0+width/2,0,0-width/2)
        let layout = new THREE.Geometry()
        layout.vertices.push(v1, v2, v3, v4)
        let face1 = new THREE.Face3(0,1,2)
        let face2 = new THREE.Face3(2,3,0)
        layout.faces.push(face1)
        layout.faces.push(face2)
        return layout
    }
}

export default testStorageSquareLayerOutline