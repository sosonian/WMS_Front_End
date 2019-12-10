import * as THREE from 'three';
import RulerClass from './RulerClass'



class SideRulerClass extends THREE.Group {
    constructor(point1,point2,cameraDistance,objectID,font){   
        super() 
        this.rulerPoint1 = new THREE.Vector3(point1.x-1,point1.y,point1.z)
        this.rulerPoint2 = new THREE.Vector3(point2.x-1,point2.y,point2.z)
        this.rulerLength = this.getRulerLength(point1,point2)
        this.rulerFont = font
        this.rulerMaterial = new THREE.MeshBasicMaterial({
            color:0xff7391
        })
        this.class = 'SideRuler'
        this.rulerSizeToken = this.getRulerSizeToken(cameraDistance)
        this.name = 'sideRuler'+objectID
         

        this.groupObject()
    }

    groupObject=()=>{
        let rulerMainBody =this.createRulerBody(this.rulerPoint1,this.rulerPoint2,this.rulerSizeToken)
        if(rulerMainBody)
        {
            this.add(rulerMainBody)
        }
    }

    rulerSizeChange=(cameraDistance)=>{
        //console.log('rulerSizeChange')
        //console.log(cameraDistance)
        let sizeToken = this.getRulerSizeToken(cameraDistance)*0.1

        if(this.children[0].geometry)
        {
            
            //console.log(sizeToken)
            //onsole.log(this.rulerMainBody.geometry.vertices[2])
            this.children[0].geometry.vertices[2].set(this.rulerPoint1.x-sizeToken,this.rulerPoint1.y,this.rulerPoint1.z)
            this.children[0].geometry.vertices[3].set(this.rulerPoint2.x-sizeToken,this.rulerPoint2.y,this.rulerPoint2.z)
            this.children[0].geometry.verticesNeedUpdate = true
        }
    }



    getRulerLength=(p1,p2)=>{
        let dx = p1.x-p2.x
        let dy = p1.y-p2.y
        let dz = p1.z-p2.z

        return Math.sqrt(dx*dx+dy*dy+dz*dz)
    }

    getRulerSizeToken=(cameraDistance)=>{
        if(cameraDistance)
        {
            if(12>=cameraDistance && cameraDistance>=0)
            {
                return 1
            }
            if(11>=cameraDistance && cameraDistance>10)
            {
                return 1.2
            }
            if(12>=cameraDistance && cameraDistance>11)
            {
                return 1.3
            }
            if(13>=cameraDistance && cameraDistance>12)
            {
                return 1.4
            }
            if(14>=cameraDistance && cameraDistance>13)
            {
                return 1.5
            }
            if(15>=cameraDistance && cameraDistance>14)
            {
                return 1.7
            }
            if(16>=cameraDistance && cameraDistance>15)
            {
                return 1.9
            }
            if(17>=cameraDistance && cameraDistance>16)
            {
                return 2.1
            }
            if(18>=cameraDistance && cameraDistance>17)
            {
                return 2.3
            }
            if(cameraDistance>18)
            {
                return 2.5
            }
        }
        else
        {
            return null
        }
    }



    createRulerBody=(point1,point2,sizeToken)=>{
        let ruler = new THREE.Geometry()
        let sizeNumber = 0.1*sizeToken
        let point3 = new THREE.Vector3(point1.x-sizeNumber,point1.y,point1.z)
        let point4 = new THREE.Vector3(point2.x-sizeNumber,point2.y,point2.z)
        ruler.vertices.push(point1, point2,point3, point4)
 
        let face1 = new THREE.Face3(0,1,2)
        let face2 = new THREE.Face3(2,1,3)
        ruler.faces.push(face1,face2)
        let mainBodyMesh = new THREE.Mesh(ruler, this.rulerMaterial)
        mainBodyMesh.material.side = THREE.DoubleSide
        ruler.dispose()
        return mainBodyMesh
    }

    createRulerScale=(point1,point2,length,sizeToken)=>{
        let output = null
        if(length && length >0)
        {
           let lineType = this.detectLineDirectionType(point1,point2)
           //console.log("lineType : ", lineType)
           if(lineType === 'z')
           {
               let unitPoints = this.calculatePointsOnZAxis(point1,point2,sizeToken)
               //console.log('unitPoints : ')
               //console.log(unitPoints)
               if(this.children[0].geometry)
               {
                   output =  this.createMeasureMainPoints(unitPoints,this.children[0].geometry)
                   //let rulerMesh = new RulerClass(output, this.material)
                   //rulerMesh.name = this.rulerMeshName
                   unitPoints = null
                   this.children[0].geometry.dispose()
                   //output.dispose()
                   
               }
           }
        }
        return output
    }

    calculatePointsOnZAxis=(point1,point2,sizeToken)=>{
        let measureUnitPoints = []
        let count = Number(point2.z)
        let scaleSize = 1
        if(1.5>=sizeToken && sizeToken >=0)
        {
            scaleSize = 1
        }
        else if(2 >= sizeToken && sizeToken > 1.5)
        {
            scaleSize = 2
        }
        else if(sizeToken>2)
        {
            scaleSize = 5
        }

        while(count >= point1.z)
        {
            let point = new THREE.Vector3(point2.x, point2.y, Number(count))
            measureUnitPoints.push(point)
            count = count -scaleSize
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

export default SideRulerClass 