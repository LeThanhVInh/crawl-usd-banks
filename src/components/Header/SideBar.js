import React, { Component } from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import router from '../../router/router';
import Header from '../Header/header';
import Overlay from '../common/overlay';

import '../../assets/animate/animate.min.css';

class SideBar extends Component {
    constructor(props)//
    {
        super(props);
        this.state =
        {
            visible: false,
            dimmed: false,
            active_buttonOpen: false,
        };
        this.close_openSideBar = this.close_openSideBar.bind(this);
    }
    close_openSideBar()//
    {
        this.setState({ visible: !this.state.visible, dimmed: !this.state.dimmed, active_buttonOpen: !this.state.active_buttonOpen });
    }

    render() {
        return (
            <div className='my-sidebar'>
                <Sidebar.Pushable as={Segment} >
                    <Sidebar
                        as={Menu}
                        animation='slide along'
                        direction='left'
                        inverted
                        vertical
                        visible={this.state.visible}
                        width='thin'
                    >
                        <Link to={router.BankUsdCost.path} ><Menu.Item as='div'>  <Icon name='dollar' size='large' />  LẤY GIÁ TIỀN USD </Menu.Item></Link>

                    </Sidebar>

                    <Sidebar.Pusher>
                        <Header close_openSideBar={this.close_openSideBar} active_buttonOpen={this.state.active_buttonOpen} />
                        <Overlay visible={this.state.dimmed} close_openSideBar={this.close_openSideBar} />

                        <div className='my-content'>
                            {this.props.switch}
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable >
            </div>
        );
    }
}

export default SideBar;