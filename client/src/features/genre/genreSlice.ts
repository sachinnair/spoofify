import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getQueryVariable  } from 'src/common/helper/http'

export interface IGenreList {
    value: string[]
}

const initialState: IGenreList = {
    value: [],
}

export const fetchGenres = createAsyncThunk(
    'genre/fetchGenres',
    async (dispatch) => {
        const bearerToken = await getQueryVariable("access_token")
        const resp = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", { headers: { "Authorization": `Bearer ${bearerToken}` } })
        return resp.json()
    }
)

export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        getGenereList: (state) => {

        },
        setGenre: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGenres.fulfilled, (state: IGenreList, action: PayloadAction<{ genres: string[] }>) => {
                state.value = action?.payload?.genres
            })
    }
})

// Action creators are generated for each case reducer function
export const { setGenre } = genreSlice.actions

export default genreSlice.reducer
