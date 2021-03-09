

import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            form: {
                id: '',
                name: '',
                languageCode: '',
                timeZone: '',
                type: ''
            }
        }
    }




    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleChange = name => ({ target: { value } }) => {
        this.setState({

            form: {
                ...this.state.form,
                [name]: value

            }
        })
        console.log('changed')
    }


    handleSubmit = (e) => {
        //todo validation 
        // const {form}=this.state

        // this.props.onSubmit(form)
        e.preventDefault()
        console.log(this.state)
        // const data = {
        //     name: this.state.form.name,
        //     languageCode: this.state.form.languageCode,
        //     timeZone: this.state.form.timeZone,
        //     type: parseInt(this.state.form.type, 10)
        // }
        //axios.patch(`https://safeup-api-communities-0001.herokuapp.com/communities` + id, data)
        
        ///test example start

        let id = "3072ebf8-06d1-4ab9-85ee-1e017f3cb7c2"
        const data = {
            "name": "Test Community PATCH from app",
            "description": "This is an update for a test community"
        }
        ///////end//////

        axios.patch(`https://safeup-api-communities-0001.herokuapp.com/communities/` + id, data)
            .then(response => {
                console.log(response.data)
                this.props.EditCommunity(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }



    render() {
        const { open, form: { name, languageCode, timeZone, type } } = this.state

        return <Fragment>

            <Button onClick={this.handleToggle}
                variant="contained" color="primary"> Edit</Button>

            <Dialog
                open={open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Update community
                    </DialogTitle>
                <DialogContent>
                    <form  >
                        <TextField
                            multiline
                            rows="2"
                            id='name'
                            label='Name'
                            value={name}
                            onChange={this.handleChange('name')}
                            margin="3"
                        />
                        <br />

                        <TextField
                            multiline
                            rows="2"
                            id='name'
                            label='LanguageCode'
                            value={languageCode}
                            onChange={this.handleChange('languageCode')}
                            margin="3"
                        />

                        <br />
                        <TextField
                            multiline
                            rows="2"
                            id='name'
                            label='TimeZone'
                            value={timeZone}
                            onChange={this.handleChange('timeZone')}
                            margin="3"
                        />
                        <br />
                        <TextField
                            multiline
                            rows="2"
                            id='name'
                            label='Type'
                            value={type}
                            onChange={this.handleChange('type')}
                            margin="3"
                        />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            type="submit"
                            margin="normal"
                        // onSubmit={this.handleSubmit}
                        >Edit
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Fragment>

    }
}