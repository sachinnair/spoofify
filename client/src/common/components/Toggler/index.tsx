import { ReactNode, useState } from 'react'
import ToggleButton, { IClassNames, IButton, IToggleButtonProps } from './ToggleButton'
import ToggleContainer from './ToggleContainer'
import './styles.css'

export interface ITgButton extends IButton {
    containerContent: ReactNode
} 

type ITgOptions = Pick<IToggleButtonProps, "buttons" | "classNames" >

interface ITogglerProps {
    options: ITgOptions,
    showToggler: boolean
}


const Toggler = ({ options, showToggler }: ITogglerProps) => {

    const [containerComponent, setContainerComponent] = useState<ReactNode>((options.buttons[0] as ITgButton).containerContent);

    const handleClick = (tgButtonId: string, ind?: number): void => {
        const selectedButton: ITgButton = options.buttons.filter(x => x.id === tgButtonId)[0] as ITgButton

        setContainerComponent(selectedButton.containerContent)
    }

    return (
        <div className="TogglerDefaults" style={{ display: showToggler ? '' : 'none'  }}>
            <ToggleButton classNames={options.classNames} buttons={options.buttons} handleClick={handleClick}/>
            <ToggleContainer containerContent={containerComponent} />
        </div>
    )
}
export default Toggler