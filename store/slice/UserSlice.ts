import {createAsyncThunk, createSlice,PayloadAction} from '@reduxjs/toolkit'

import { doc, DocumentData, getDoc } from 'firebase/firestore'

interface InitialStateType {
 user : DocumentData 
}


const initialState:InitialStateType = {
  user: {}
}




// state.name = action.payload.name
//   state.username = action.payload.name.split(" ").join("").toLowerCase().replace(/-/,"")
//   state.email = action.payload.email
//   state.uid = action.payload.uid
//   state.userImage = action.payload.userImage

export const currentUserHandler = createAsyncThunk('user/currentUserHandler',(userInfo:DocumentData) => {
  
  return userInfo;
})



// name: user.displayName,
// email: user.email,
// userImage: user.photoURL,
// uid: user.uid,
// timestamp: serverTimestamp(),
// username: user.displayName?.split(" ").join("").toLowerCase()
const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(currentUserHandler.fulfilled,(state,action) => {
      state.user = action.payload
    })

  }
  
})



export const userReducer = userSlice.reducer;
// export const {} = userSlice.actions;


