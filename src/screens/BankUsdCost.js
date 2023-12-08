import React, { Component } from 'react';
import { Form, Button, Icon, Header, Dropdown } from 'semantic-ui-react';

import DataTable from '../components/BankUsdCost/DataTable';

class BankUsdCost extends Component {

    constructor(props)//
    {
        super(props);
        this.state =
        {
            sortBy: '',
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
                    <Form as='div'>
                        <Form.Group >
                            <Form.Field  >
                                <Header as='h3'>GIÁ USD CÁC NGÂN HÀNG</Header>
                            </Form.Field>
                        </Form.Group >
                        <Form.Group >
                            <Form.Field width={2} >
                                <Button color='green' onClick={() => this.DataTableRef.current.LoadDataList()}>
                                    <Icon name='add' />LẤY GIÁ
                                </Button>
                            </Form.Field>
                            <Form.Field width={2} >
                                <Dropdown
                                    placeholder='Sắp xếp'
                                    selection
                                    value={this.state.sortBy}
                                    options={[
                                        { key: '0', value: '', text: '--Chọn--' },
                                        { key: '1', value: 'buyASC', text: 'Giá mua tăng dần' },
                                        { key: '2', value: 'sellASC', text: 'Giá bán tăng dần' },
                                        { key: '3', value: 'buyDESC', text: 'Giá mua giảm dần' },
                                        { key: '4', value: 'sellDESC', text: 'Giá bán giảm dần' },
                                    ]}
                                    onChange={(e, data) => this.setState({ sortBy: data.value })}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </div>
                <div className="my-table" >
                    <DataTable ref={this.DataTableRef} sortBy={this.state.sortBy} />
                </div>
            </React.Fragment>
        );
    }
}

export default BankUsdCost;