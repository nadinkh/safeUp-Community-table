import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui'; //

import axios from 'axios'



import {
    generateRows,
    defaultColumnValues,
} from '../demo-data/generator';

const getRowId = row => row.id;

export default () => {
    const [columns] = useState([
        { name: 'name', title: 'Name' },
        { name: 'description', title: 'Description' },
        { name: 'timeZone', title: 'TimeZone' },
        { name: 'languageCode', title: 'LanguageCode' },

        // { name: 'gender', title: 'Gender' },
        // { name: 'city', title: 'City' },
        // { name: 'car', title: 'Car' },
    ]);
    console.log(columns)

    const [rows, setRows] = useState(generateRows({
        columnValues: { id: ({ index }) => index, FetchingData },
        // the lenght start when reload should change according to the data 
    }));
    // const [rows, setRows] = useState([

    // ]
    // );

    console.log(rows)
    console.log(defaultColumnValues)

    function FetchingData() {
        const [communities, setCommunities] = useState([])
        // const [id, setId] = useState("3072ebf8-06d1-4ab9-85ee-1e017f3cb7c2")

        useEffect(() => {
            axios.get(`https://safeup-api-communities-0001.herokuapp.com/communities`)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])


        return (
            <div>
                <ul>
                    {
                        communities.map(community => <li key={community.id}>{community.title}</li>)
                    }
                </ul>
            </div>
        )
    }

    // export default FetchingData



    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
                // console.log('added')
            ];
            console.log('added')
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
            console.log('changed')
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
            console.log('deleted')

        }
        setRows(changedRows);

        console.log('commit')

    };

    return (
        <Paper>

            <FetchingData />
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    onCommitChanges={commitChanges}
                />

                <Table />
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                />

            </Grid>
        </Paper>
    );
};

