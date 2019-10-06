import React,{Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Link} from 'react-router-dom';



const StyledText = {
    fontFamily:'Microsoft JhengHei',
};

class InfoSummaryListItem extends Component{
  

  handleClick=(e)=>{
    console.log(e.currentTarget.getAttribute('fuckID'));
  }
  render(){
    
    return(  
    <div>
    <ListItem button component={Link} to="/InfoSummary" fuckID={1} onClick={this.handleClick}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText 
      primaryTypographyProps={{style:StyledText}} 
      primary="資訊綜覽" />
    </ListItem>
  </div>
  )}
};


export default InfoSummaryListItem