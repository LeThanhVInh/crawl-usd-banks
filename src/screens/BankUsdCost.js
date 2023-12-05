import React, { Component } from 'react';
import { Grid, Button, Icon, Header } from 'semantic-ui-react';

import DataTable from '../components/BankUsdCost/DataTable';

class BankUsdCost extends Component {

    constructor(props)//
    {
        super(props);
        this.state =
        {
        }

        this.DataTableRef = React.createRef();
    }
    componentDidMount()//
    {
        document.title = "LẤY GIÁ USD CÁC NGÂN HÀNG";
    }
    render() //
    {
        return (
            <React.Fragment>
                <div style={{ margin: '18px 12px' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={16} computer={8}>
                                <Header as='h3'>GIÁ USD CÁC NGÂN HÀNG</Header>
                            </Grid.Column>
                            <Grid.Column textAlign='right' mobile={16} tablet={16} computer={8}>
                                <Button color='green' onClick={() => {
                                    this.DataTableRef.current.LoadDataList();
                                }}><Icon name='add' />LẤY GIÁ</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
                <div className="my-table" >
                    <DataTable ref={this.DataTableRef} />
                </div>
            </React.Fragment>
        );
    }
}

export default BankUsdCost;