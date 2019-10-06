import React,{Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';


const StyledText = {
    fontFamily:'Microsoft JhengHei',
};

class MainListItems extends Component{
  

  handleClick=(e)=>{
    console.log(e.currentTarget.getAttribute('fuckID'));
  }
  render(){
    
    return(  
    <div>
    <ListItem button fuckID={1} onClick={this.handleClick}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText 
      primaryTypographyProps={{style:StyledText}} 
      primary="資訊綜覽" />
    </ListItem>
    <ListItem button fuckID={2} onClick={this.handleClick}>
      <ListItemIcon>
        <HomeWorkIcon />
      </ListItemIcon>
      <ListItemText 
      primaryTypographyProps={{style:StyledText}}
      primary="倉儲空間管理" />
    </ListItem>
    <ListItem button fuckID={3} onClick={this.handleClick}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText 
      primaryTypographyProps={{style:StyledText}}
      primary="人員出入管理" />
    </ListItem>
    <ListItem button fuckID={4} onClick={this.handleClick}> 
      <ListItemIcon>
        <ViewComfyIcon />
      </ListItemIcon>
      <ListItemText 
      primaryTypographyProps={{style:StyledText}}
      primary="貨物倉儲管理" />
    </ListItem>
  </div>
  )}
};


export default MainListItems