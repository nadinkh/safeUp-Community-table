import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';
// import countries from 'countries-list'
import continents from 'countries-list'
// import cities from 'cities-list'
// import csc from 'country-state-city'
// import allCities from 'all-the-cities'
// import all_the_cities from 'all-the-cities';


const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,

  },
});
const CommunityNetworks = () => {
  const classes = useStyles();

  const [community, setCommunity] = useState([])

  useEffect(() => {
    axios.get('https://safeup-api-communities-0001.herokuapp.com/communities')
      .then(res => {
        console.log(res.data)
        // console.log(continents.continents.AF)
        // console.log(countries.countries)
        // console.log(countries.countries)
        // console.log(cities)
        setCommunity(res.data)//array 1
      }).catch(err => {
        console.log(err)
      })

  }, [])




  return (
    //   <div>
    // {community==="world"?<div>{`${community}`}</div>:null}

    //   </div>

    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >

      <TreeItem nodeId="1" label='world'>

        <TreeItem nodeId="2" label={continents.continents.EU}>
          {community.map(item => (
            <div key={item.id}>
              {item.name === 'Italy' ?
                <TreeItem nodeId="3" label={item.name} /> : null}
            </div>))}
          {community.map(item => (
            <div key={item.id}>
              {item.name === 'Berlin' ?
                <TreeItem nodeId="3" label={item.name} /> : null}
            </div>))}
        </TreeItem>
        <TreeItem nodeId="4" label={continents.continents.AS}>
          {community.map(item => (
            <div key={item.id}>
              {item.name === 'China' ?
                <TreeItem nodeId="5" label={item.name} /> : null}
            </div>))}
        </TreeItem>
        <TreeItem nodeId="6" label={continents.continents.AN}></TreeItem>
        <TreeItem nodeId="7" label={continents.continents.AF}></TreeItem>
        <TreeItem nodeId="8" label={continents.continents.SA}></TreeItem>
        <TreeItem nodeId="9" label={continents.continents.NA}></TreeItem>
        <TreeItem nodeId="10" label={continents.continents.OC}></TreeItem>
      </TreeItem>


    </TreeView>




  );
}
export default CommunityNetworks
