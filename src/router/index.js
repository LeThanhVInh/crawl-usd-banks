import React from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import routes from '../router/router';
import SideBar from '../components/Header/SideBar';

import '../style/style.css';

function buildRoutes()//
{
  return Object.values(routes).map(el => {
    return <Route exact={el.exact} key={el.key} path={el.path} render={() => el.component} />
  })
}

class ReactRouter extends React.Component {
  constructor(props)//
  {
    super(props);
    this.state =
    {
      isLogin: false,
      isLoading: true,
    };
  }

  async Check()//
  {
    this.setState({ isLogin: true, isLoading: false });
  }
  async componentDidMount()//
  {
    await this.Check();
  }
  render() //
  {
    return (
      <BrowserRouter >
        <SideBar
          switch=
          {
            <Switch On>
              {buildRoutes()}
            </Switch>
          }
        />
      </BrowserRouter>
    );
  }
}


export default ReactRouter;