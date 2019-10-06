import React,{Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import {Link} from 'react-router-dom';


const StyledText = {
    fontFamily:'Microsoft JhengHei',
};

class EmployeeIOManagementListItem extends Component{

  handleClick=(e)=>{
    console.log(e.currentTarget.getAttribute('fuckID'));
  }
  render(){
    
    return(  
    <div>
    <ListItem button component={Link} to="/EmployeeIOManagement" fuckID={3} onClick={this.handleClick}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText 
      primaryTypographyProps={{style:StyledText}}
      primary="人員出入管理" />
    </ListItem>
  </div>
  )}
};

export default EmployeeIOManagementListItem