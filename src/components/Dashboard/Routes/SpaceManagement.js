import React,{Component} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GridLayer from './ThreeDL/GridLayer';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DomainIcon from '@material-ui/icons/Domain';
  
  const useStyles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      padding: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(1),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },

    rowPaper: {
      //padding: theme.spacing(1),
      display: 'flex',
      overflow: 'auto',
    },

    fixedHeight: {
      height: '80vh',
    },
    button: {
      margin:theme.spacing(1),
      //padding: theme.spacing(1),
      fontFamily:'Microsoft JhengHei',
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  });

  const testProps = () => ({
     user1: {
      Name: 'John',
      City: 'TC',
     },
     user2: {
       Name: 'Will',
       City:'TPE',
     }
  });

  

  class SpaceManagement extends Component {

    // classes = useStyles();
    // fixedHeightPaper = clsx(this.classes.paper, this.classes.fixedHeight);
    // buttonPaper = clsx(this.classes.rowPaper);
    // flexHeightPaper = clsx(this.classes.paper);
  

    render(){
      const {classes} = this.props
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
      const buttonPaper = clsx(classes.rowPaper);
      const flexHeightPaper = clsx(classes.paper);

    return (

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={buttonPaper}>
                  <Button variant="outlined" color="default" className={classes.button} size="small">
                    <DomainIcon className={classes.leftIcon} fontSize="small"/>
                    倉儲空間概覽
                  </Button>
                  <Button variant="outlined" color="default" className={classes.button} size="small">
                    <AddBoxIcon className={classes.leftIcon} fontSize="small"/>
                    建立新倉儲空間
                  </Button>
                </Paper>
              </Grid>         
              <Grid item xs={12}>
                <Paper className={flexHeightPaper}>
                    <GridLayer/>
                </Paper>
              </Grid>              
            </Grid>
          </Container>
        </main>
      )
    }
  }

export default withStyles(useStyles)(SpaceManagement)