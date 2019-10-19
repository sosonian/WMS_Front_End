import React, { Component } from 'react';
import { Color } from 'three';

class SubWindow extends Component {
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
            dragging:false,
            divSize:{
                width:150,
                height:150,
            }
        }
    }

    componentDidMount() {
        this.rect = this.refContainer.getBoundingClientRect()
        this.positionX = this.props.PosX
        this.positionY = this.props.PosY
        console.log('SubWindow Call')
        console.log(this.props.PosX)
        console.log(this.props.PosY)
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
            console.log('SubWindow position dont Update!')
            console.log('SubWindow Current PosX : '+ this.positionX)
            console.log('SubWindow Current PosY : '+ this.positionY)
        }
    }

    onMouseDown=()=>{   
        console.log('mouseX : '+this.props.PosX-this.positionX)
        console.log('mouseY : '+this.props.PosY-this.positionY)
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

    onMouseUp=()=>{
        console.log('mouse up')
        this.setState({
            dragging:false,
            refPos:{
                x:0,
                y:0
            }
        })
    }
    
    render() {    
        //console.log(this.props.dom)
        const containerWindow = {
            width: this.state.divSize.width,
            height:  this.state.divSize.height,
            position:'absolute',
            top:this.positionY+'px',
            left:this.positionX+'px',
            zIndex:'2000',
            border:'1px solid',
            borderColor:'black'
          }
        
          const canvasWindow = {
              width:'100%',
              height:'100%'
          }

          const headerStyle = {
              width:'100%',
              height:'20px',
              backgroundColor:'#B6D9EA'
          }

        return (
            <div style={containerWindow} ref={(refContainer) => {this.refContainer = refContainer}}>  
            <div style={headerStyle} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>
            <div style={canvasWindow} ref={(refDom)=>{this.refDom=refDom}}/> 
            </div>
        )
      }
}

export default SubWindow