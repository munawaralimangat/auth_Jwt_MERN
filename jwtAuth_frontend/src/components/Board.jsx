import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask } from '../redux/kanbanSlice';
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          const taskList = column.taskIds.map((taskId) => tasks[taskId]);

          return <Column key={column.id} column={column} tasks={taskList} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default Board;
