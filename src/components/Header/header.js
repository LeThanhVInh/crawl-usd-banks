import React, { Component } from 'react';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';


class header extends Component {
    constructor(props)//
    {
        super(props);
        this.state =
        {
            fullname_of_user: "Guest"
        };
        this.openSideBar = this.openSideBar.bind(this);
    }

    openSideBar()//
    {
        this.props.close_openSideBar();
    }
    render()//
    {
        const options_Dropdown =
            [
                { text: 'Thông tin', value: 'info' },
            ]

        return (
            <React.Fragment>
                <div className='my-header'>

                    <Menu attached='top'>
                        <Menu.Menu position='left' icon='labeled'>
                            <Menu.Item
                                name='list'
                                active={this.props.active_buttonOpen}
                                onClick={this.openSideBar} >
                                <Icon name='th list' /> MENU
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu position='right'>
                            <Dropdown
                                trigger={<span style={{ color: 'white' }}> <Icon name='user' /> <div className="name-of-user">{this.state.fullname_of_user}</div> </span>}
                                options={options_Dropdown}
                                pointing='top right'
                                icon={null}
                                style={{ display: 'flex', alignItems: 'center' }}
                                onChange={this.Dropdown_onchange}
                            />
                        </Menu.Menu>
                    </Menu>
                </div>
            </React.Fragment >
        );
    }
}

export default header;