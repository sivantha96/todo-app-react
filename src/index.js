import React from 'react';
import { render } from 'react-dom'

const Todo = props => (
    <div class="item">

        <div class="right floated content">
            <div class="ui negative button" onClick={props.onDelete}>Delete</div>
        </div>
        <div class="middle aligned content">
            <div class="ui avatar image">
                <input class="ui checkbox middle aligned" onChange={props.onToggle} type="checkbox" checked={props.todo.isChecked}></input>
            </div>
            {props.todo.text}
        </div>
    </div>
)

let id = 0

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
        }
    }

    addTodo() {
        const text = prompt("Todo text please!")
        this.setState({ todos: [...this.state.todos, { id: id++, text: text, isChecked: false }] })
    }

    removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    toggleTodo(id) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id !== id) {
                    return todo
                } else {
                    return {
                        id: todo.id,
                        text: todo.text,
                        isChecked: !todo.isChecked
                    }
                }
            })
        })
    }

    render() {
        return (
            <div class="ui container very padded">
                <div class="ui segment padded" style={{alignItems: 'center'}}>
                    <div class="ui segment">
                        <h2 class="ui header">
                            Total TO-DO : {this.state.todos.length}
                        </h2>
                    </div>
                    <div class="ui segment">
                        <h2 class="ui header">
                            Completed TO-DO count: {this.state.todos.filter(todo => todo.isChecked).length}
                        </h2>
                    </div>
                    <div class="ui center aligned container">
                        <button class="ui positive button" onClick={() => this.addTodo()}>Add todo</button>
                    </div>
                </div>
                <div class="ui segment">
                <div class="ui relaxed divided middle aligned list">
                    {this.state.todos.map(todo => (
                        <Todo
                            onDelete={() => this.removeTodo(todo.id)}
                            todo={todo}
                            onToggle={() => this.toggleTodo(todo.id)}
                        />
                    ))}
                </div>
                </div>
                
            </div>
        )
    }
}

render(<App />, document.getElementById('root'));

