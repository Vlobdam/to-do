import './App.css';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import allActions from './app/actions'
import {Text, TopWrapper, NotUpdatingWrapper, Container, Button, UpdatingWrapper, Header} from './styleComponents'

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
		<TopWrapper>
		<input
			type='text'
			value={input}
			onChange={handleChange}
		/>
		<button onClick={submit}>submit</button>
		</TopWrapper>
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
	<NotUpdatingWrapper>
		<input type='checkbox' checked={props.isChecked} onChange={()=>dispatch(toDoListActions.checkTask(props.index))}/>
		<Text>{props.text}</Text>
		<Container>
		<Button onClick={handleUpdating}>Update</Button>
		<Button onClick={handleDeleting}>Delete</Button>
		</Container>
	</NotUpdatingWrapper>	
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
	<UpdatingWrapper>
		<input
			key={props.index}
			type='text'
			value={input}
			onChange={handleChange}
		/>
		<Button onClick={confirmUpdate}>Confirm</Button>
		<Button onClick={cancelUpdate}>Cancel</Button>
	</UpdatingWrapper>

	)
}	

const App = () => {
  return (
    <div>
		<Header>To Do App</Header>
		<ToDoInput />
		<ToDoList />
    </div>
  );
}

export default App;
