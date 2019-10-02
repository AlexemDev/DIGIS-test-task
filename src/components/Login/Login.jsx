import React, {Component} from 'react';
import propType from 'prop-types';
import { connect } from 'react-redux';
import { logIn } from '../../actions/SessionActions';
import { Redirect } from 'react-router-dom';

import './Login.css'

class Login extends Component {
    state = {
        redirectToPreviousRoute: false,
        userName: '',
        password: ''
    }

    handleChange = e => {
        const value = e.currentTarget.value;
        const fieldName = e.currentTarget.name;

        this.setState(prev => ({
           ...prev,
           [fieldName] : value,
        }));
    }

    handleSubmit = e => {
        e.preventDefault();
        const { userName, password } = this.state;

        this.props.logIn(
            {
                userName,
                password
            },
            () => {
                this.setState({ redirectToPreviousRoute: true })
            }
        )
    }


    render() {
        const { errorMsg, location} = this.props;
        const { from } = location.state || { from: { pathname: '/' } }
        const { userName, password, redirectToPreviousRoute } = this.state;

        if (redirectToPreviousRoute) {
            return <Redirect to={from} />
        }

        return (
            <div className={'login'}>
                {errorMsg && <p>{errorMsg}</p>}
                <form  className={'login__form'} onSubmit={this.handleSubmit}>
                    <input
                        type={'text'}
                        name={'userName'}
                        onChange={this.handleChange}
                        placeholder={'Name'}
                        value={userName}
                    />

                    <input
                        type={'password'}
                        name={'password'}
                        onChange={this.handleChange}
                        placeholder={'Password'}
                        value={password}
                    />

                    <button type="submit" className={'login__form_submit'}>Log in</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errorMsg: state.session.errorMsg,
})

const mapDispatchToProps = dispatch => ({
    logIn: (params, cb) => dispatch(logIn(params, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);