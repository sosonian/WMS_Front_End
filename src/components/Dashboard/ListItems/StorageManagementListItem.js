import React,{Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ListItemText from '@material-ui/core/ListItemText';



const StyledText = {
    fontFamily:'Microsoft JhengHei',
};

class StorageManagementListItem extends Component{
  

  handleClick=(e)=>{
    console.log(e.currentTarget.getAttribute('fuckID'));
  }
  render(){
    
    return(  
    <div>
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


export default StorageManagementListItem