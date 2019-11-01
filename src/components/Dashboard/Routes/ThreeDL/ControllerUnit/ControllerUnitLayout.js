import React, { Component } from 'react';
import ControllerUnitContainer from './ControllerUnitContainer'
import ShadowContainer from './ShadowContainer'
import TestContainer from './TestContainer'


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
                },
                {
                    name:'TestUnit',
                    unitID:4,
                    containerUnitContainerID:3,
                },

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
                    zIndex:1,
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
                    zIndex:2,
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
                    zIndex:3,
                    showing:true,
                }
            ],
            tabDragging:false,
            shadowContainer:{}
        }
        //console.log('ControllerUnitLayout constructor')
    }

    componentDidUpdate(){
        //console.log('ControllerUnitLayout componentDidUpdate')

    }

    appendShadowContainer=()=>{
        //console.log('ControllerUnitLayout appendShadowContainer')
        if(this.state.tabDragging)
        {
            //console.log('tab is Dragging !')
            //console.log('width : '+this.state.shadowContainer.width )
            //console.log('height : '+this.state.shadowContainer.height )
            //console.log('x : '+this.props.PosX )
            //console.log('x : '+this.props.PosY )
            return(
                <ShadowContainer  width={this.state.shadowContainer.width} height={this.state.shadowContainer.height} posX={this.props.PosX} posY={this.props.PosY} refPosX={this.state.shadowContainer.posX} refPosY={this.state.shadowContainer.posY}/>
            )
        }
        else
        {
            //console.log('tab is Not Dragging !')
            return("")
        }
    }


    onTabDragging =(msg)=>{
        if(msg.tabDragging)
        {
          this.setState({
            tabDragging:true,
            shadowContainer:msg
          })

        }
        else
        {
          this.setState({
            tabDragging:false,
            shadowContainer:{}
          })
        }
    }

    sendRotationValueBack=(value)=>{
        this.props.rotationValue(value)
    }

    sendFrontViewToggle=(refDom)=>{
        //console.log('ControllerUnitLayout sendFrontViewToggle refDom : ')
        //console.log(refDom)
        this.props.frontView(refDom)
    }

    sendSideViewToggle=(refDom)=>{
        //console.log('ControllerUnitLayout sendSideViewToggle refDom : ')
        //console.log(refDom)
        this.props.sideView(refDom)
    }

    

    controllerUnitToggle=(e)=>{
        if(e.showing===false)
        {
            let containerStateToken =[]
            this.state.ControllerUnitContainerState.map(containerState=>{
                let stateObj = containerState
                if(stateObj.controllerUnitContainerID===e.conID)
                {
                    stateObj.showing = false
                }
                containerStateToken.push(stateObj)
            })
            this.setState({
                ControllerUnitContainerState:containerStateToken
            })
        }
    }

    getContainerNewSize=(msg)=>{
        if(msg.conID ==2)
        {
            this.props.frontViewSizeChange(msg)
            //console.log('ControllerUnitLayout getContainerNewSize')
            //console.log('width : '+msg.width)
            //console.log('height : '+msg.height)
        }
        else if(msg.conID ==3)
        {
            this.props.sideViewSizeChange(msg)
        }
    }


    getContainerZIndexUpdate=(msg)=>{
        let containerStateToken =[]
        let arrayToken = this.state.ControllerUnitContainerState
        let stateLength = arrayToken.length
        this.state.ControllerUnitContainerState.map(containerState=>{
            let stateObj = containerState
            if(stateObj.controllerUnitContainerID===msg.conID)
            {
                stateObj.zIndex = stateLength
            }
            else
            {
                if(stateObj.zIndex > msg.zIndex)
                {
                    stateObj.zIndex = stateObj.zIndex -1
                }
            }
            containerStateToken.push(stateObj)
        })
        this.setState({
            ControllerUnitContainerState:containerStateToken
        })
    }



    createControllerUnitContainer = () => {
        //console.log('ControllerUnitLayout createControllerUnitContainer')
        return (
            this.state.ControllerUnitContainerState.map(container=> container.showing?
                (<ControllerUnitContainer key={container.controllerUnitContainerID} conID={container.controllerUnitContainerID} initialPosX={container.position.left} initialPosY={container.position.top} PosX={this.props.PosX} PosY={this.props.PosY} controllerUnitStateProps={this.state.controllerUnitState} rotationValue={this.sendRotationValueBack} frontViewToggle={this.sendFrontViewToggle} sideViewToggle={this.sendSideViewToggle} containerExtend={this.getContainerNewSize} onTabDragging={this.onTabDragging} tabDraggingBooling={this.state.tabDragging} containerShowing={this.controllerUnitToggle} zIndex={container.zIndex} getContainerZIndexUpdate={this.getContainerZIndexUpdate}/>):null
            )
        )
    }

    onMouseUp=()=>{
        //console.log('ControllerUnitLayout tabDragging complete !!')
        this.setState({
            tabDragging:false,
            shadowContainer:{}
        })
    }
    
    changeCursorWhenTabDragging=()=>{
        let cursor = 'default'
        if(this.state.tabDragging)
        {
            cursor = 'grabbing'
        }
        return cursor
    }



    render(){
        //console.log('ControllerUnitLayout render ')
        const containerStyle = {
            width: '100%',
            height: '100%',
            position:'absolute',
            top:'0px',
            left:'0px',
            cursor:this.changeCursorWhenTabDragging()
        }

        return(
            <div style={containerStyle}  ref={(refLayout)=>{this.refLayout=refLayout}} onMouseUp={this.onMouseUp}> 
                {this.createControllerUnitContainer()}
                {this.appendShadowContainer()}
            </div>
        )
    }
}

export default ControllerUnitLayout