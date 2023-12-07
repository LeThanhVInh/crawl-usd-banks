import React, { Component } from 'react';
import { Table, Button, Loader } from 'semantic-ui-react';

import axios from 'axios';
import constant, { numberWithCommas, RemoveCommas_Regex } from '../common/constant';


class DataTable extends Component {
    constructor(props)//
    {
        super(props);
        this.state =
        {
            DataList: [],
            isLoading: false,
        }
    }
    LoadDataList = async () =>//
    {
        this.setState({ isLoading: true });

        axios.get(constant.linkApi + '/BankUsdCost/getList', constant.headers)
            .then(async res => {
                if (res.data != null)//
                {
                    if (!res.data.IsError)//
                    {
                        let i = 0;
                        let successList = [];
                        let errorList = [];
                        res.data.Data.forEach(async item => {
                            if (item.DateExchange !== null) {
                                i++;
                                successList.push(this.rowRender(i, item));
                            }
                            else
                                errorList.push(item);
                        });
                        successList = await this.LoadDataListExtend(successList, errorList);

                        this.setState({
                            isLoading: false,
                            DataList: successList,
                        });
                    }
                    else
                        this.setState({ isLoading: false });
                }
                else
                    this.setState({ isLoading: false });
            });
    }
    LoadDataListExtend = async (successList, errorList) =>//
    {
        let i = successList.length;
        errorList.forEach(async item => {
            if (item.BankName === "Techcombank") {
                let data = await this.Techcombank(item);
                i++;
                successList.push(this.rowRender(i, data));
                this.setState({ DataList: successList });
            }
            else if (item.BankName === "Bidv") {
                let data = await this.Bidv(item);
                i++;
                successList.push(this.rowRender(i, data));
                this.setState({ DataList: successList });
            }
            else if (item.BankName === "MSB") {
                let data = await this.MSB(item);
                i++;
                successList.push(this.rowRender(i, data));
                this.setState({ DataList: successList });
            }
            else {
                i++;
                successList.push(this.rowRender(i, item));
                this.setState({ DataList: successList });
            }
        });

        return successList;
    }
    Techcombank = async (result) =>//
    {
        const res = await axios.get('https://techcombank.com/api/data/exchange-rates?_sort=inputDate:desc,inputTime:desc&_limit=1');
        if (res.data != null) {
            result.DateExchange = res.data[0].inputDate;

            res.data[0].spotRate.some(item => {
                if (item.label === "USD (50,100)") {
                    result.TransferRate = item.bidRateCK;
                    result.SellRate = item.askRate;
                    return true; // Breaks the loop
                }
                return false;
            });
        }
        return result;
    }
    Bidv = async (result) =>//
    {
        const res = await axios.get('https://bidv.com.vn/ServicesBIDV/ExchangeDetailServlet');
        if (res.data != null) {
            result.DateExchange = res.data.day_vi;

            res.data.data.some(item => {
                if (item.nameEN === "US Dollar") {
                    result.TransferRate = RemoveCommas_Regex(item.muaCk);
                    result.SellRate = RemoveCommas_Regex(item.ban);
                    return true; // Breaks the loop
                }
                return false;
            });
        }
        return result;
    }
    MSB = async (result) =>//
    {
        let dateStr = "";
        {
            const res = await axios.get('https://www.msb.com.vn/o/headless-ratecur/v1.0/latest-batch/600');
            if (res.data != null) {
                dateStr = res.data.items[0].dateTime;
            }
        }

        if (dateStr !== "") //
        {
            const res = await axios.get('https://www.msb.com.vn/o/headless-ratecur/v1.0/latest-currency?dateTime=' + dateStr);
            if (res.data != null) {
                res.data.items.some(item => {
                    if (item.currencyCode === "USD") {

                        const utcDate = new Date(dateStr);
                        const localDate = new Date(utcDate.getTime() + (7 * 60 * 60 * 1000));

                        result.DateExchange = localDate.toISOString();
                        result.TransferRate = (item.buyTransferVND);
                        result.SellRate = (item.sellTransferVND);
                        return true; // Breaks the loop
                    }
                    return false;
                });
            }
        }
        return result;
    }
    rowRender = (i, data) =>//
    {
        if (data.DateExchange === null) {
            return (
                <Table.Row key={i}>
                    <Table.Cell textAlign='center'>{i}</Table.Cell>
                    <Table.Cell><b>{data.BankName}</b></Table.Cell>
                    <Table.Cell textAlign='center'>Không lấy được</Table.Cell>
                    <Table.Cell textAlign='right'>Không lấy được</Table.Cell>
                    <Table.Cell textAlign='right'>Không lấy được</Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button color='green' onClick={() => window.open(data.Link, '_blank')}>Mở link</Button>
                    </Table.Cell>
                </Table.Row>
            );
        }
        else
            return (
                <Table.Row key={i}>
                    <Table.Cell textAlign='center'>{i}</Table.Cell>
                    <Table.Cell><b>{data.BankName}</b></Table.Cell>
                    <Table.Cell textAlign='center'>{data.DateExchange}</Table.Cell>
                    <Table.Cell textAlign='right'>{numberWithCommas(data.TransferRate)}</Table.Cell>
                    <Table.Cell textAlign='right'>{numberWithCommas(data.SellRate)}</Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button color='green' onClick={() => window.open(data.Link, '_blank')}>Mở link</Button>
                    </Table.Cell>
                </Table.Row>
            );
    }
    render() {
        if (this.state.isLoading)
            return <Loader active={true}>Đang tải dữ liệu</Loader>;

        return (
            <Table celled selectable >
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>STT</Table.HeaderCell>
                        <Table.HeaderCell>NGÂN HÀNG</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>NGÀY CẬP NHẬT</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right' >MUA CHUYỂN KHOẢN</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>BÁN CHUYỂN KHOẢN</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>LINK</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.DataList}
                </Table.Body>
            </Table>
        );
    }
}

export default DataTable;