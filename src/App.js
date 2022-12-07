import './App.css';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import allActions from './app/actions'

const toDoListActions = allActions.toDoListActions

const ToDoInput = (props) => {
	const [input, changeInput] = useState('')
	const handleChange = (e) => changeInput(e.target.value)
	const dispatch = useDispatch()
	const submit = ()=>{
		dispatch(toDoListActions.addTask(input))
		changeInput('')
	}
	return (
		<div>
		<input
			type='text'
			value={input}
			onChange={handleChange}
		/>
		<button onClick={submit}>submit</button>
		</div>
	);
}
const ToDoList = (props) => {
	const list = useSelector(state=>state.taskList)
	return (
		<ul>
		{list.map((item, index)=>{
        return (<ToDoListItem key={index} index={index} text={item.text} isChecked={item.isChecked} isUpdating={item.isUpdating}/>)
		})}
		</ul>
	);
}

const ToDoListItem = (props) =>{
	const dispatch = useDispatch()
	const changeUpdatingState = (index, bool) => {
		dispatch(toDoListActions.changeUpdatingState(index, bool))
	}
	const element = props.isUpdating
	? (<ToDoListItemUpdating index={props.index} text={props.text} changeUpdatingState={changeUpdatingState}/>)
	: (<ToDoListItemNotUpdating index={props.index} text={props.text} changeUpdatingState={changeUpdatingState} isChecked={props.isChecked}/>)
	return (
		<div>
		{element}
		</div>
	)
}

const ToDoListItemNotUpdating = (props)=>{
	const dispatch = useDispatch()
	
	const handleUpdating =()=>{
		props.changeUpdatingState(props.index, true)
	}
	
	const handleDeleting = ()=>{
		dispatch(toDoListActions.deleteTask(props.index))
	}
	return (
	<div className='flex'>
		<input type='checkbox' checked={props.isChecked} onChange={()=>dispatch(toDoListActions.checkTask(props.index))}/>
		<p>{props.text}</p>
		<button onClick={handleUpdating}>Update</button>
		<button onClick={handleDeleting}>Delete</button>
	</div>	
	)	
}

const ToDoListItemUpdating = (props) =>{
	const [input, changeInput] = useState(props.text)
	const dispatch = useDispatch()
	const handleChange =(e)=> changeInput(e.target.value)
	const confirmUpdate = () =>{
		dispatch(toDoListActions.updateTask(props.index, input))
		dispatch(toDoListActions.changeUpdatingState(props.index,false))
	}
	const cancelUpdate = ()=>{
		dispatch(toDoListActions.changeUpdatingState(props.index,false))
	}
	return (
		<div className='flex'>
		<input
			type='text'
			value={input}
			onChange={handleChange}
		/>
		<button onClick={confirmUpdate}>confirm</button>
		<button onClick={cancelUpdate}>cancel</button>
		</div>

	)
}	

const App = () => {
  return (
    <div className="App">
		<ToDoInput />
		<ToDoList />
    </div>
  );
}

export default App;
