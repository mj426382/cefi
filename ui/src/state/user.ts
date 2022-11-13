import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  username: string | null
  email: string | null
  phoneNumber: string | null
}

const initialState: UserState = {
  username: null,
  email: null,
  phoneNumber: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state: UserState, action: PayloadAction<UserState>) => {
      const { username, phoneNumber, email } = action.payload
      state.username = username
      state.phoneNumber = phoneNumber
      state.email = email
    }
  }
})

export const UserActions = userSlice.actions

export default userSlice.reducer
