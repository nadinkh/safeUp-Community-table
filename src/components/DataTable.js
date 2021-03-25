import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Create from './Create'
import EditCommunity from './EditCommunity'
import axios from 'axios';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

class DataTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            communities: [],
            isLoading: false,
            isError: false
        }
    }
    async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch("https://safeup-api-communities-0001.herokuapp.com/communities")
        // console.log(response.json())

        if (response.ok) {
            const communities = await response.json()
            // console.log(communities[0])
            this.setState({ communities, isLoading: false })
        }
        else {
            this.setState({ isError: true, isLoading: false })
        }
    }
    createCommunity = (dataComm) => {
        this.setState({
            communities: [...this.state.communities, dataComm]
        })
    }

    renderTableHeader = () => {
        return (

            // <TableCell style={{ fontWeight: 'bold' }} align="right" key={attr}>
            <>
                {/* <TableCell style={{ fontWeight: 'bold' }} >ID</TableCell> */}
                <TableCell style={{ fontWeight: 'bold' }} >Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} >languageCode</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} >TimeZone</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} >Type</TableCell>


            </>

        )

    }

    deleteCommunity(id) {
        if (window.confirm('Are you sure?')) {
            console.log('deleted')
            axios('https://safeup-api-communities-0001.herokuapp.com/communities/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }

            }).then(() => {
                const communityAfterDelete = this.state.communities.filter((community) => community.id != id)
                this.setState({ communities: communityAfterDelete })
            })

        }
    }
    updateCommunity = (community, id) => {
        const communities = this.state.communities;
        for (let i = 0; i < communities.length; i++) {
            if (communities[i].id === id) {
                communities[i].name = community.name;
                communities[i].languageCode = community.languageCode;
                communities[i].timeZone = community.timeZone;
                communities[i].type = community.type;

                ;
                console.log(community)
                
            }
        }
        this.setState({ communities: communities })
    }

    renderTableRows = () => {
        return this.state.communities.map(community => {
            return (
                <TableRow key={community.id}>
                    {/* <TableCell >{community.id}</TableCell> */}
                    <TableCell >{community.name}</TableCell>
                    <TableCell >{community.languageCode}</TableCell>
                    <TableCell >{community.timeZone}</TableCell>
                    <TableCell >{community.type}</TableCell>
                    <TableCell ><EditCommunity community={community} updateCommunity={this.updateCommunity} /></TableCell>
                    <TableCell ><Button onClick={() => this.deleteCommunity(community.id)}
                        variant="contained" color="secondary">Delete</Button></TableCell>
               
               
                </TableRow>
            )
        })
    }


    render() {

        const { communities, isLoading, isError, id, name } = this.state
        if (isLoading) {
            return <div>Loading ...</div>
        }
        if (isError) {
            return <div>Error..</div>
        }
        return communities.length > 0
            ? (

                <TableContainer component={Paper}>

                    {/* <Button onClick={() => console.log('ADD WAS CLICKED')} variant="contained" color="primary">
                        ADD</Button> */}
                    <Create createCommunity={this.createCommunity}

                    // onCreate={onFormCreate}
                    />
                    <Table aria-label="simple table" >

                        <TableHead>
                            <TableRow>
                                {this.renderTableHeader()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderTableRows()}

                        </TableBody>
                    </Table>
                </TableContainer>


            )
            :
            (
                <div>No Communities</div>
            )


    }

}

export default DataTable;