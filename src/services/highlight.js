import {useSkillsContext} from './skills'
import {useShipsContext} from './ships'
import {useDevicesContext} from './devices'
import {useWeaponsContext} from './weapons'


const addRequiredToItem = skill => item => ({
    ...item,
    required: item.skills[skill.name] ? {name: skill.name, count: item.skills[skill.name]} : undefined,
})


const removeRequiredFromItem = item => item.required ? ({...item, required: undefined}) : item


const addRequiredToSkill = item => skill => ({
    ...skill,
    required: item.skills[skill.name]
        ? {
            count: item.skills[skill.name],
            item,
        } : undefined,
})


const removeRequiredFromSkill = skill => skill.required ? ({...skill, required: undefined}) : skill


export const useHighlight = () => {
    const {skills, setSkills} = useSkillsContext()
    const {ships, setShips} = useShipsContext()
    const {devices, setDevices} = useDevicesContext()
    const {weapons, setWeapons} = useWeaponsContext()

    const highlightSkills = item => setSkills(skills.map(addRequiredToSkill(item)))

    const resetSkillsHighlight = () => setSkills(skills.map(removeRequiredFromSkill))

    const highlightItems = skill => {
        const add = addRequiredToItem(skill)
        setShips(ships.map(add))
        setDevices(devices.map(add))
        setWeapons(weapons.map(add))
    }

    const resetItemsHighlight = () => {
        setShips(ships.map(removeRequiredFromItem))
        setWeapons(weapons.map(removeRequiredFromItem))
        setDevices(devices.map(removeRequiredFromItem))
    }

    return {highlightItems, highlightSkills, resetSkillsHighlight, resetItemsHighlight}
}