const excludeElement = (array, index) => {
		return array.slice(0,index).concat(array.slice(index+1))
	}
const changeElement = (array, index, item) => {
		return array.slice(0,index).concat(item).concat(array.slice(index+1))
	}
	
const taskListReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_TASK':
			return [action.task, ...state]
		case 'DELETE_TASK':
			return excludeElement(state, action.index)
		case 'UPDATE_TASK':
			return changeElement(state, action.index, {
					text: action.text,
					isChecked: state[action.index].isChecked,
					isUpdating: false
			})
		case 'CHECK_TASK':
			return changeElement(state, action.index, {
					text: state[action.index].text,
					isChecked: !state[action.index].isChecked,
					isUpdating: state[action.index].isUpdating
			})
		case 'CHANGE_UPDATING_STATE':
			return changeElement(state, action.index, {
				text:state[action.index].text,
				isChecked:state[action.index].isChecked,
				isUpdating: action.bool
			})
		default:
			return state
	}
		
}	
const rootReducer = {
    taskList: taskListReducer,
}
export default rootReducer
