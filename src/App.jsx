import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home/Home'
import About from './components/About/About'
import Login from './components/Login/Login'
import Header from './components/Header/Header'
import PrivateRoute from './containers/PrivateRoute'
import './App.css'



const App = () => (

    <div>

        <Header />

        <div className="content">

            <Switch>

                <PrivateRoute exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    </div>
)



export default App;
