import React from 'react'
import {Skills} from './Skills'
import {SkillsContextProvider} from './services/skills'
import {Lvl} from './Lvl'
import {DevicesContextProvider} from './services/devices'
import {WeaponsContextProvider} from './services/weapons'
import {Items} from './Items'
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
