import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Redirect, Route, Switch} from 'react-router'
import {StoreProvider} from './store'
import {FocusVisibleProvider} from './contexts/FocusVisible'
import {ModalBrowserRouter} from './contexts/ModalContext'
import {TextAlert} from './modals/TextAlert'
import {HeaderContainer} from './containers/HeaderContainer'
import {ItemsContainer} from './containers/ItemsContainer'
import {SkillsContainer} from './containers/SkillsContainer'
import {NavigationContainer} from './containers/NavigationContainer'

const ItemDrawer = React.lazy(() =>
  import('./modals/ItemDrawer').then(i => ({default: i.ItemDrawer})),
)

export const App: React.FC = () => (
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route path="/:build([0-9A-Ca-c]{16})">
          <ModalBrowserRouter>
            <FocusVisibleProvider>
              <HeaderContainer />
              <SkillsContainer />
              <br />
              <ItemsContainer />
              <NavigationContainer />
              <TextAlert />
              <Suspense fallback={null}>
                <ItemDrawer />
              </Suspense>
            </FocusVisibleProvider>
          </ModalBrowserRouter>
        </Route>
        <Route>
          <Redirect to="/0000000000000000" />
        </Route>
      </Switch>
    </StoreProvider>
  </BrowserRouter>
)
