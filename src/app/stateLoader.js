const localStorageName = 'todoappstate'

export const loadState =()=>{
	try{
		const serializedState = localStorage.getItem(localStorageName)
		
		if(serializedState === null){
			return initializeState()
		}
		return JSON.parse(serializedState)
		
	
	}catch(err){
		return initializeState()
	}
}
export const saveState = (state) =>{
	try {
		let serializedState = JSON.stringify(state);
		localStorage.setItem(localStorageName, serializedState)
	}catch(errr){
	}
}
const initializeState = () =>{
		return []
	}
