import React from 'react'
import {Skills} from './Skills'
import {SkillsContextProvider} from './services/skills'
import {Lvl} from './Lvl'
import {DevicesContextProvider} from './services/devices'
import {WeaponsContextProvider} from './services/weapons'
import {Items} from './Items'

export default function App() {
    return (
        <SkillsContextProvider>
            <DevicesContextProvider>
                <WeaponsContextProvider>
                    <Lvl/>
                    <br/>
                    <br/>
                    <span>Умения:</span>
                    <Skills/>
                    <br/>
                    <Items/>
                </WeaponsContextProvider>
            </DevicesContextProvider>
        </SkillsContextProvider>
    )
}
