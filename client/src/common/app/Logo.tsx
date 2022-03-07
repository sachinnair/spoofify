import './Logo.css'

interface ILogoProp {
    title: string
}

function Logo({ title }: ILogoProp) {
    return (
        <>
        <div className="Logo-image" ></div>
        <div className="Logo-text">{ title }</div>
        </>
    )
}

export default Logo