import React, { Component } from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import orbControls from './OrbitControls';
import StorageLayer from './ThreeDObjects/StorageLayer';
import ControllerUnitLayout from './ControllerUnit/ControllerUnitLayout'
//import ControllerUnitContainer from './ControllerUnit/ControllerUnitContainer'

class ThreeDRender extends Component{
  constructor(props) {
    super(props)
    this.state = {
      orbitControlMode : false,
      canvasSize:{
        width:0,
        height:0
      },
      mousePos:{
        x:0,
        y:0
      },
      offset:{
        top:0,
        left:0
      },
      rotationValue:0.01,
      
    }
  }
  
  componentDidMount(){
  //  console.log('ThreeDRender componentDidMount !')
    //console.log(this.props.containerSize)

    this.deployState();

    this.rect = this.mount.getBoundingClientRect()
    this.renderer1 = new THREE.WebGLRenderer()
    this.renderer1.setClearColor(0xeeeeee, 1.0)
    
    this.setState({
       canvasSize:{
         width:this.mount.clientWidth,
         height:this.mount.clientHeight
       },
       offset:{
         top:this.rect.top,
         left:this.rect.left
       }
    })
    //const width = this.mount.clientWidth
    //const height = this.mount.clientHeight
    this.renderer1.setSize(this.mount.clientWidth, this.mount.clientHeight)

    this.renderer2 = new THREE.WebGLRenderer()
    this.renderer2.setClearColor(0xeeeeee, 1.0)

    this.renderer3 = new THREE.WebGLRenderer()
    this.renderer3.setClearColor(0xeeeeee, 1.0)
    
    const width1 = this.frontViewRef.clientWidth
    const height1 = this.frontViewRef.clientHeight-25
    const width2 = this.sideViewRef.clientWidth
    const height2 = this.sideViewRef.clientHeight-25
    
    this.renderer2.setSize(width1, height1)
    this.renderer3.setSize(width2, height2)

    this.scene = new THREE.Scene()
    this.camera1 = new THREE.PerspectiveCamera(
      100,
      this.mount.clientWidth / this.mount.clientHeight,
      0.1,
      1000
    )
    this.camera1.position.z =4
    this.camera1.position.x =0
    this.camera1.position.y =1

    this.camera2 = new THREE.PerspectiveCamera(
      70,
      width1 / height1,
      0.1,
      1000
    )
    this.camera2.position.z =10
    this.camera2.position.x =0
    this.camera2.position.y =1
    this.camera2.lookAt(0,0,0)

    this.camera3 = new THREE.PerspectiveCamera(
      70,
      width2 / height2,
      0.1,
      1000
    )
    this.camera3.position.z =0
    this.camera3.position.x =-10
    this.camera3.position.y =1
    this.camera3.lookAt(0,0,0)

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

    this.mount.appendChild(this.renderer1.domElement)
    this.frontViewRef.appendChild(this.renderer2.domElement)
    this.sideViewRef.appendChild(this.renderer3.domElement)
    this.animate()
    this.handleResize()
    //window.addEventListener('resize', this.handleResize)
    
  }

  componentDidUpdate(preProps, preState){
    //if(preState !== this.state)
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
    if(preProps.containerSize !== this.props.containerSize)
    {
      this.handleResize()
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.refPP)
    //this.mount.removeChild(this.renderer1.domElement)
    //this.subMount2.refDom.removeChild(this.renderer2.domElement)
  }

  getFrontViewRef=()=>{
    if(this.state.frontViewConID !== -1)
    {
      this.frontViewRef= this.mountrefControllerUnitLayout
    }
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
    this.plane.rotation.x += this.state.rotationValue
 
    let c1Background = new THREE.Color('rgb(255,255,255)')
    this.renderer1.setClearColor(c1Background)
    this.renderer1.render(this.scene, this.camera1)

    let c2Background = new THREE.Color('rgb(255,255,255)')
    this.renderer2.setClearColor(c2Background)
    this.renderer2.render(this.scene, this.camera2)

    let c3Background = new THREE.Color('rgb(255,255,255)')
    this.renderer3.setClearColor(c3Background)
    this.renderer3.render(this.scene, this.camera3)


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
    this.rect = this.mount.getBoundingClientRect()
      this.setState({
        canvasSize:{
          width:this.props.containerSize.width,
          height:this.props.containerSize.height
        },
        offset:{
          top:this.rect.top,
          left:this.rect.left
        }
      })
     
      const width1 = this.frontViewRef.clientWidth;
      const height1 = this.frontViewRef.clientHeight-25;

      const width2 = this.sideViewRef.clientWidth;
      const height2 = this.sideViewRef.clientHeight-25;

      this.renderer1.setSize(this.mount.clientWidth, this.mount.clientHeight);
      this.camera1.aspect = this.mount.clientWidth / this.mount.clientHeight;

      //const width2 = 196
      //const height2 = 176

     this.renderer2.setSize(width1, height1);
     this.camera2.aspect = width1 / height1;

     this.renderer3.setSize(width2, height2);
     this.camera3.aspect = width2 / height2;

     this.camera1.updateProjectionMatrix();
     this.camera2.updateProjectionMatrix();
     this.camera3.updateProjectionMatrix();
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
      //let rect = this.mount.getBoundingClientRect()
      mouseToken.x = ((e.clientX-this.rect.left)/this.mount.clientWidth)*2-1
      mouseToken.y = -((e.clientY-this.rect.top)/this.mount.clientHeight)*2+1
      rayCaster.setFromCamera(mouseToken, this.camera1)

      let intersects = rayCaster.intersectObjects(this.scene.children)
      for(var i =0; i <intersects.length; i++)
      {
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
      this.setState({
        orbitControlMode : true,
        mousePos:{
          x:e.clientX-this.rect.left,
          y:e.clientY-this.rect.top
        }
      })
    }
    else
    {
      this.setState({
        mousePos:{
          x:e.clientX-this.rect.left,
          y:e.clientY-this.rect.top
        }
      })    
    }
  }

  getRotationValue=(value)=>{
    this.setState((prevProps, prevState)=>{
      if(prevState.rotationValue !== this.state.rotationValue)
      {
        this.state.rotationValue=value
      }
    })
  }

  frontViewChange = (msg) =>{
    const width = this.frontViewRef.clientWidth;
    const height = this.frontViewRef.clientHeight-25;
    this.renderer2.setSize(width, height);
    this.camera2.aspect = width / height;
  }

  sideViewChange = (msg) =>{
    const width = this.sideViewRef.clientWidth;
    const height = this.sideViewRef.clientHeight-25;
    this.renderer3.setSize(width, height);
    this.camera3.aspect = width / height;
  }

  getFrontView =(refDom)=>{
    //console.log('ThreeDRender getFrontView refDom :')
    //console.log(refDom)
    this.frontViewRef = refDom
  }

  getSideView =(refDom)=>{
    //console.log('ThreeDRender getFrontView refDom :')
    //console.log(refDom)
    this.sideViewRef = refDom
  }

  render(){
    const sizeProps = this.props.containerSize
  //  console.log('ThreeDRender render receive sizeProps :')
  //  console.log(sizeProps)
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
        <ControllerUnitLayout ref={(refDom)=>{this.refControllerUnitLayout=refDom}} PosX={this.state.mousePos.x} PosY={this.state.mousePos.y} rotationValue={this.getRotationValue} frontView={this.getFrontView} sideView={this.getSideView}offset={this.state.offset} frontViewChange={this.frontViewChange} sideViewChange={this.sideViewChange}/> 
      </div>  
    )
  }
}
export default ThreeDRender
