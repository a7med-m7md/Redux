/* Store */
// get State -->> getState function
// listen to the changes  -->> subscribe , unsubscribe, actions, dispatch
// update the state  -->>  reducer

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodo(todo){
    return {
        type: ADD_TODO,
        todo:{
            id: todo.id,
            name: todo.name
        }
    }
}

function removeTodo(todo){
    return {
        type: REMOVE_TODO,
        id: todo.id,
    }
}

function addGoal(goal){
    return {
        type: ADD_GOAL,
        todo:{
            id: goal.id,
            name: goal.name
        }
    }
}

function removeGoal(goal){
    return {
        type: REMOVE_GOAL,
        id: goal.id,
    }
}


//Reducer is a pure function
// his arguement return the same value as same as they change
// its values isnot depends on the outside scope
// doesn't produce any side effects such networking requests


function todo(state=[], action){
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter(item => item.id != action.id)
        default: 
            return state
    }
}

function goal(state=[], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(item => action.id != item.id)
        default:
            return state
    }
}

function createStore(reducer){
    let state

    const listeners = []

    const dispatch = (action)=>{
        state = reducer(state, action)
        return listeners.forEach(listener=> listener())
    }

    const subscribe = (listener)=>{
        listeners.push(listener)
        return listeners.filter(l=> l != listener)
    }
    const getState = ()=> state

    return{
        getState,
        subscribe,
        dispatch
    }

}
function app(state= {}, action){
    return{
        todo: todo(state.todo, action),
        goal: goal(state.goal, action)
    }
}
const store = createStore(app)
const unsubscribe = store.subscribe(()=> console.log("Hello from Redux !"))

store.dispatch(addTodo({id:1, name: 'studing'}))
store.dispatch(addTodo({id:2, name: 'watching a movie'}))
store.dispatch(removeTodo({id:1}))
store.dispatch(addGoal({id:3, name: 'finishing lesson 2'}))
console.log(store.getState())


