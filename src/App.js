import React from 'react'
import {Skills} from './components/Skills'
import {SkillsContextProvider} from './services/skills'
import {DevicesContextProvider} from './services/devices'
import {WeaponsContextProvider} from './services/weapons'
import {Items} from './components/Items'
import {ShipsContextProvider} from './services/ships'
import {Header} from './components/Header'

export default function App() {
    return (
        <SkillsContextProvider>
            <DevicesContextProvider>
                <WeaponsContextProvider>
                    <ShipsContextProvider>
                        <Header/>
                        <br/>
                        <Skills/>
                        <br/>
                        <Items/>
                    </ShipsContextProvider>
                </WeaponsContextProvider>
            </DevicesContextProvider>
        </SkillsContextProvider>
    )
}
