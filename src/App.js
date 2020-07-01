import React from 'react'
import {Skills} from './components/Skills'
import {SkillsContextProvider} from './services/skills'
import {Lvl} from './components/Lvl'
import {DevicesContextProvider} from './services/devices'
import {WeaponsContextProvider} from './services/weapons'
import {Items} from './components/Items'
import {ShipsContextProvider} from './services/ships'
import {Control} from './components/Control'

export default function App() {
    return (
        <SkillsContextProvider>
            <DevicesContextProvider>
                <WeaponsContextProvider>
                    <ShipsContextProvider>
                        <header style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Lvl/>
                            <Control/>
                        </header>
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
