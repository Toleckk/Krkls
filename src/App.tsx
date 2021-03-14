import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Redirect, Route, Switch} from 'react-router'
import {Skills} from './components/Skills'
import {Items} from './components/Items'
import {Header} from './components/Header'
import {Navigation} from './components/Navigation'
import {AlertProvider} from './services/alert'
import {Alert} from './ui/Alert'
import {Provider} from 'react-redux'
import {store} from './store'
import {FocusVisibleProvider} from './contexts/FocusVisible'
import {ModalProvider} from './contexts/ModalContext'

const ItemDrawer = React.lazy(() =>
  import('./modals/ItemDrawer').then(i => ({default: i.ItemDrawer})),
)

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/:build([0-9A-Ca-c]{16})">
          <AlertProvider>
            <ModalProvider>
              <FocusVisibleProvider>
                <Header />
                <Skills />
                <br />
                <Items />
                <Navigation />
                <Alert />
                <Suspense fallback={null}>
                  <ItemDrawer />
                </Suspense>
              </FocusVisibleProvider>
            </ModalProvider>
          </AlertProvider>
        </Route>
        <Route>
          <Redirect to="/0000000000000000" />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
)
