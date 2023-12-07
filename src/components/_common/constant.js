import React from 'react';

// var linkApi = 'https://phanmemvas.vn:444';
var linkApi = 'http://localhost:64746';
var headers =
{
    headers:
    {
        "Content-type": "application/json",
        "Accept": "application/json",
    }
}
export default {
    'linkApi': linkApi,
    'headers': headers,
    'validateJSX': <span style={{ color: 'red' }}>(✱)</span>
}

export function getURLQueryString(querystring)//
{
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get(querystring));
}
export function RemoveCommas_Regex(string)//
{
    string = string.toString();
    return string.replace(/(?:,)/g, "");
}
export function getMonday(date)//
{
    date = new Date(date);
    var day = date.getDay(),
        diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
}
export function getSunday(date)//
{
    date = new Date(date);
    var day = date.getDay(),
        diff = date.getDate() - day + (day === 0 ? -6 : 7); // adjust when day is sunday
    return new Date(date.setDate(diff));
}

export function numberWithCommas(x)//
{
    if (x === "" || x === null || x === 'null')
        return "";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function addDays(date, days) //
{
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
export function addMonths(date, months) //
{
    var result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

export function convertFromDate_DD_MM_YYYY(mytime)//
{
    if (mytime === "")
        return null;
    return new Date((addLeadingZeros(mytime.getDate(), 2)) + "/" + (addLeadingZeros((mytime.getMonth() + 1), 2)) + "/" + mytime.getFullYear() + "GMT-0000");
}
export function convertFromDate_MM_DD_YYYY(mytime)//
{
    if (mytime === "")
        return null;
    return new Date(mytime.getFullYear() + "-" + (addLeadingZeros((mytime.getMonth() + 1), 2)) + "-" + (addLeadingZeros(mytime.getDate(), 2))
    );
}
export function convertFromString_MM_DD_YYYY_ToString(str)//
{
    if (str === "")
        return "";
    else //
    {
        var arr = str.split('/');
        return arr[0] + '/' + arr[1] + '/' + arr[2];
    }

}
export function convertFromString_DD_MM_YYYY_ToString(str)//
{
    if (str === "")
        return "";
    else //
    {
        var arr = str.split('/');
        return arr[1] + '/' + arr[0] + '/' + arr[2];
    }

}
export function convertFromString_YYYY_MM_DD_ToString(str)//
{
    if (str === "")
        return "";
    else //
    {
        var arr = str.split('/');
        return arr[2] + '/' + arr[1] + '/' + arr[0];
    }

}
export function convertFromDate_DD_MM_YYYY_ToString(mytime)//
{
    if (mytime === "")
        return "";
    return (addLeadingZeros(mytime.getDate(), 2)) + "/"
        + (addLeadingZeros((mytime.getMonth() + 1), 2)) + "/"
        + mytime.getFullYear();

}
export function convertFromDate_DD_MM_YYYY_HH_mm_ToString(mytime)//
{
    if (mytime === "")
        return "";
    mytime = new Date(mytime);
    return (addLeadingZeros(mytime.getDate(), 2)) + "/"
        + (addLeadingZeros((mytime.getMonth() + 1), 2)) + "/"
        + mytime.getFullYear()
        + ' '
        + mytime.toString().slice(16, 21);

}
export function convertFromDate_MM_DD_YYYY_ToString(mytime)//
{
    if (mytime === "")
        return "";
    return (addLeadingZeros((mytime.getMonth() + 1), 2)) + "/"
        + (addLeadingZeros(mytime.getDate(), 2)) + "/"
        + mytime.getFullYear();

}
export function convertFromDate_DD_MM_ToString(mytime)//
{
    if (mytime === "")
        return "";
    return (addLeadingZeros(mytime.getDate(), 2)) + "/" + (addLeadingZeros((mytime.getMonth() + 1), 2));
}
export function convertFromDate_DD_MM_YY_ToString(mytime)//
{
    if (mytime === "")
        return "";
    return (addLeadingZeros(mytime.getDate(), 2)) + "/"
        + (addLeadingZeros((mytime.getMonth() + 1), 2)) + "/"
        + mytime.getFullYear().toString().substr(-2);
}
export function getTimeFromDate_ToString(mytime)//
{
    if (mytime === "")
        return "";
    return mytime.toString().slice(16, 21);
}
export function convertFromString_DD_MM_YYYY_HH_mm(mytime)//
{
    if (mytime === "")
        return null;
    return new Date(
        mytime.split(' ')[0].split('/')[2]//year
        + "-" + addLeadingZeros(mytime.split(' ')[0].split('/')[1], 2)//month
        + "-" + addLeadingZeros(mytime.split(' ')[0].split('/')[0], 2)//day
        + "T" + mytime.split(' ')[1] + ":00"//time
        + ".000Z"
    );
}
export function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}