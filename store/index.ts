import {AnyAction, configureStore, Dispatch} from '@reduxjs/toolkit'
import { uploadReducer } from './slice/UploadSlice'
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux'
import { userReducer } from './slice/UserSlice'
import type {} from 'redux-thunk/extend-redux'

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: false
  })
})


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();


