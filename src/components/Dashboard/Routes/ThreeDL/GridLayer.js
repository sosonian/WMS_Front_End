import React, {Component} from 'react';
import ThreeDRender from './ThreeDRender';
import GridLayout from 'react-grid-layout';
import TestComponent1 from './TestComponent1';
import 'react-grid-layout/css/styles.css';
  

class GridLayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      changeCount : 0,
      static : JSON.parse(localStorage.getItem('WMSLayoutSetting')).map(x=>x.static),
      fullScreen:-1,
      layoutc: 
      JSON.parse(localStorage.getItem('WMSLayoutSetting'))|| 
      [
         {i: 'a', x: 0, y: 0, w: 1, h: 7},
         {i: 'b', x: 1, y: 0, w: 5, h: 7},
         {i: 'c', x: 0, y: 6, w: 6, h: 1}
      ],
      ThreeDRenderCotainerSize:{
        width:0,
        height:0
      }
    }
    this.refGridLayout = React.createRef()
  }

  componentDidMount(){
    //console.log('GridLayer componentDidMount refThreeDRenderDom offset :')
    //console.log(this.refThreeDRenderDom.mount.clientWidth)
    //console.log(this.refThreeDRenderDom.mount.clientHeight)
    this.setState({
      ThreeDRenderCotainerSize:{
        width:this.refThreeDRenderDom.mount.clientWidth,
        height:this.refThreeDRenderDom.mount.clientHeight,
      }
    })
  }
  
  // onResize = () => {
  //   this.tempCount = this.state.changeCount +1
  //   this.setState({changeCount:this.tempCount})
  // }

  gridItemOnClick = () => {
  //  console.log('this grid item has been clicked !')
  }

  componentWillUnmount(){
  //  console.log('Layer would nmount in seconds!!')
    let tempLayouts = this.refGridLayout.current.state.layout
    localStorage.setItem('WMSLayoutSetting', JSON.stringify(tempLayouts))
  }

  threeDLayerFixStart = (e) => {
    console.log(e.target.getAttribute('keyIndex'))
    let divToken = e.target.getAttribute('keyIndex')
    if(e.key === 'c')
    {     
      switch(divToken)
      {
        case 'a':
          this.toggleFix(0)
          break
        case 'b':
          this.toggleFix(1)
          break
        case 'c':
          this.toggleFix(2)
          break    
      }
      //console.log('c is pressed')
    }
    else if(e.key === 'f')
    {
      switch(divToken)
      {
        case 'a':
          this.toggleFullScreen(0)
          break
        case 'b':
          this.toggleFullScreen(1)
          this.setState({
            ThreeDRenderCotainerSize:{
              width:this.refThreeDRenderDom.mount.clientWidth,
              height:this.refThreeDRenderDom.mount.clientHeight,
            }
          })
          break
        case 'c':
          this.toggleFullScreen(2)
          break    
      }
      //console.log('f is pressed')
    }
  }

  toggleFullScreen = (k) => {
    if(this.state.fullScreen == k)
    {
      this.setState({fullScreen:-1})
    }
    else
    {
      this.setState({fullScreen:k})
    }
  }

  toggleFix = (tokenIndex) => {
    let newLayouts = this.refGridLayout.current.state.layout
    let newStatic = this.state.static

    if(newLayouts[tokenIndex].static)
    {
      newLayouts[tokenIndex].static = false
      this.refGridLayout.current.setState({layout:newLayouts})
      newStatic[tokenIndex] = false
      this.setState({static:newStatic})
    }
    else
    {
      newLayouts[tokenIndex].static = true
      this.refGridLayout.current.setState({layout:newLayouts})
      newStatic[tokenIndex] = true
      this.setState({static:newStatic})
    }
  }

  threeDLayerResize = () => {
    //this.tempCount = this.state.changeCount +1
    this.setState({
      ThreeDRenderCotainerSize:{
        width:this.refThreeDRenderDom.mount.clientWidth,
        height:this.refThreeDRenderDom.mount.clientHeight,
      }
    })
    //console.log('start dragging!')
  }

  render() {

    const fixStyle = {
      borderStyle:'solid',
      borderColor:'red'
    }
    const fullScreenStyleParent = {
      all:'unset'
    }

    const fullScreenChild = {
      width:'100vw',
      height:'100vh',
      position:'fixed',
      left:'0',
      top:'0',
      zIndex:'2000'
    }
    const notFixStyle = {
      borderStyle:'solid',
      borderColor:'black'
    }
    const myStyle2 = {
      width: '100%',
      height: '100%',
    }

  return (
    <GridLayout className="layout" layout={this.state.layoutc} cols={12} rowHeight={45} width={2000} ref={this.refGridLayout} onResize = {this.threeDLayerResize} onResizeStop = {this.threeDLayerResize}
    draggableCancel='.myDrag'>
      <div className={this.state.static[0]?'myDrag':'None'} style={this.state.static[0]?fixStyle:notFixStyle} key="a">
        <div style={myStyle2} onKeyDown={this.threeDLayerFixStart} tabIndex='0' keyIndex='a'>
          <TestComponent1 /> 
        </div>
      </div>
      <div className={this.state.static[1]?'myDrag':'None'}  key="b" style={this.state.fullScreen==1?fullScreenStyleParent:(this.state.static[1]?fixStyle:notFixStyle)}>
        <div style={this.state.fullScreen==1?fullScreenChild:myStyle2} onKeyDown={this.threeDLayerFixStart} tabIndex='0' keyIndex='b'>
          <ThreeDRender ref={(refDom)=>{this.refThreeDRenderDom=refDom}} containerSize={this.state.ThreeDRenderCotainerSize} fullScreenProp={this.state.fullScreen}/>
        </div>
      </div>
      <div className={this.state.static[2]?'myDrag':'None'} style={this.state.static[2]?fixStyle:notFixStyle} key="c" >
        <div style={myStyle2} onKeyDown={this.threeDLayerFixStart} tabIndex='0' keyIndex='c'>
        </div>
      </div>
    </GridLayout>
  )
}
}

export default GridLayer;