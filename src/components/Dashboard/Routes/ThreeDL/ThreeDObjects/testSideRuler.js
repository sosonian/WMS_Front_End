import * as THREE from 'three';
import { Geometry, Loader } from 'three';

class testSideRuler {
    constructor(){
        
        
    }

    createMeasureMainPointsNumber=(scene)=>{
        console.log('testSideRuler start')
        // let numberAreaP1 = new THREE.Vector3(point.x-0.5,point.y,point.z-0.2)
        // let numberAreaP2 = new THREE.Vector3(point.x-0.5,point.y,point.z)
        // let numberAreaP3 = new THREE.Vector3(point.x-0.3,point.y,point.z)
        // let numberAreaP4 = new THREE.Vector3(point.x-0.3,point.y,point.z-0.2)
        // let numberArea = new THREE.Geometry()
        // numberArea.vertices.push(numberAreaP1, numberAreaP2,  numberAreaP3, numberAreaP4)

        // let face1 = new THREE.Face3(0,1,2)
        // let face2 = new THREE.Face3(0,2,3)
        // numberArea.faces.push(face1,face2)

        let fontLoader = new THREE.FontLoader()
        // let fileLoader = new THREE.FileLoader()
        // fileLoader.load('test.txt',function(data){
        //     console.log('fileLoader data')
        //     console.log(data)
        // },
        // function(xhr){
        //     console.log('fileLoader xhr')
        //     console.log(xhr)

        // },
        // function(err){
        //     console.log('err')
        //     console.log(err)
        // }
        // )

        let material = new THREE.MeshBasicMaterial({
            color:0xff7391,
            side:THREE.DoubleSide
        })

        let output
        
        fontLoader.load('Arial_Regular.json', function(font){
            console.log('load complete')
            let message = 'test'
            let shapes = font.generateShapes(message,1)
            let fontGeometry = new THREE.ShapeGeometry(shapes)

            //fontGeometry.computeBoundingBox();
			//let xMid = - 0.5 * ( fontGeometry.boundingBox.max.x - fontGeometry.boundingBox.min.x );
			fontGeometry.translate(-6, 0, 0);
            let numberMesh = new THREE.Mesh(fontGeometry,material)

            
            numberMesh.rotateX(-Math.PI/2)
            
            console.log('fontShape : ')
            console.log( shapes)
            
            output= numberMesh

            console.log('output : ')
            console.log(output)
            scene.add(output)

            //this.group.add(numberMesh)
        })
    }
}

export default testSideRuler