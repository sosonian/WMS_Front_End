import React, { Component } from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import orbControls from './OrbitControls';
import StorageLayer from './ThreeDObjects/StorageLayer';
import ControllerUnitLayout from './ControllerUnit/ControllerUnitLayout'

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
      frontViewShow:false,
      frontViewSize:{
        width:200-4,
        height:200-29
      },
      sideViewShow:false,
      sideViewSize:{
        width:200-4,
        height:200-29
      },
      rotationValue:0.01,      
    }
    //console.log('ThreeDRender constructor')
  }
  
  componentDidMount(){
    //console.log('ThreeDRender componentDidMount')

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
    this.renderer1.setSize(this.mount.clientWidth, this.mount.clientHeight)
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
    
    this.setFrontView()
    this.setSideView()
    this.animate()
    this.handleResize()
  
    
  }

  componentDidUpdate(preProps, preState){
    //console.log('ThreeDRender componentDidUpdate')
    
    this.updateFrontView()
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
    if((preProps.containerSize !== this.props.containerSize))
    {
      this.handleResize()
    }
    
    this.updateFrontView()
    this.updateSideView()

  }

  componentWillUnmount() {
    cancelAnimationFrame(this.refPP)
    //this.mount.removeChild(this.renderer1.domElement)
    //this.subMount2.refDom.removeChild(this.renderer2.domElement)
  }

  setFrontView=()=>{
      this.camera2 = new THREE.PerspectiveCamera(
        70,
        200 / 200,
        0.1,
        1000
      )
      this.camera2.position.z =10
      this.camera2.position.x =0
      this.camera2.position.y =1
      this.camera2.lookAt(0,0,0)
      this.renderer2 = new THREE.WebGLRenderer()
      this.renderer2.setClearColor(0xeeeeee, 1.0) 
  }
  
  updateFrontView=()=>{

    if(this.state.frontViewShow)
    {
      const width = this.state.frontViewSize.width
      const height = this.state.frontViewSize.height
      this.renderer2.setSize(width, height)
      this.frontViewRef.appendChild(this.renderer2.domElement)
    }
  }

  setSideView=()=>{
      this.camera3 = new THREE.PerspectiveCamera(
        70,
        200 / 200,
        0.1,
        1000
      )
      this.camera3.position.z =0
      this.camera3.position.x =-10
      this.camera3.position.y =1
      this.camera3.lookAt(0,0,0)
      this.renderer3 = new THREE.WebGLRenderer()
      this.renderer3.setClearColor(0xeeeeee, 1.0)
  }

  updateSideView=()=>{
    if(this.state.sideViewShow)
    {
      const width = this.state.sideViewSize.width
      const height = this.state.sideViewSize.height
      this.renderer3.setSize(width, height)
      this.sideViewRef.appendChild(this.renderer3.domElement)
    }
  }

  getFrontView =(refDom)=>{
    if(refDom==undefined)
    {
      this.setState({frontViewShow:false})
    }
    else
    {
      this.setState({frontViewShow:true})
      this.frontViewRef = refDom
    }
  }

  

  getSideView =(refDom)=>{
    if(refDom==undefined)
    {
      this.setState({sideViewShow:false})
    }
    else
    {
      this.setState({sideViewShow:true})
      this.sideViewRef = refDom
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

    if(this.state.frontViewShow && (this.renderer2 !== undefined))
    {
      let c2Background = new THREE.Color('rgb(255,255,255)')
      this.renderer2.setClearColor(c2Background)
      this.renderer2.render(this.scene, this.camera2)
    }

    if(this.state.sideViewShow && (this.renderer3 !== undefined))
    {
      let c3Background = new THREE.Color('rgb(255,255,255)')
      this.renderer3.setClearColor(c3Background)
      this.renderer3.render(this.scene, this.camera3)
    }
    
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
    //console.log('ThreeDRender handleResize')
    this.rect = this.mount.getBoundingClientRect()
    this.renderer1.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.camera1.aspect = this.mount.clientWidth / this.mount.clientHeight;
    this.camera1.updateProjectionMatrix();

     if(this.state.frontViewShow  && (this.renderer2 !== undefined))
     {
        const width1 = this.state.frontViewSize.width;
        const height1 = this.state.frontViewSize.height;
        this.renderer2.setSize(width1, height1);
        this.camera2.aspect = width1 / height1;
        this.camera2.updateProjectionMatrix();
     }
     
     if(this.state.sideViewShow && (this.renderer3 !== undefined))
     {
        const width2 = this.sideViewRef.clientWidth;
        const height2 = this.sideViewRef.clientHeight;
        this.renderer3.setSize(width2, height2);
        this.camera3.aspect = width2 / height2;
        this.camera3.updateProjectionMatrix();
     }
   }

  threeDLayerMouseDown = (e) => {
    console.log('Mouse Down')
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
    this.setState({orbitControlMode : false})
  }

  ThreeDLayerMouseMove = (e) => {
    console.log('rect : ', this.rect)
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

  frontViewSizeChange = (msg) =>{
    if((this.state.frontViewSize.width !==msg.width-4)||(this.state.frontViewSize.height !==msg.height-29))
    {
      this.setState({
      frontViewSize:{
        width:msg.width-4,
        height:msg.height-29
      }
      })
    }
  }

  sideViewSizeChange = (msg) =>{
    if((this.state.sideViewSize.width !==msg.width-4)||(this.state.sideViewSize.height !==msg.height-29))
    {
      this.setState({
      sideViewSize:{
        width:msg.width-4,
        height:msg.height-29
      }
      })
    }
  }

  getFrontView =(refDom)=>{
    //console.log('ThreeDRender getFrontView refDom :')
    //console.log(refDom)
    if(refDom==undefined)
    {
      this.setState({frontViewShow:false})
    }
    else
    {
      this.setState({frontViewShow:true})
      this.frontViewRef = refDom
    }
  }



  render(){
  //  console.log('ThreeDRender render')
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
        <ControllerUnitLayout ref={(refDom)=>{this.refControllerUnitLayout=refDom}} PosX={this.state.mousePos.x} PosY={this.state.mousePos.y} rotationValue={this.getRotationValue} frontView={this.getFrontView} sideView={this.getSideView}offset={this.state.offset} frontViewSizeChange={this.frontViewSizeChange}  sideViewSizeChange={this.sideViewSizeChange}/> 
      </div>  
    )
  }
}
export default ThreeDRender
