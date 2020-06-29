import React from 'react'
import {Skills} from './components/Skills'
import {SkillsContextProvider} from './services/skills'
import {Lvl} from './components/Lvl'
import {DevicesContextProvider} from './services/devices'
import {WeaponsContextProvider} from './services/weapons'
import {Items} from './components/Items'
import {ShipsContextProvider} from './services/ships'

export default function App() {
    return (
        <SkillsContextProvider>
            <DevicesContextProvider>
                <WeaponsContextProvider>
                    <ShipsContextProvider>
                        <Lvl/>
                        <br/>
                        <br/>
                        <span>Умения:</span>
                        <Skills/>
                        <br/>
                        <Items/>
                    </ShipsContextProvider>
                </WeaponsContextProvider>
            </DevicesContextProvider>
        </SkillsContextProvider>
    )
}
