let todosInitialState = {
  todo: { todos: [] },
};

let todoReducer = (state = todosInitialState, action) => {
  switch (action.type) {
    case "add": {
      let newState = { ...state };

      newState.todo = {
        todos: [...newState.todo.todos, action.payload],
      };
      
      return newState;
    }
    case "restore": {
      let newState = { ...state };

      newState.todo = {
        todos: action.payload,
      };
      console.log(newState);
      return newState;
    }
    case "delete": {
      let newState = { ...state };

      newState.todo = {
        todos: [
          ...newState.todo.todos.filter(
            (todo, index) => index !== action.payload
          ),
        ],
      };
      /* const filteredTodoState = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      ); */
      return newState;
    }
    default:
      return todosInitialState;
  }
};
export default todoReducer;
