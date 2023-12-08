import React, { Component } from 'react';
import { Table, Button, Loader } from 'semantic-ui-react';

import axios from 'axios';
import constant, { numberWithCommas, RemoveCommas_Regex } from '../_common/constant';


class DataTable extends Component {
    constructor(props)//
    {
        super(props);
        this.state =
        {
            DataListJson: [],
            DataListJSX: [],
            isLoading: false,
        }
    }
    componentDidUpdate(previousProps, previousState)//
    {
        if (previousProps.sortBy !== this.props.sortBy) {
            this.setState({
                DataListJson: this.state.DataListJson.map(item => {
                    item.SellRate = parseFloat(item.SellRate);
                    item.TransferRate = parseFloat(item.TransferRate);
                    return item;
                })
            }, () => this.SortDataList());
        }
    }

    LoadDataList = async () =>//
    {
        this.setState({ isLoading: true, DataListJson: [], DataListJSX: [] });
        const canGetTechcombank = await this.CheckTechcombank();
        axios.get(constant.linkApi + '/BankUsdCost/getList?canGet=' + canGetTechcombank, constant.headers)
            .then(async res => {
                if (res.data != null)//
                {
                    if (!res.data.IsError)// 
                    {
                        let i = 0;
                        let successListJSX = [];
                        let successListJson = [];
                        let errorList = [];

                        res.data.Data.forEach(async item => {
                            if (item.DateExchange !== null) {
                                i++;
                                successListJSX.push(this.rowRender(i, item));
                                successListJson.push(item);
                            }
                            else
                                errorList.push(item);
                        });
                        successListJSX = await this.LoadDataListExtend(successListJSX, successListJson, errorList);

                        this.setState({
                            isLoading: false,
                            DataListJSX: successListJSX,
                            DataListJson: successListJson,
                        });
                    }
                    else
                        this.setState({ isLoading: false });
                }
                else
                    this.setState({ isLoading: false });
            });
    }
    LoadDataListExtend = async (successListJSX, successListJson, errorList) =>//
    {
        let i = successListJSX.length;
        errorList.forEach(async item => {
            if (item.BankName === "Techcombank") {
                let data = await this.Techcombank(item);
                i++;
                successListJSX.push(this.rowRender(i, data));
                successListJson.push(data);
                this.setState({ DataListJSX: successListJSX, DataListJson: successListJson });
            }
            else if (item.BankName === "Bidv") {
                let data = await this.Bidv(item);
                i++;
                successListJSX.push(this.rowRender(i, data));
                successListJson.push(data);
                this.setState({ DataListJSX: successListJSX, DataListJson: successListJson });
            }
            else if (item.BankName === "MSB") {
                let data = await this.MSB(item);
                i++;
                successListJSX.push(this.rowRender(i, data));
                successListJson.push(data);
                this.setState({ DataListJSX: successListJSX, DataListJson: successListJson });
            }
            else {
                i++;
                successListJSX.push(this.rowRender(i, item));
                successListJson.push(item);
                this.setState({ DataListJSX: successListJSX, DataListJson: successListJson });
            }
        });

        return successListJSX;
    }
    SortDataList = () =>//
    {
        this.setState({ isLoading: true, DataListJSX: [] });
        let sortedItems = [];

        if (this.props.sortBy === "sellASC") {
            sortedItems = [].concat(this.state.DataListJson)
                .sort((a, b) => parseFloat(a.SellRate) > parseFloat(b.SellRate) ? 1 : -1);
        }
        else if (this.props.sortBy === "buyASC") {
            sortedItems = [].concat(this.state.DataListJson)
                .sort((a, b) => parseFloat(a.TransferRate) > parseFloat(b.TransferRate) ? 1 : -1)
        }
        else if (this.props.sortBy === "sellDESC") {
            sortedItems = [].concat(this.state.DataListJson)
                .sort((a, b) => parseFloat(a.SellRate) < parseFloat(b.SellRate) ? 1 : -1);
        }
        else if (this.props.sortBy === "buyDESC") {
            sortedItems = [].concat(this.state.DataListJson)
                .sort((a, b) => parseFloat(a.TransferRate) < parseFloat(b.TransferRate) ? 1 : -1)
        }

        this.setState({
            isLoading: false,
            DataListJSX: sortedItems.map((item, i) => this.rowRender((i + 1), item))
        });
    }
    Techcombank = async (result) =>//
    {
        try {
            const res = await axios.get('https://cors-anywhere.herokuapp.com/https://techcombank.com/api/data/exchange-rates?_sort=inputDate:desc,inputTime:desc&_limit=1');
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
        } catch (e) { }
        return result;
    }
    CheckTechcombank = async () => {
        try {
            let res = await axios.get("https://cors-anywhere.herokuapp.com/https://techcombank.com/api/data/exchange-rates?_sort=inputDate:desc,inputTime:desc&_limit=1");
            if (res.data != null)
                return true;
        } catch (e) { }
        return false;
    }
    Bidv = async (result) =>//
    {
        try {
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
        } catch (e) { }
        return result;
    }
    MSB = async (result) =>//
    {
        try {
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
        } catch (e) { }
        return result;
    }

    rowRender = (i, data) =>//
    {
        if (data.DateExchange === null) {
            return (
                <Table.Row key={(new Date().getTime()) + i}>
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
                <Table.Row key={(new Date().getTime()) + i}>
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
                    {this.state.DataListJSX}
                </Table.Body>
            </Table>
        );
    }
}

export default DataTable;