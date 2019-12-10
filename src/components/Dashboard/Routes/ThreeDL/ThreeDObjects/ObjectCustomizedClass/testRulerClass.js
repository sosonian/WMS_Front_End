import * as THREE from 'three';


class testRulerClass extends THREE.Mesh {
    constructor(geometry,material,point1,point2,cameraDistance,objectID,font){    
        super(geometry,material)
        this.class = 'sideRuler'
        this.rulerPoint1 = new THREE.Vector3(point1.x-1,point1.y,point1.z)
        this.rulerPoint2 = new THREE.Vector3(point2.x-1,point2.y,point2.z)
        this.rulerLength = this.getRulerLength(point1,point2)
        this.rulerFont = font
        this.material = new THREE.MeshBasicMaterial({
            color:0xff7391
        })
        //this.sizeToken = this.getSizeToken(cameraDistance)
        this.geometry = this.createMeasureMainProcess(this.rulerPoint1,this.rulerPoint2,this.rulerLength)
        this.name = 'sideRuler'+objectID
    }

    getRulerLength=(p1,p2)=>{
        let dx = p1.x-p2.x
        let dy = p1.y-p2.y
        let dz = p1.z-p2.z

        return Math.sqrt(dx*dx+dy*dy+dz*dz)
    }

    changeSize=(cameraDistance)=>{
        
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

    createMeasureMainProcess= (point1,point2,length) =>{
        
        if(length && length >0)
        {
           let lineType = this.detectLineDirectionType(point1,point2)
           //console.log("lineType : ", lineType)
           if(lineType === 'z')
           {
               let rulerGeometry = this.createRuler(point1,point2)
               let unitPoints = this.calculatePointsOnZAxis(point1,point2)
               //console.log('unitPoints : ')
               //console.log(unitPoints)
               let output =  this.createMeasureMainPoints(unitPoints,rulerGeometry)
               //let rulerMesh = new RulerClass(output, this.material)
               //rulerMesh.name = this.rulerMeshName
               unitPoints = null
               rulerGeometry.dispose()
               //output.dispose()
               return output
           }
        }
    }

    calculatePointsOnZAxis=(point1,point2)=>{
        let measureUnitPoints = []
        let count = Number(point2.z)
        while(count >= point1.z)
        {
            let point = new THREE.Vector3(point2.x, point2.y, Number(count))
            measureUnitPoints.push(point)
            count = count -1
            point = null
        }
        return measureUnitPoints
    }

    createMeasureMainPoints= (pointArray,mergeRulerGeometry)=>{
        let count = 0
        //let measureUnitPoint = new THREE.Geometry()
        while(count<pointArray.length)
        {
            //console.log('createMeasureMainPoints while loop count : ', count)
            let measureUnitP1 = new THREE.Vector3(pointArray[count].x-0.2,pointArray[count].y,pointArray[count].z-0.05)
            let measureUnitP2 = new THREE.Vector3(pointArray[count].x-0.2,pointArray[count].y,pointArray[count].z)
            let measureUnitP3 = new THREE.Vector3(pointArray[count].x,pointArray[count].y,pointArray[count].z)
            let measureUnitP4 = new THREE.Vector3(pointArray[count].x,pointArray[count].y,pointArray[count].z-0.05)
            let measureUnitPoint = new THREE.Geometry()
            measureUnitPoint.vertices.push(measureUnitP1, measureUnitP2, measureUnitP3, measureUnitP4)
 
            let face1 = new THREE.Face3(0,1,2)
            let face2 = new THREE.Face3(0,2,3)
            measureUnitPoint.faces.push(face1,face2)
            mergeRulerGeometry.merge(measureUnitPoint)
            //console.log('createMeasureMainPoints mergeRulerGeometry 1')
            //console.log(mergeRulerGeometry)
            let numberMesh = this.createMeasureMainPointsNumber(pointArray[count],count)
            //console.log('numberMesh s: ', numberMesh)

            mergeRulerGeometry.mergeMesh(numberMesh)
            
            count = count + 1

            measureUnitP1 = null
            measureUnitP2 = null
            measureUnitP3 = null
            measureUnitP4 = null 
            measureUnitPoint.dispose()
            face1 = null
            face2 = null
            numberMesh.geometry.dispose()
            numberMesh.material.dispose()
            numberMesh = null
            //console.log('numberMesh e: ', numberMesh)
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

        let message = index+'m'
        let shapes = this.rulerFont.generateShapes(message,0.15)
        //console.log(shapes)
        let fontGeometry = new THREE.ShapeGeometry(shapes)    
        //console.log(fontGeometry)    
        let numberMesh = new THREE.Mesh(fontGeometry,material)

        numberMesh.rotateX(-Math.PI/2)
        numberMesh.position.set(point.x-0.4,point.y,point.z-0.1)
        //console.log(numberMesh)

        shapes = null
        material = null
        message = null
        fontGeometry.dispose()
        
        return numberMesh

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

export default testRulerClass