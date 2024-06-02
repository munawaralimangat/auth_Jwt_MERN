import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask,addTask } from '../redux/kanbanSlice';
import Column from './Column';

function Board () {
  const dispatch = useDispatch();
  const { tasks, columns, columnOrder } = useSelector((state) => state.kanban);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    dispatch(moveTask({ source, destination, draggableId }));
  };

  const handleAddTask = (columnId) =>{
    const id = Date.now().toString()
    const content = prompt('enter task')
    if(content){
      dispatch(addTask({id,content,columnId}))
    }
  }
  const handleDeleteTask = ()=>{

  }

  const handleUpdateTask = ()=>{

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          const taskList = column.taskIds.map((taskId) => tasks[taskId]);

          return (
            <div key={column.id}>
                        <Column
                            column={column}
                            tasks={taskList}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTask={handleUpdateTask}
                        />
                <button onClick={() => handleAddTask(column.id)}>Add Task</button>
            </div>
        )
        })}
      </div>
    </DragDropContext>
  );
}

export default Board;
