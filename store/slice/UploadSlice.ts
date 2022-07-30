import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { ModalAction } from '../actions'

interface InitialStateType {
  isOpen: boolean
}

const initialState:InitialStateType = {
  isOpen:false
}

const uploadSlice = createSlice({
  name:'upload',
  initialState,
  reducers: {
    modalToggle(state:InitialStateType,action:PayloadAction<ModalAction>){
      state.isOpen = action.payload.isOpen
    }
  },
  extraReducers: {}
})



export const uploadReducer = uploadSlice.reducer;
export const {modalToggle} = uploadSlice.actions;