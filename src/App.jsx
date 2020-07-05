import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {Skills} from './components/Skills'
import {SkillsContextProvider} from './services/skills'
import {Items} from './components/Items'
import {Header} from './components/Header'
import {HighlightContextProvider} from './services/highlight'
import {ItemsProvider} from './services/items'
import {TrackableRouter} from './services/history'
import {Navigation} from './components/Navigation'

export default function App() {
    return (
        <TrackableRouter>
            <Switch>
                <Route path="/:build([0-9A-Fa-f]{16})">
                    <SkillsContextProvider>
                        <ItemsProvider>
                            <HighlightContextProvider>
                                <Header/>
                                <br/>
                                <Skills/>
                                <br/>
                                <Items/>
                                <Navigation/>
                            </HighlightContextProvider>
                        </ItemsProvider>
                    </SkillsContextProvider>
                </Route>
                <Route>
                    <Redirect to="/0000000000000000"/>
                </Route>
            </Switch>
        </TrackableRouter>
    )
}
