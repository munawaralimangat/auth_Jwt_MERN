import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {},
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: [],
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        moveTask: (state, action) => {
            const { source, destination, draggableId } = action.payload;
            if (!destination) return;

            const start = state.columns[source.droppableId];
            const finish = state.columns[destination.droppableId];

            // Moving within the same column
            if (start === finish) {
                const newTaskIds = Array.from(start.taskIds);
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);

                const newColumn = {
                    ...start,
                    taskIds: newTaskIds,
                };

                state.columns[newColumn.id] = newColumn;
                return;
            }

            // Moving from one column to another
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds,
            };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            };

            state.columns[newStart.id] = newStart;
            state.columns[newFinish.id] = newFinish;
        },
        addTask:(state,action) =>{
            const {id,content,columnId} = action.payload;
            const newTask = {id,content};
            state.tasks[id] = newTask
            state.columns[columnId].taskIds.push(id)
        }
    }
});

export const { moveTask,addTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;
