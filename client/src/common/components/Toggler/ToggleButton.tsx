import { MouseEventHandler, MouseEvent, useState } from "react"
import './styles.css'

export interface IButton {
    id: string,
    name: string,
}

export interface IClassNames {
    generic: string,
    active: string
}

export interface IToggleButtonProps {
    classNames: IClassNames,
    buttons: Array<IButton>,
    handleClick: (buttonId: string, index?: number) => void
}

const ToggleButton = ({ classNames, buttons, handleClick }: IToggleButtonProps) => {
    const [selectedBtn, setSelectedBtn] = useState<string>(buttons[0].id);    

    return (
        <div className="TogglerButtonHolder">
            {buttons.map((x) => {
                return (
                <button 
                    className={`${
                        (x.id===selectedBtn) ? classNames.active: classNames.generic 
                    }`} 
                    key={x.id} 
                    onClick={(e: MouseEvent) => {
                        handleClick(x.id)
                        setSelectedBtn(x.id)
                    }}> 
                    { x.name }
                </button>)
            })}
        </div>
    )
}

export default ToggleButton