import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import CardAdd from './CardAdd';

const TaskList = ({ list, listIndex, boardIndex, dispatch }) => (
  <Draggable draggableId={String(list.id)} index={listIndex} key={String(list.id)}>
    {(provided) => (
      <div
        className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <div className="list-body">
          <div className="flex justify-between p-1" {...provided.dragHandleProps}>
            <span>{list.title}</span>
          </div>

          <Droppable droppableId={String(list.id)} type="CARD">
            {(provided, snapshot) => (
              <div
                className="py-1"
                ref={provided.innerRef}
                style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                {...provided.droppableProps}
              >
                {list.items.map((item, index) => (
                  <Draggable draggableId={String(item.id)} index={index} key={String(item.id)}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          item={item}
                          boardIndex={boardIndex}
                          listIndex={listIndex}
                          dispatch={dispatch}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <CardAdd
            getcard={(card) =>
              dispatch({
                type: 'board/addCardToList',
                payload: { boardIndex, listIndex, card },
              })
            }
          />
        </div>
      </div>
    )}
  </Draggable>
);

export default TaskList;
