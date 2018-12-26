import React, { Component } from 'react';
import Setting from './components/setting/setting';
import { Switch, Route } from 'react-router-dom'

export default class RouterPath extends Component{
    render(){   
        return (
            <Switch>
                <Route exact path={'/'} component={Setting}/>
            </Switch>
        )
    }
}