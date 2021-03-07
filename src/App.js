
import './App.css';
import ReactTable from './components/ReactTable.js'
// import Communities from './components/Communities'
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';




const useStyles = makeStyles((theme) => ({

  drawerPaper: {
    width: 'inherit',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary

  }

}));

function App() {



  const classes = useStyles();
  return (
    <Router>


      <div style={{ display: 'flex' }}>

        <Drawer
          style={{ width: '240px' }}
          variant='persistent'
          anchor='left'
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >

          <List>
            <Link to='/' className={classes.link}>
              <ListItem button >
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            {/* <Route path='/communities' component={Communities} /> */}
            <Link to='/communities' className={classes.link}>
              <ListItem button >
                <ListItemText primary={"Communities"} />
              </ListItem>
            </Link>

          </List>

        </Drawer>
        <Switch>
          <Route exact path='/'>
            Welcoming page
            </Route>
          <Route exact path='/communities' component={ReactTable} />

        </Switch>
      </div>

    </Router>
  );
}

export default App;
