import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {Skills} from './components/Skills'
import {SkillsContextProvider} from './services/skills'
import {Items} from './components/Items'
import {Header} from './components/Header'
import {HighlightContextProvider} from './services/highlight'
import {ItemsProvider} from './services/items'

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:build([0-9A-F]{0,16})">
                    <SkillsContextProvider>
                        <ItemsProvider>
                            <HighlightContextProvider>
                                <Header/>
                                <br/>
                                <Skills/>
                                <br/>
                                <Items/>
                            </HighlightContextProvider>
                        </ItemsProvider>
                    </SkillsContextProvider>
                </Route>
                <Route>
                    <Redirect to="/"/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
