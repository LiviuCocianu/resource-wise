import { createSlice } from "@reduxjs/toolkit"
import { USER_TYPE } from "../../constants"

const initialState = {
    id: 1,
    name: "Lorem Ipsum",
    type: USER_TYPE.ONG,
    donations: 0
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setID: (state, action) => {
            const payload = action.payload
            state.id = payload
            return state
        },
        setUserName: (state, action) => {
            const payload = action.payload
            state.name = payload
            return state
        },
        setUserType: (state, action) => {
            const payload = action.payload
            state.type = payload
            return state
        },
        setDonationCount: (state, action) => {
            const payload = action.payload
            state.donations = payload
            return state
        },
        resetUser: (state) => {
            state = initialState
            return state
        }
    }
})

export const { setID, setUserName, setUserType, setDonationCount, resetUser } = userSlice.actions
export default userSlice.reducer