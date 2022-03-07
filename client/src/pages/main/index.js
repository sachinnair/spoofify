import { useState } from 'react';
import CMS from "src/common/app/cms.json"
import Toggler from "src/common/components/Toggler"
import FeaturedPlaylist from "src/features/playlist"
import LatestReleases from "src/features/lastest-releases"
import FetchGenreButton from "src/features/genre/FetchGenreButton"
import "./styles.css"


const MainFrame = () => {
    const { Button1: { name: CMSTogglerBtn1 }, Button2: { name: CMSTogglerBtn2 } } = CMS.Pages.MainFrame.Toggler

    const [isExpanded, setIsExpanded] = useState(false);
    
    const TogglerOption = {
        buttons: [{
            id: 'TgButton1',
            name: CMSTogglerBtn1,
            containerContent: <LatestReleases />,
        }, {
            id: 'TgButton2',
            name: CMSTogglerBtn2,
            containerContent: <FeaturedPlaylist />
        }],
        classNames: {
            generic: "TogglerButton",
            active: "TogglerButton--active"
        }
    }
    
    return (
        <>
            <FetchGenreButton 
                shouldExpand={isExpanded}
                handleClick={() => {setIsExpanded(oldState => !oldState)}}
            />
            <Toggler options={TogglerOption} showToggler={!isExpanded} />
        </>
    )
}

export default MainFrame