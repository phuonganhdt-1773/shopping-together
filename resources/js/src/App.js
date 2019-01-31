import React, { Component } from 'react';
import classNames from 'classnames'
import { Link } from 'react-router-dom';
import RouterPath from "./router";

export default class App extends Component {
    constructor(){
        super(...arguments);
        this.state = {
        }
    }

    render() {
        const url = window.location.pathname;
        return (
            <div id="manage" className={(url == '/' || url == '/home') ? 'setting-page' : ''}>
                <ul>
                    <div className="side-menu-inner menu-desktop">
                        <li className={(url == '/' || url == '/home') ? 'active treeview' : 'treeview'} >
                            <Link to={'/'}>
                                <span>
                                    {lang.setup}
                                </span>
                            </Link>
                        </li>
                        <li className={(url == '/manage') ? 'active treeview' : 'treeview'}>
                            <Link to={'/manage'}>
                                <span>
                                    {lang.manage}
                                </span>
                            </Link>
                        </li>
                        <li className={(url == '/stats') ? 'active treeview' : 'treeview'}>
                            <Link to={'/stats'}>
                                <span>
                                    {lang.stats}
                                </span>
                            </Link>
                        </li>
                   </div>

                </ul>
                <div className={classNames("content-manage")}>
                    <RouterPath />
                </div>
            </div>
        );
    }
}
