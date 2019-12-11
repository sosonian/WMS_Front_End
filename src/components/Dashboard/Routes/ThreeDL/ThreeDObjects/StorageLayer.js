import * as THREE from 'three';

class StorageSquareLayerOutline extends THREE.Mesh{
    constructor(geometry,material,width){
           
        super(geometry,material)
      
        this.material = new THREE.MeshBasicMaterial({color: 0x0000ff,side:THREE.DoubleSide})
        this.geometry = this.createGeometry(width)
        this.p1 = undefined
        this.p2 = undefined
        this.p3 = undefined
        this.p4 = undefined
    }


    getPointWorldPosition=()=>{
        console.log('getPointWorldPosition') 
        
        
        for(let i=0; i<4; i++)
        {
            let tempPoint = new THREE.Vector3(this.geometry.vertices[i].x,this.geometry.vertices[i].y,this.geometry.vertices[i].z)
            let worldPosition = this.localToWorld(tempPoint)
            let output = {
                x:worldPosition.x,
                y:worldPosition.y,
                z:worldPosition.z
            }
            if(i===0)
            {
                this.p1 = output
            }
            else if(i===1)
            {
                this.p2 = output
            }
            else if(i===2)
            {
                this.p3 = output
            }
            else if(i===3)
            {
                this.p4 = output
            }
        }
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

export default StorageSquareLayerOutline