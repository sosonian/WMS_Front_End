import * as THREE from 'three';
<<<<<<< HEAD
import { Geometry, Loader } from 'three';
import { async } from 'q';
import { resolve } from 'dns';

class sideRuler {
    constructor(point1,point2,cameraDistance,objectID){    
=======
import { Geometry } from 'three';

class sideRuler {
    constructor(point1,point2,cameraDistance){    
>>>>>>> EstablishObjectCreationModule
        //console.log('sideRuler testParameter : ',point1, point2, cameraDistance)
        this.rulerPoint1 = new THREE.Vector3(point1.x-1,point1.y,point1.z)
        this.rulerPoint2 = new THREE.Vector3(point2.x-1,point2.y,point2.z)
        this.length = point1.distanceTo(point2)
<<<<<<< HEAD
        this.material = new THREE.MeshBasicMaterial({
            color:0xff7391
        })
        //this.scene = scene

        this.group = new THREE.Group()
=======
>>>>>>> EstablishObjectCreationModule

        //let v1 = new THREE.Vector3(-4,0,-3.5)
        //let v2 = new THREE.Vector3(-4,0,3.5)
        //let v3 = new THREE.Vector3(-3.9,0,-3.5)
        //let v4 = new THREE.Vector3(-3.9,0,3.5)
<<<<<<< HEAD
        this.rulerMainGeometry = this.createRuler(this.rulerPoint1,this.rulerPoint2)
        //let resultRulerGeometry = await this.createMeasureMainProcess(this.rulerPoint1,this.rulerPoint2,this.length,this.rulerMainGeometry)
        //this.rulerMesh = new THREE.Mesh(resultRulerGeometry, this.material)
        this.rulerMeshName = 'sideRuler'+objectID
        //this.group.add(rulerMesh)
    
    }

    createRuler=(point1,point2)=>{
        let ruler = new THREE.Geometry()
        let point3 = new THREE.Vector3(point1.x+0.1,point1.y,point1.z)
        let point4 = new THREE.Vector3(point2.x+0.1,point2.y,point2.z)
        ruler.vertices.push(point1, point2,point3, point4)
 
        let face1 = new THREE.Face3(0,1,2)
        let face2 = new THREE.Face3(2,1,3)
        ruler.faces.push(face1,face2)
        return ruler
    }

    createMeasureMainProcess= async (point1,point2,length,rulerGeometry, name) =>{
=======
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
>>>>>>> EstablishObjectCreationModule
        
        if(length && length >0)
        {
           let lineType = this.detectLineDirectionType(point1,point2)
<<<<<<< HEAD
           //console.log("lineType : ", lineType)
           if(lineType === 'z')
           {
               let unitPoints = this.calculatePointsOnZAxis(point1,point2)
               //console.log('unitPoints : ')
               //console.log(unitPoints)
               let output = await this.createMeasureMainPoints(point1,unitPoints,rulerGeometry)
               //console.log('createMeasureMainProcess ouput')
               //console.log(output)
               return output
=======
           console.log("lineType : ", lineType)
           if(lineType === 'z')
           {
               let unitPoints = this.calculatePointsOnZAxis(point1,point2)
               console.log('unitPoints : ')
               console.log(unitPoints)

>>>>>>> EstablishObjectCreationModule
           }
        }
    }

    calculatePointsOnZAxis=(point1,point2)=>{
        let measureUnitPoints = []
<<<<<<< HEAD
        let count = Number(point2.z)
        while(count >= point1.z)
        {
            let point = new THREE.Vector3(point2.x, point2.y, Number(count))
            measureUnitPoints.push(point)
            count = count -1
        }
        return measureUnitPoints
    }

    createMeasureMainPoints= async (point1,pointArray,mergeRulerGeometry)=>{
        let count = 0
        while(count<pointArray.length)
        {
            //console.log('createMeasureMainPoints while loop count : ', count)
            let measureUnitP1 = new THREE.Vector3(pointArray[count].x-0.2,pointArray[count].y,pointArray[count].z-0.1)
            let measureUnitP2 = new THREE.Vector3(pointArray[count].x-0.2,pointArray[count].y,pointArray[count].z)
            let measureUnitP3 = new THREE.Vector3(pointArray[count].x,pointArray[count].y,pointArray[count].z)
            let measureUnitP4 = new THREE.Vector3(pointArray[count].x,pointArray[count].y,pointArray[count].z-0.1)
            let measureUnitPoint = new THREE.Geometry()
            measureUnitPoint.vertices.push(measureUnitP1, measureUnitP2, measureUnitP3, measureUnitP4)
 
            let face1 = new THREE.Face3(0,1,2)
            let face2 = new THREE.Face3(0,2,3)
            measureUnitPoint.faces.push(face1,face2)
            mergeRulerGeometry.merge(measureUnitPoint)
            //console.log('createMeasureMainPoints mergeRulerGeometry 1')
            //console.log(mergeRulerGeometry)
            let numberMesh = await this.createMeasureMainPointsNumber(pointArray[count],count)
            //console.log('numberMesh : ', numberMesh)
            //this.group.add(numberMesh)
            mergeRulerGeometry.mergeMesh(numberMesh)
            

            count = count +1
        }
        //console.log('createMeasureMainPoints mergeRulerGeometry 2')
        //console.log(mergeRulerGeometry)
        return mergeRulerGeometry
    }

    createMeasureMainPointsNumber=(point,index)=>{
        //console.log('createMeasureMainPointsNumber process')
        let material = new THREE.MeshBasicMaterial({
            color:0xff7391,
            side:THREE.DoubleSide
        })

        let fontLoader = new THREE.FontLoader()
        return new Promise(resolve => {
            //console.log('createMeasureMainPointsNumber promise process')
            fontLoader.load('Arial_Regular.json', function(font){
                //console.log('createMeasureMainPointsNumber load process')

                let message = index+'m'
                let shapes = font.generateShapes(message,0.2)
                let fontGeometry = new THREE.ShapeGeometry(shapes)        
                let numberMesh = new THREE.Mesh(fontGeometry,material)

                numberMesh.rotateX(-Math.PI/2)
                numberMesh.position.set(point.x-0.5,point.y,point.z-0.2)
                //console.log('createMeasureMainPointsNumber numberMesh')
                //console.log(numberMesh)
                //scene.add(numberMesh)
                //this.group.add(numberMesh)
                resolve(numberMesh)
            })
        })
    }

    // createMeasureMainPoints=(point1,pointArray,mergeRulerGeometry)=>{
    //     let count = 0
    //     while(count<pointArray.length)
    //     {
    //         let measureUnitP1 = new THREE.Vector3(pointArray[count].x-0.2,pointArray[count].y,pointArray[count].z-0.1)
    //         let measureUnitP2 = new THREE.Vector3(pointArray[count].x-0.2,pointArray[count].y,pointArray[count].z)
    //         let measureUnitP3 = new THREE.Vector3(pointArray[count].x,pointArray[count].y,pointArray[count].z)
    //         let measureUnitP4 = new THREE.Vector3(pointArray[count].x,pointArray[count].y,pointArray[count].z-0.1)
    //         let measureUnitPoint = new THREE.Geometry()
    //         measureUnitPoint.vertices.push(measureUnitP1, measureUnitP2, measureUnitP3, measureUnitP4)
 
    //         let face1 = new THREE.Face3(0,1,2)
    //         let face2 = new THREE.Face3(0,2,3)
    //         measureUnitPoint.faces.push(face1,face2)
    //         mergeRulerGeometry.merge(measureUnitPoint)
    //         this.createMeasureMainPointsNumber(pointArray[count],count,this.scene)
    //         count = count +1
    //     }
    //     return mergeRulerGeometry
    // }

    // createMeasureMainPointsNumber=(point,index,scene)=>{
    //     let material = new THREE.MeshBasicMaterial({
    //         color:0xff7391,
    //         side:THREE.DoubleSide
    //     })

    //     let fontLoader = new THREE.FontLoader()
    //     fontLoader.load('Arial_Regular.json', function(font){

    //         let message = index+'m'
    //         let shapes = font.generateShapes(message,0.2)
    //         let fontGeometry = new THREE.ShapeGeometry(shapes)        
    //         let numberMesh = new THREE.Mesh(fontGeometry,material)

    //         numberMesh.rotateX(-Math.PI/2)
    //         numberMesh.position.set(point.x-0.5,point.y,point.z-0.2)
    //         scene.add(numberMesh)
    //         // this.group.add(numberMesh)
    //     })
    // }

=======
        let count = Number(point1.z)
        while(count <= point2.z)
        {
            let point = new THREE.Vector3(point1.x, point1.y, Number(count+1))
            measureUnitPoints.push(point)
            count = count +1
        }
        return measureUnitPoints
    }

>>>>>>> EstablishObjectCreationModule
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