import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                JSON.parse(localStorage.getItem('isAuth')).key ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    )
}

const mapStateToProps = state => {
    return {
        isAuth: JSON.parse(localStorage.getItem('isAuth')).key
    }
}

export default connect(mapStateToProps)(PrivateRoute)
