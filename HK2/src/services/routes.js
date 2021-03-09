import { Switch, Route } from 'react-router-dom'
import React from 'react';

import Home from '../pages/Home/index';
import List from '../pages/List/index';

export default function Router() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
        </Switch>
      </div>
    )
}