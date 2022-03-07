import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CMS from 'src/common/app/cms.json'
import useFetch from 'src/common/hooks/useFetch'
import { RootState } from 'src/store'
import { fetchGenres } from './genreSlice'
import './styles.css' 

interface IFetchGenreButtonProps {
    shouldExpand: boolean,
    handleClick: () => void
}

const FetchGenreButton = ({ shouldExpand, handleClick }: IFetchGenreButtonProps) => {
    // const [status, { genres }] = useFetch('https://api.spotify.com/v1/recommendations/available-genre-seeds');
    const genres = useSelector((state:RootState) => state?.genre?.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenres())
    }, [])

    return (
        <div 
            className={shouldExpand ? "ExpandedSectionHeader" : "ButtonSetGenre"}
            onClick={handleClick}
        >
            {CMS.Components.Genre.SET}
            {shouldExpand && genres && <div className="genre-container">
                {genres?.map((x:string) => (<div className="genre-block">{x}</div>))}
            </div>}
        </div>
    )
}
export default FetchGenreButton