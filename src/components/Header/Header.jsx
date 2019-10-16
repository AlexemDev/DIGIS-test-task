import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {logOut} from "../../actions/SessionActions";

import './Header.css'


class Header extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleLogOut = e =>{
        this.props.logOut()

    }

    render() {
        return (
            <div>
                <header className="header">
                    <div className="top-menu">
                        <Link to="/" >Home</Link>
                        <Link to="/about">About</Link>
                        {JSON.parse(localStorage.getItem('isAuth')) ?
                            <Link to="" onClick={this.handleLogOut}>LogOut</Link>
                            :
                            <Link to="/login">Login</Link>
                        }

                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errorMsg: state.session.errorMsg,
})

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);