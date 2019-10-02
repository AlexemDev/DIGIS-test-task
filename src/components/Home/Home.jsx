import React from 'react';
import { connect } from 'react-redux'
import MapContainer from "../MapContainer/MapContainer";

import './Home.css'

const Home = ({ user }) => {
    return (
        <div className={'home'}>
            <h1>HOME</h1>
            <p>Вас зовут: {user.name}</p>
            <MapContainer />
        </div>
    );
}

const mapStateToProps = state => ({
    user: JSON.parse(localStorage.getItem('isAuth')),
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home);