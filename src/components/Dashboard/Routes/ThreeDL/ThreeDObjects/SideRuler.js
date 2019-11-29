import * as THREE from 'three';
import { Geometry } from 'three';

class sideRuler {
    constructor(point1,point2,cameraDistance){    
        //console.log('sideRuler testParameter : ',point1, point2, cameraDistance)
        this.rulerPoint1 = new THREE.Vector3(point1.x-1,point1.y,point1.z)
        this.rulerPoint2 = new THREE.Vector3(point2.x-1,point2.y,point2.z)
        this.length = point1.distanceTo(point2)

        //let v1 = new THREE.Vector3(-4,0,-3.5)
        //let v2 = new THREE.Vector3(-4,0,3.5)
        //let v3 = new THREE.Vector3(-3.9,0,-3.5)
        //let v4 = new THREE.Vector3(-3.9,0,3.5)
        this.createRuler(this.rulerPoint1,this.rulerPoint2)
        this.createMeasureMainProcess(this.rulerPoint1,this.rulerPoint2,this.length)


        
        
    }

    createRuler=(point1,point2)=>{
        this.ruler = new THREE.Geometry()
        let point3 = new THREE.Vector3(point1.x+0.1,point1.y,point1.z)
        let point4 = new THREE.Vector3(point2.x+0.1,point2.y,point2.z)
        this.ruler.vertices.push(point1, point2,point3, point4)
 
        let face1 = new THREE.Face3(0,1,2)
        let face2 = new THREE.Face3(1,2,3)
        this.ruler.faces.push(face1,face2)
    }

    createMeasureMainProcess=(point1,point2,length)=>{
        
        if(length && length >0)
        {
           let lineType = this.detectLineDirectionType(point1,point2)
           console.log("lineType : ", lineType)
           if(lineType === 'z')
           {
               let unitPoints = this.calculatePointsOnZAxis(point1,point2)
               console.log('unitPoints : ')
               console.log(unitPoints)

           }
        }
    }

    calculatePointsOnZAxis=(point1,point2)=>{
        let measureUnitPoints = []
        let count = Number(point1.z)
        while(count <= point2.z)
        {
            let point = new THREE.Vector3(point1.x, point1.y, Number(count+1))
            measureUnitPoints.push(point)
            count = count +1
        }
        return measureUnitPoints
    }

    detectLineDirectionType=(point1,point2)=>{
        let lineType = 'Unknown'
        if(point1.x-point2.x !== 0 && point1.y-point2.y === 0 && point1.z-point2.z === 0)
        {
            lineType = "x"
        }
        else if(point1.x-point2.x === 0 && point1.y-point2.y !==0 && point1.z-point2.z === 0)
        {
            lineType = "y"
        }
        else if(point1.x-point2.x === 0 && point1.y-point2.y === 0 && point1.z-point2.z !== 0)
        {
            lineType = "z"
        }
        else
        {
            lineType = "any"
        }
        return lineType
    }

}

export default sideRuler