import { ReactNode } from 'react';
import "./styles.css"

interface ITogglerContainerProps {
    containerContent: ReactNode    
}

const ToggleContainer = ({ containerContent }: ITogglerContainerProps) => {
    return (
        <div className="ToggleContainer">
            { containerContent }
        </div>
    )
}

export default ToggleContainer