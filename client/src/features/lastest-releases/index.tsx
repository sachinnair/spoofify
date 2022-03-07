import { useEffect } from "react"
import { createPortal } from "react-dom";
import { Loader  } from "src/common/components/Loader";
import useFetch from 'src/common/hooks/useFetch';
import './styles.css';

interface IAlbumProps {
    name: string,
    img: { url: string, height: number, width: number },
    artists: [{ [key: string]: any }]
}
export const Album = ({ name, img, artists }: IAlbumProps) => {
    return <div className="Card">
        <div style={{ width: img.width, height: img.height, background: 'grey', display: 'inline-block' }}>
            <img src={img.url}/>
        </div>
        <div className="Card-info">
            <div><span><b>{name}</b></span></div>
            <div>{artists.map((x: { [key: string]: any}, index ) => <><a key={x.id} href={x.href}>{x.name}</a> {index < (artists.length - 1) ? '|' : '' } </>)}</div>
        </div>
    </div>
}

// interface ILatestReleasesProps { data: {} }


const LatestReleases = () => {
    const screenWidth = window.screen.availWidth / 2;

    

    const country = 'SE';
    const limit = 10;
    const offset = 5;
    const fetchUrl = `https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}&offset=${offset}`
    const [status, data] = useFetch(fetchUrl)


    return (
        <>
            { createPortal(<Loader isLoading={status === 'fetching'}>
                    <div>...{ status }</div>
                </Loader>, document.getElementById("modalArea") || document.body)}
            { data?.albums?.items?.map(({ id, name, images, artists }: { [key: string]: any }) => {
                return <Album 
                        key={id}
                        name={name}
                        img={images.filter((image: { [key:string]: any }) => image.width < screenWidth)[0]}
                        artists={artists}
                />
            }) }
        </>
    )
}
export default LatestReleases