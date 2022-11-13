import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CurrencyBalance {
  balance: number
  currencyId: number
  currency: {
    symbol: string
    name: string
  }
}

export interface UserState {
  username: string | null
  email: string | null
  phoneNumber: string | null
  balances: CurrencyBalance[]
}

const initialState: UserState = {
  username: null,
  email: null,
  phoneNumber: null,
  balances: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state: UserState, action: PayloadAction<UserState>) => {
      const { username, phoneNumber, email, balances } = action.payload
      state.username = username
      state.phoneNumber = phoneNumber
      state.email = email
      state.balances = balances
    }
  }
})

export const UserActions = userSlice.actions

export default userSlice.reducer
