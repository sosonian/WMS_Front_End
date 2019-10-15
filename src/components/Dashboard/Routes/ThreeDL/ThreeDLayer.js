import React, { Component } from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import orbControls from './OrbitControls';

class ThreeDLayer extends Component{
  constructor(props) {
    super(props)
    this.state = {
      orbitControlMode : false
    }
  }
  
  
  componentDidMount(){

    //const stats = new Stats()
    //stats.setMode(0) // FPS mode
    //stats.domElement.style.position = 'absolute'

    this.deployState();
    
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0xeeeeee, 1.0)
    
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.renderer.setSize(width, height)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z =5

    if(this.state.orbitControlMode)
    {
      if(this.cameraControl !== undefined)
      {       
        this.cameraControl.enabled = false
      }
      else
      {
        this.orbitControlSet()
      }
    }
    else
    {
      if(this.cameraControl !== undefined)
      {
        this.cameraControl.enabled = false
      }
    }
    

    const axes = new THREE.AxesHelper(20)
    this.scene.add(axes)

    this.sceneGrid = new THREE.GridHelper(10,10)
    this.scene.add(this.sceneGrid)
    
    
    this.mount.appendChild(this.renderer.domElement)
    
    
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff})
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    this.animate()
    window.addEventListener('resize', this.handleResize)

  }

  componentDidUpdate(){
    //console.log('component has been updated!')
    //console.log('orbit control mode is :')
    //console.log(this.state.orbitControlMode)
    if(this.state.orbitControlMode)
    {
      if(this.cameraControl !== undefined)
      {       
        this.cameraControl.enabled = true
      }
      else
      {
        this.orbitControlSet()
      }
    }
    else
    {
      if(this.cameraControl !== undefined)
      {
        this.cameraControl.enabled = false
      }
    }
    this.handleResize()
    //console.log('ThreeDLayer property has been change!')
  }

  deployState = () => {
    this.stats = new Stats()
    this.stats.setMode(0) // FPS mode
    this.stats.domElement.style.position = 'absolute'
    this.mount.appendChild(this.stats.domElement)
  }


  orbitControlSet = () => {
    this.cameraControl = new orbControls(this.camera)
  }

  animate = () => {
    this.stats.begin();
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.renderer.render(this.scene, this.camera)

    if(this.state.orbitControlMode)
    {
      if(this.cameraControl !== undefined)
      {       
        this.cameraControl.enabled = true
        this.cameraControl.update();
      }
    }
    
    this.stats.end();
    this.refPP = window.requestAnimationFrame(this.animate)
  }

   handleResize = () => {
     const width = this.mount.clientWidth;
     const height = this.mount.clientHeight;

     this.renderer.setSize(width, height);
     this.camera.aspect = width / height;

     this.camera.updateProjectionMatrix();
   }

  threeDLayerMouseDown = (e) => {
    //console.log('start control 3D!')
    if(this.cameraControl !== undefined)
    {
      //console.log(this,this.cameraControl)
    }
    else
    {
      //console.log("No 3D cameraControl !")
    }


    if(e.altKey)
    {
      //console.log('3D Ctrl has been pressed!')
      this.setState({orbitControlMode : true})
    }
    else
    {
      const rayCaster = new THREE.Raycaster()
      const mouseToken = new THREE.Vector2()
      let rect = this.mount.getBoundingClientRect()
      mouseToken.x = ((e.clientX-rect.left)/this.mount.clientWidth)*2-1
      mouseToken.y = -((e.clientY-rect.top)/this.mount.clientHeight)*2+1
      
      

      console.log('mouse down')
      console.log(e.clientX+' : '+e.clientY)
      console.log(rect.left+' : '+rect.top)
      rayCaster.setFromCamera(mouseToken, this.camera)

      let intersects = rayCaster.intersectObjects(this.scene.children)
      for(var i =0; i <intersects.length; i++)
      {
        console.log('find object !')
        //console.log(intersects[i].object.type)
        if(intersects[i].object.type == 'Mesh')
        {
          intersects[i].object.material.color.set(0x13D73F)
        }        
      }
    }
  }

  threeDLayerMouseUp = (e) => {
    //console.log('3D Mouse Up!')
    if(this.cameraControl !== undefined)
    {
      //console.log(this,this.cameraControl)
    }
    else
    {
      //console.log("No cameraControl !")
    }
    this.setState({orbitControlMode : false})
  }

  ThreeDLayerMouseMove = (e) => {
    if(e.altKey)
    {   
      this.setState({orbitControlMode : true})
    }
    else
    {
      
    }
  }
  
  render(){
    
    const myStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
    }

    return(
      <div 
        onMouseDown={this.threeDLayerMouseDown}
        onMouseMove={this.ThreeDLayerMouseMove}
        onMouseUp={this.threeDLayerMouseUp}
        style={myStyle}
        ref={(mount) => { this.mount = mount }}
      >

      </div>
      
    )
  }
}
export default ThreeDLayer
