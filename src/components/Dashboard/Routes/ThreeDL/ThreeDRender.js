import React, { Component } from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import orbControls from './OrbitControls';
import StorageLayer from './ThreeDObjects/StorageLayer';

class ThreeDRender extends Component{
  constructor(props) {
    super(props)
    this.state = {
      orbitControlMode : false
    }
  }
  
  componentDidMount(){

    this.deployState();
    
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0xeeeeee, 1.0)
    
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.renderer.setSize(width, height)

    this.scene = new THREE.Scene()
    this.camera1 = new THREE.PerspectiveCamera(
      100,
      width / height,
      0.1,
      1000
    )
    this.camera1.position.z =4
    this.camera1.position.x =0
    this.camera1.position.y =1

    this.camera2 = new THREE.PerspectiveCamera(
      70,
      width / height,
      0.1,
      1000
    )
    this.camera2.position.z =5
    this.camera2.position.x =0
    this.camera2.position.y =0

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
    
    this.planeGeo = new StorageLayer()
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff})
    this.plane = new THREE.Mesh(this.planeGeo.layout, material)
    this.plane.material.side = THREE.DoubleSide
    this.scene.add(this.plane)

    

    this.mount.appendChild(this.renderer.domElement)

    this.animate()
    window.addEventListener('resize', this.handleResize)
  }



  
  componentDidUpdate(){
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
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.refPP)
    this.mount.removeChild(this.renderer.domElement)
  }

  deployState = () => {
    this.stats = new Stats()
    this.stats.setMode(0) // FPS mode
    this.stats.domElement.style.position = 'absolute'
    this.mount.appendChild(this.stats.domElement)
  }

  orbitControlSet = () => {
    this.cameraControl = new orbControls(this.camera1)
  }

  animate = () => {
    this.stats.begin();
    //this.plane.rotation.x += 0.01
    //this.plane.rotation.y += 0.01
    this.renderer.setViewport(0,0,this.mount.clientWidth*0.5,this.mount.clientHeight*1)
    this.renderer.setScissor(0,0,this.mount.clientWidth*0.5,this.mount.clientHeight*1)
    this.renderer.setScissorTest( true );
    let c1Background = new THREE.Color('rgb(255,255,255)')
    this.renderer.setClearColor(c1Background)
    this.renderer.render(this.scene, this.camera1)
    this.renderer.setViewport(this.mount.clientWidth*0.5,0,this.mount.clientWidth*0.5,this.mount.clientHeight*1)
    this.renderer.setScissor(this.mount.clientWidth*0.5,0,this.mount.clientWidth*0.5,this.mount.clientHeight*1)
    this.renderer.setScissorTest( true );
    let c2Background = new THREE.Color('rgb(203,242,255)')
    this.renderer.setClearColor(c2Background)
    this.renderer.render(this.scene, this.camera2)


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
     this.camera1.aspect = width / height;

     console.log('aspect of camera1 : '+this.camera1.aspect)

     this.camera1.updateProjectionMatrix();
   }

  threeDLayerMouseDown = (e) => {
    if(this.cameraControl !== undefined)
    {
    }
    else
    {
    }

    if(e.altKey)
    {
      this.setState({orbitControlMode : true})
    }
    else
    {
      const rayCaster = new THREE.Raycaster()
      const mouseToken = new THREE.Vector2()
      let rect = this.mount.getBoundingClientRect()
      mouseToken.x = (2*(e.clientX-rect.left)/this.mount.clientWidth)*2-1
      mouseToken.y = -((e.clientY-rect.top)/this.mount.clientHeight)*2+1
      rayCaster.setFromCamera(mouseToken, this.camera1)

      let intersects = rayCaster.intersectObjects(this.scene.children)
      for(var i =0; i <intersects.length; i++)
      {
        console.log('find object !')
        if(intersects[i].object.type == 'Mesh')
        {
          intersects[i].object.material.color.set(0x13D73F)
        }        
      }
    }
  }

  threeDLayerMouseUp = (e) => {
    if(this.cameraControl !== undefined)
    {
    }
    else
    {
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
export default ThreeDRender
