// import { type } from "@testing-library/user-event/dist/type" 

import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "../App"

export type TaskType = {
  id: string 
  title: string 
  isDone: boolean  
} 

type PropsType = {
  title: string 
  tasks: Array<TaskType>  
  removeTask: (TaskId: string) => void  
  changeFilter: (value: FilterValuesType) => void 
  addTask: (title: string) => void
}


export function Todolist(props: PropsType) {  
  const [newTaskTitle, setNewTaskTitle] = useState("");  
    

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement> ) => {
       setNewTaskTitle(e.currentTarget.value) 
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
          if(e.charCode === 13) {
                       props.addTask(newTaskTitle)   
                       setNewTaskTitle("")
                   }       
   }  

   const addTask = () => {
       props.addTask(newTaskTitle);
       setNewTaskTitle("");
}


   const onAllClickHandler = () => props.changeFilter("all"); 
   const onAllActiveClickHandler = () => props.changeFilter("active"); 
   const onCapletedClickHandler = () => props.changeFilter("completed"); 

  return <div>   
        <h3>{props.title}</h3> 
      <div>                                
          <input  value={newTaskTitle} onChange={onNewTitleChangeHandler}                                           
           onKeyPress={onKeyPressHandler} /> 
           
          <button onClick={addTask}>+</button>                               
      </div>   
      
 <ul> 
  {  
             props.tasks.map(t => {               
              const onRemoveHandler =  () => {  
                    props.removeTask(t.id) 
                  }

               return  <li key={t.id}>
                 <input type="checkbox" checked={t.isDone} />  
                 <span> {t.title} </span>     
                 <button onClick={onRemoveHandler} >x</button>                                       
      </li> 
    })  
}
        </ul> 
        <div>
          <button onClick={onAllClickHandler} >All</button>
          <button onClick={onAllActiveClickHandler}>Active</button>
          <button onClick={onCapletedClickHandler}>Completed</button>
        </div>
    </div> 
} 
