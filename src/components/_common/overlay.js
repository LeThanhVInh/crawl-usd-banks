import React, { Component } from 'react';

class overlay extends Component {
    constructor(props)//
    {
        super(props);
        this.onClickA = this.onClickA.bind(this);
    }
    onClickA()//
    {
        this.props.close_openSideBar();
    }

    render()//
    {
        return (
            <div
                className='my-Overlay'
                style={{ display: (this.props.visible ? 'block' : 'none') }}
                onClick={this.props.close_openSideBar}
            >
            </div>
        );
    }
}

export default overlay;