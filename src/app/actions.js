const addTask = (text) =>{
	return {
		type:'ADD_TASK',
		task:{
			text,
			isChecked: false,
			isUpdating:false,
		},
	}
}
const changeUpdatingState = (index, bool) =>{
	return {
		type:'CHANGE_UPDATING_STATE',
		index,
		bool,
	}
}
const deleteTask = (index) =>{
	return {
		type:"DELETE_TASK",
		index
	}
}
const updateTask = (index, text) => {
	return{
		type:"UPDATE_TASK",
		text,
		index
	}
}
const checkTask = (index) => {
	return{
		type:"CHECK_TASK",
		index
	}
}

const actions = {
	toDoListActions:{
		addTask,
		deleteTask,
		updateTask,
		checkTask,
		changeUpdatingState,
	},
}
export default actions 
