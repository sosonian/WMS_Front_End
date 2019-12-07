import * as THREE from 'three';


class SideRulerClass extends THREE.Group {
    constructor(point1,point2,cameraDistance,objectID,font){    
        this.rulerPoint1 = new THREE.Vector3(point1.x-1,point1.y,point1.z)
        this.rulerPoint2 = new THREE.Vector3(point2.x-1,point2.y,point2.z)
        this.rulerLength = point1.distanceTo(point2)
        this.rulerFont = font
        this.rulerMaterial = new THREE.MeshBasicMaterial({
            color:0xff7391
        })
        this.class = 'SideRuler'
        this.rulerSizeToken
        
    }

    getRulerSizeToken=(cameraDistance)=>{
        if(cameraDistance)
        {
            
        }
    }

    createRulerBody=(point1,point2)=>{
        let ruler = new THREE.Geometry()
        let point3 = new THREE.Vector3(point1.x+0.1,point1.y,point1.z)
        let point4 = new THREE.Vector3(point2.x+0.1,point2.y,point2.z)
        ruler.vertices.push(point1, point2,point3, point4)
 
        let face1 = new THREE.Face3(0,1,2)
        let face2 = new THREE.Face3(2,1,3)
        ruler.faces.push(face1,face2)
        return ruler
    }


}

export default SideRulerClass