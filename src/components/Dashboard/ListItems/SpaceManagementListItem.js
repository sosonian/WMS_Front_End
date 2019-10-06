import React,{Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {Link} from 'react-router-dom';

const StyledText = {
    fontFamily:'Microsoft JhengHei',
};

class SpaceManagementListItem extends Component{
  

  handleClick=(e)=>{
    console.log(e.currentTarget.getAttribute('fuckID'));
  }
  render(){
    
    return(  
    <div>
        <ListItem button component={Link} to="/SpaceManagement" fuckID={2} onClick={this.handleClick}>
            <ListItemIcon>
                <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText 
                primaryTypographyProps={{style:StyledText}} 
                primary="倉儲空間管理"
            />
        </ListItem>
    </div>
  )}
};


export default SpaceManagementListItem