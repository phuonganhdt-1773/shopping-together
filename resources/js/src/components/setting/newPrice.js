import React, { Component} from 'react';

export default class NewPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        return (
            <div className="full-width display-block">
                <p> {lang.new_price}</p>
            </div>
        );
    }
}