

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

                name: '',
                languageCode: '',
                timeZone: '',
                type: '',

            },
            id: null
        }
    }

    componentDidMount() {
        const form = {
            name: this.props.community.name,
            languageCode: this.props.community.languageCode,
            timeZone: this.props.community.timeZone,
            type: this.props.community.type,
        }
        this.setState({
            id: this.props.community.id,
            form: form


        })

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
        const data = {

            name: this.state.form.name,
            languageCode: this.state.form.languageCode,
            timeZone: this.state.form.timeZone,
            type: parseInt(this.state.form.type, 10)
        }

        axios.patch(`https://safeup-api-communities-0001.herokuapp.com/communities/` + this.state.id, data)
            .then(response => {
                console.log(response.data)
                this.props.updateCommunity(data, this.state.id)
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
                        >Edit1
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Fragment>

    }
}