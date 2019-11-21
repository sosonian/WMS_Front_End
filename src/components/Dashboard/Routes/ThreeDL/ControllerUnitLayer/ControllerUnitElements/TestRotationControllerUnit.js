import React, { Component } from 'react';
import guiController from './testGUIController';
import * as dat from 'dat.gui'

class TestRotationControllerUnit extends Component{
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        this.guiToken = new guiController()
        this.activeGUI()
    }
    componentDidUpdate(){
        //console.log(this.guiToken.rotationX)
        this.sendRotationValue()
    }

    sendRotationValue=()=>{
        this.props.rotationValue(this.guiToken.rotationX)
    }


    activeGUI =()=>{
        // width of datGui should be related to the container width. Need Update.
        this.datGUI = new dat.GUI({autoPlace:false,width:196})
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