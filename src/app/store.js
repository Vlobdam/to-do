import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'
import {saveState, loadState} from './stateLoader'
const preLoad = loadState()
export const store = configureStore({reducer: rootReducer, preloadedState: preLoad});

store.subscribe(()=>{
	saveState(store.getState())
})

