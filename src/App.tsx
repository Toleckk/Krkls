import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Redirect, Route, Switch} from 'react-router'
import {Skills} from './components/Skills'
import {Items} from './components/Items'
import {Header} from './components/Header'
import {Navigation} from './components/Navigation'
import {StoreProvider} from './store'
import {FocusVisibleProvider} from './contexts/FocusVisible'
import {ModalBrowserRouter} from './contexts/ModalContext'
import {TextAlert} from './modals/TextAlert'

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
              <Header />
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
