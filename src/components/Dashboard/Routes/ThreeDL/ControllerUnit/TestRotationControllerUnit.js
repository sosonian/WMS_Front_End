import React, { Component } from 'react';
import guiController from './testGUIController';
import * as dat from 'dat.gui'

class TestRotationControllerUnit extends Component{
    constructor(props) {
        super(props)
        this.state = {
           
        } 
    }
    componentDidMount(){
        this.guiToken = new guiController()
        this.activeGUI()
    }
    activeGUI =()=>{
        this.datGUI = new dat.GUI({autoPlace:false})
        this.datGUI.add(this.guiToken, 'rotationX',0,1).name('旋轉X軸')
        this.refDom.appendChild(this.datGUI.domElement)
    }

    render() {
        const canvasWindow = {
            width:'100%',
            height:'100%'
        }
        return(
            <div style={canvasWindow} ref={(refDom)=>{this.refDom=refDom}}></div>
        )
    }
}

export default TestRotationControllerUnit