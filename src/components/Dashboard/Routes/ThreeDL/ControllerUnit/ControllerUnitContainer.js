import React, { Component } from 'react';
import { Color } from 'three';
import TestRotationControllerUnit from './TestRotationControllerUnit'
import SubViewFrontControllerUnit from './SubViewFrontControllerUnit'

class ControllerUnitContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position:{
                x:0,
                y:0,
            },
            refPos:{
                x:0,
                y:0
            },
            divSize:{
                width:200,
                height:200,
            },
            controllerUnitState:[
                {
                    name:'DatGui',
                    title:'旋轉控制',
                    state:-1
                },
                {
                    name:'SubViewFront',
                    title:'前視圖',
                    state:-1
                }
            ],
            dragging:false,
            resizing:false,
            showing:true,
            headerMergeSingnal:false
        }
    }

    componentDidMount() {
        this.rect = this.refContainer.getBoundingClientRect()
        this.positionX = this.props.PosX
        this.positionY = this.props.PosY
        
    }

    componentDidUpdate() {
        this.rect = this.refContainer.getBoundingClientRect()
        if(this.state.dragging)
        {
            this.positionX = this.props.PosX-this.state.refPos.x
            this.positionY = this.props.PosY-this.state.refPos.y
            console.log('SubWindow position Update!')
        }
        else
        {
            //console.log('SubWindow position dont Update!')
            //console.log('SubWindow Current PosX : '+ this.positionX)
            //console.log('SubWindow Current PosY : '+ this.positionY)
        }
    }

    headerMouseDown=()=>{   
        //console.log('header mouse down')
        //console.log('mouseX : '+this.props.PosX-this.positionX)
        //console.log('mouseY : '+this.props.PosY-this.positionY)
        this.setState({
            refPos:{
                x:this.props.PosX-this.positionX,
                y:this.props.PosY-this.positionY
            }
        })     
        this.setState({          
            dragging:true
        })
    }
    headerMouseOver=(e)=>{
        console.log('pointer over header')
        console.log(e.target)
        if(this.props.tabDraggingBooling && !this.state.dragging)
        {
            console.log('active merge singnal')
            this.setState({
                headerMergeSingnal:true
            })
        }
    }

    headerMouseOut=()=>{
        
        this.setState({
            headerMergeSingnal:false
        })
    }

    tabMouseDown=()=>{
       this.props.onTabDragging('true')
    }

    tabMouseUP=()=>{
        this.props.onTabDragging('false')
    }

    onMouseUp=()=>{
        //console.log('mouse up')
        this.setState({
            dragging:false,
            refPos:{
                x:0,
                y:0
            }
        })
    }

    headerCursorChangeHandler=()=>{
        let cursorToken = 'grab'
        if(this.state.dragging)
        {
            cursorToken = 'grabbing'
        }
        //console.log(cursorToken)
        return cursorToken
    }

    headerBackgroundColorChangeHandler=()=>{
        let backgroundColorToken = '#B6D9EA'
        if(this.state.headerMergeSingnal)
        {
            backgroundColorToken = '#FF3636'
        }
        return backgroundColorToken
    }

    headerChangeZIndex=()=>{
        let zIndexToken = '100'
        if(this.state.dragging)
        {
            zIndexToken = '50'
        }
        return zIndexToken
    }

    containerWindowChangeZIndex=()=>{
        let zIndexToken = '100'
        if(this.state.dragging)
        {
            zIndexToken = '50'
        }
        return zIndexToken
    }
    
    render() {    
        const containerWindow = {
            width: this.state.divSize.width,
            height:  this.state.divSize.height,
            position:'absolute',
            top:this.positionY+'px',
            left:this.positionX+'px',
            zIndex:this.headerChangeZIndex(),
            border:'2px solid',
            borderColor:'black'
          }
        
          const canvasWindow = {
              width:'100%',
              height:'100%'
          }

          const headerStyle = {
              width:'100%',
              height:'20px',
              backgroundColor:this.headerBackgroundColorChangeHandler(),
              borderBottom:'1px solid',
              borderColor:'gray',
              cursor:this.headerCursorChangeHandler(),
              flexDirection:'row'    
          }

          const tabStyle = {
              width:'40%',
              borderTopRightRadius:10,
              borderRight:'1px solid',
              borderColor:'gray',
              backgroundColor:'#9FC5E8',  
                
          }

        return (
            <div style={containerWindow} ref={(refContainer) => {this.refContainer = refContainer}}>  
            <div style={headerStyle} onMouseDown={this.headerMouseDown} onMouseUp={this.onMouseUp} onMouseOver={this.headerMouseOver} onMouseOut={this.headerMouseOut}>
                <div style= {tabStyle} onMouseDown={this.tabMouseDown} onMouseUp={this.tabMouseUP}>
                    {'test Title'}
                </div>
            </div>
            <div style={canvasWindow} ref={(refDom)=>{this.refDom=refDom}}/> 
            </div>
        )
      }
}

export default ControllerUnitContainer