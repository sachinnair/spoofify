import { forwardRef, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Logo from 'src/common/app/Logo'
import CMS from 'src/common/app/cms.json'
import './styles.css'


interface ILoaderProps {isLoading: boolean, children: ReactNode}

export const Loader = ({ isLoading, children }: ILoaderProps) => {
    
    return (<div 
            className="LoaderHolder"
            style={{ display: isLoading ? "": "none", position: 'absolute', top: 0  }}>
                <div className="LogoHolder"><Logo title={CMS.Product.Title} /></div>
                { children }
        </div>)  
}

interface IPortalModal {
    children: ReactNode 
}

export const PortalModal =  ({ children  }: IPortalModal) => {
    return (ReactDOM.createPortal(children, document.getElementById("modalArea") || document.body))
}

interface IPortedLoaderProps {
    isLoading: boolean,
    children: ReactNode
}

const PortedLoader = ({ isLoading, children }: IPortedLoaderProps) => {
    return(
        <PortalModal>
            <Loader isLoading={isLoading}>
                { children }
            </Loader>
        </PortalModal>
    )
}

export default PortedLoader
