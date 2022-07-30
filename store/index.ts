import {configureStore} from '@reduxjs/toolkit'
import { uploadReducer } from './slice/UploadSlice'
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux'


export const store = configureStore({
  reducer: {
    upload: uploadReducer
  }
})


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();


