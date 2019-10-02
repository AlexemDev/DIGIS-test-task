import React, {Component} from 'react';

import './About.css'

class About extends Component {
    render() {
        console.log(this.props)

        return (
            <div className={'about'}>
                <h1>Front-End Developer</h1>
                <h2>Alexey Alpatov</h2>
                <p><strong>Age:</strong> 25 years</p>
                <p><strong>City:</strong> Odessa</p>
                <p><strong>Phone:</strong> <a href="tel:+380633049399">063-304-93-99</a></p>
                <p><strong>E-mail:</strong> <a href="mailto:alpatov.dev@gmail.com">alpatov.dev@gmail.com</a></p>
            </div>
        );
    }
}

export default About;