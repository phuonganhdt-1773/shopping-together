import React, { Component, Fragment } from 'react';
import 'rc-color-picker/assets/index.css';
import classNames from 'classnames'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        return (
            <div className="full-width display-block">
                <p> {lang.add_to_cart_button}</p>
            </div>
        );
    }
}