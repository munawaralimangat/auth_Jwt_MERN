import React from 'react'
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'

const chars = [{
    id:'john',
    name:'John'
},
{
    id:'jose',
    name:'jose'
},
{
    id:'ram',
    name:'ram'
},
{
    id:'raj',
    name:'raj'
}]


function Test() {

    const [characters,updateCharacters] = useState(chars)
    function handleOnDragEnd(result){
        if (!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='chars' >
            {(provided)=>(
                    <div>
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {characters.map(({id,name},index)=>{
                          return (
                            <Draggable key={id} draggableId={id} index={index} >
                                {(provided)=>(
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <p>{name}</p>
                                    </li>
                                    )}
                            </Draggable>
                          )
                      })}
                    </ul>
                    {provided.placeholder}
                  </div>
  )}
        </Droppable>
    </DragDropContext>
  )
}

export default Test
