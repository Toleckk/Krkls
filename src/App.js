import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {Skills} from './components/Skills'
import {SkillsContextProvider} from './services/skills'
import {DevicesContextProvider} from './services/devices'
import {WeaponsContextProvider} from './services/weapons'
import {Items} from './components/Items'
import {ShipsContextProvider} from './services/ships'
import {Header} from './components/Header'
import {HighlightContextProvider} from './services/highlight'

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:build([0-9A-F]{0,16})">
                    <SkillsContextProvider>
                        <DevicesContextProvider>
                            <WeaponsContextProvider>
                                <ShipsContextProvider>
                                    <HighlightContextProvider>
                                        <Header/>
                                        <br/>
                                        <Skills/>
                                        <br/>
                                        <Items/>
                                    </HighlightContextProvider>
                                </ShipsContextProvider>
                            </WeaponsContextProvider>
                        </DevicesContextProvider>
                    </SkillsContextProvider>
                </Route>
                <Route>
                    <Redirect to="/"/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
