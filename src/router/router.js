import React from 'react';

// import Default from '../screens/Default';
import Default from '../screens/BankUsdCost';
import BankUsdCost from '../screens/BankUsdCost';

const router =
{
  Default: {
    name: "Default",
    key: "Default",
    exact: true,
    path: '/',
    component: <Default />
  },
  BankUsdCost: {
    name: "BankUsdCost",
    key: "BankUsdCost",
    exact: true,
    hasProps: 'BankUsdCost',
    path: '/lay-gia-tien-ngan-hang',
    component: <BankUsdCost />
  },
  // PageNotFound: {
  //   name: "PageNotFound",
  //   key: "PageNotFound",
  //   exact: true,
  //   authenticate: true,
  //   path: '/*',
  //   component: <Login />
  // },
};

export default router;