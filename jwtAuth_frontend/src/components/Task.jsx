import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            margin: '8px 0',
            padding: '8px',
            border: '1px solid lightgrey',
            borderRadius: '2px',
            backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
            ...provided.draggableProps.style, // Ensure provided style is merged last
          }}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
