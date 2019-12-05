import * as THREE from 'three';


class RulerClass extends THREE.Mesh {
    constructor(geometry,material){    
        super(geometry,material)
        this.class = 'sideRuler'
    }
}

export default RulerClass