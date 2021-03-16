import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Redirect, Route, Switch} from 'react-router'
import {Skills} from './components/Skills'
import {Items} from './components/Items'
import {Navigation} from './components/Navigation'
import {StoreProvider} from './store'
import {FocusVisibleProvider} from './contexts/FocusVisible'
import {ModalBrowserRouter} from './contexts/ModalContext'
import {TextAlert} from './modals/TextAlert'
import {HeaderContainer} from './containers/HeaderContainer'

const ItemDrawer = React.lazy(() =>
  import('./modals/ItemDrawer').then(i => ({default: i.ItemDrawer})),
)

export const App = () => (
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route path="/:build([0-9A-Ca-c]{16})">
          <ModalBrowserRouter>
            <FocusVisibleProvider>
              <HeaderContainer />
              <Skills />
              <br />
              <Items />
              <Navigation />
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
