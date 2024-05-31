import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

function Column({column,tasks}) {
  return (
    <div style={{ margin: '0 8px', border: '1px solid lightgrey', borderRadius: '2px', width: '220px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ padding: '8px' }}>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided)=>(
          <div 
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ padding: '8px', backgroundColor: 'white', flexGrow: 1, minHeight: '100px' }}
          >
            {tasks.map((task,index) =>(
              <Task key={task.id} task={task} index={index}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column
