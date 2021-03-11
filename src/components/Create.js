

import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import axios from 'axios'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            form: {
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
    }

    handleSubmit = (e) => {
        //todo validation 
        // const {form}=this.state

        // this.props.onSubmit(form)
        e.preventDefault()
        console.log(this.state)
        const data = {
            name: this.state.form.name,
            languageCode: this.state.form.languageCode,
            timeZone: this.state.form.timeZone,
            type: parseInt(this.state.form.type, 10)
        }

        axios.post('https://safeup-api-communities-0001.herokuapp.com/communities', data)
            .then(response => {
                console.log(response.data)
                this.props.createCommunity(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }



    render() {
        const { open, form: { name, languageCode, timeZone, type } } = this.state

        return <Fragment>

            <Button onClick={this.handleToggle}
                variant="contained" color="primary"> + ADD</Button>

            <Dialog
                open={open}
                onClose={this.handleToggle}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    create new community
                    </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
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
                        {/* <FormControl >
                            <InputLabel id="demo-simple-select-label">LanguageCode</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={languageCode}
                                onChange={this.handleChange('languageCode')}
                            >
                                <MenuItem value={10}>AF</MenuItem>
                                <MenuItem value={20}>AR-LB</MenuItem>
                                <MenuItem value={30}>EN-AU</MenuItem>
                            </Select>
                        </FormControl> */}

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
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            type="submit"
                            margin="normal"
                        // onSubmit={this.handleSubmit}
                        >Add
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Fragment>

    }
}