import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string | null
  mail: string | null
  phone: string | null
}

const initialState: UserState = {
  name: null,
  mail: null,
  phone: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state: UserState, action: PayloadAction<UserState>) => {
      const { name, phone, mail } = action.payload
      state.name = name
      state.phone = phone
      state.mail = mail
      console.log({ state })
    }
  }
})

export const UserActions = userSlice.actions

export default userSlice.reducer
