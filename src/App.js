import React from 'react';
import './App.css';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AppMenu from './stylesComponents/AppMenu'
import Alldata from "./components/AllData"
import SearchBox from "./components/SearchBox"
import Error from "./components/LoadError"

const { Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout className="layout">
        <AppMenu />
        <Content style={{ padding: '0 64px' }}>
          <Switch>
              <Route exact path="/" component={Alldata} />
              <Route path="/alldata" component={Alldata} />
              <Route path="/search" component={SearchBox} />
              <Route path="/error" component={Error} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Created by Liam Strevens
        </Footer>
    </Layout>
  </BrowserRouter>
  );
}

export default App;
