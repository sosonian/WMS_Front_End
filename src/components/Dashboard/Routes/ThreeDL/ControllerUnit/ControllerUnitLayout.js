import React, { Component } from 'react';
import ControllerUnitContainer from './ControllerUnitContainer'


class ControllerUnitLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controllerUnitState:[
                {
                    name:'datGui',
                    unitID:1,
                    containerUnitContainerID:1,
                },
                {
                    name:'subViewFromFront',
                    unitID:2,
                    containerUnitContainerID:2,
                },
                {
                    name:'subViewFromSide',
                    unitID:3,
                    containerUnitContainerID:3,
                }
            ],
            ControllerUnitContainerState:[
                {
                    controllerUnitContainerID:1,
                    size:
                    {
                        width:150,
                        height:150
                    },
                    position:{
                        left:0,
                        top:0
                    },
                    showing:true,
                },
                {
                    controllerUnitContainerID:2,
                    size:
                    {
                        width:150,
                        height:150
                    },
                    position:{
                        left:0,
                        top:200
                    },
                    showing:true,
                },
                {
                    controllerUnitContainerID:3,
                    size:
                    {
                        width:150,
                        height:150
                    },
                    position:{
                        left:0,
                        top:400
                    },
                    showing:true,
                }
            ],
            tabDragging:false
        }
    }

    componentDidUpdate(){

    }

    onTabDragging =(msg)=>{
        if(msg=='true')
        {
          this.setState({
            tabDragging:true
          })
        }
        else
        {
          this.setState({
            tabDragging:false
          })
        }
    }

    sendRotationValueBack=(value)=>{
        this.props.rotationValue(value)
    }

    sendFrontViewToggle=(refDom)=>{
        console.log('ControllerUnitLayout sendFrontViewToggle refDom : ')
        console.log(refDom)
        this.props.frontView(refDom)
    }

    sendSideViewToggle=(refDom)=>{
        console.log('ControllerUnitLayout sendSideViewToggle refDom : ')
        console.log(refDom)
        this.props.sideView(refDom)
    }

    createControllerUnitContainer = () => {
        return (
            this.state.ControllerUnitContainerState.map(container=> container.showing?
                (<ControllerUnitContainer key={container.controllerUnitContainerID} conID={container.controllerUnitContainerID} initialPosX={container.position.left} initialPosY={container.position.top} PosX={this.props.PosX} PosY={this.props.PosY} controllerUnitState={this.state.controllerUnitState} rotationValue={this.sendRotationValueBack} frontViewToggle={this.sendFrontViewToggle} sideViewToggle={this.sendSideViewToggle} onTabDragging={this.onTabDragging} tabDraggingBooling={this.state.tabDragging}/>):null
            )
        )
    }



    render(){
        console.log('ControllerUnitLayout render :')
        const containerStyle = {
            width: '100%',
            height: '100%',
            position:'absolute',
            top:'0px',
            left:'0px'
        }

        return(
            <div style={containerStyle}> 
                {this.createControllerUnitContainer()}
            </div>
        )
    }
}

export default ControllerUnitLayout