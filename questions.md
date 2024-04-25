## 1.What is the difference between Component and PureComponent? Give an example where it might break my app.
Component and PureComponent are both classes that can be used to create React components. The difference between the two is that PureComponent implements
a shallow comparison of props and state, and re-renders the component only if there are differences in the props or state. This is a performance optimization that can be useful in some cases.

The main problem is shallow comparison. In this example, the UserInfo component is a PureComponent that renders the user's name and hobby.
The user object is passed as a prop to the component. If the user object is updated with the same values, the PureComponent will not re-render the component because it performs a shallow comparison of the props. This can lead to the component not updating when it should, and potentially breaking the app.
```bash
class UserInfo extends React.PureComponent {
  render() {
    return (
      <div>
        <p>Name: {this.props.user.name}</p>
        <p>Hobby: {this.props.user.additionalInfo.hobby}</p>
      </div>
    );
  }
}
```
This is parent component with changes for hobby 
```bash
class User extends React.Component {
  state = {
    user: {
      name: 'Test',
      additionalInfo: {
        hobby: 'Reading',
        age: 25 
      }
    }
  };

  componentDidMount() {
    setTimeout(() => {
      const newUser = {...this.state.user};
      newUser.additionalInfo.hobby = 'Writing'; 
      this.setState({ user: newUser });
    }, 1000);
  }

  render() {
    return <UserInfo user={this.state.user} />;
  }
}
```

## 2.Context + ShouldComponentUpdate might be dangerous. Why is that?
The main problem is that shouldComponentUpdate does not automatically check for changes in context values, 
it looks only at props and state. If component uses context and it need to be updated when the context changes,
we have code it manually to add these changes. If you forget it, our component won't update when the context data changes,
which leads to bugs because it not reflect the latest data.

## 3. Describe 3 ways to pass information from a component to its PARENT.
1. Using a Context. Context gives possibility to set data and get it from any component in the tree.
2. Using a callback function. The parent gives the child a function to call. Whenever the child needs to send information back, it calls this function.
3. To be honest, I won’t say so because I usually use the previous two options

## 4.Give 2 ways to prevent components from re-rendering.
1. Use PureComponent or React.memo for functional components, it prevent re-rendering if the props and state are the same.
2. Use shouldComponentUpdate, it allows you to control when a component should re-render. In shouldComponentUpdate we have
access to the nextProps and the nextState and we can compare it with current props and state. After it we can return
false and component won't re-render.

## 5.What is a fragment and why do we need it? Give an example where it might break my app.
It's a virtual block element that allows us to group elements without adding extra div. It's useful when we need to return multiple elements from a component,
but we don't want to add them in an extra div to the DOM. 
```bash
   <>
    <h1>Some header</h1>
    <p>Some text</p>
  </>

```
And this is example how it can break app. For example, we get element by id (document.getElementById('container')) and we receive only 2 direct children istead of 3.
It's not what we want.
```bash
  render() {
    return (
      <div id="container">
      <>
        <div>Child 1</div>
        <div>Child 2</div>
      </>
      <div>Child 3</div>
    </div>
    );
  }
```

## 6.Give 3 examples of the HOC pattern.
1. **connect** from Redux. Uses to connect component to the Redux store.
2. **withRouter** from react-router. Uses for giving component access to routing information.
3. In general, we can create our own HOC. For example, we can create HOC that will log props of the component.
```bash 
function logProps(Component) {
  return function(props) {
    console.log(props);
    return <Component {...props} />;
  }
}
```

## 7.What's the difference in handling exceptions in promises, callbacks and async...await?
1. In promises we use .catch(). It allows us to handle exceptions in the promise chain. If we don't use it, the exception will be thrown and the promise will be rejected.
    ```bash 
    fetch('...')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    ```

2. In async/await we use try/catch block. We can use try/catch block to handle exceptions in async functions. If there is an error, it will be caught by the catch block.
    ```bash 
    async function fetchData() {
      try {
        const response = await fetch('...');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    ```
3. In callbacks it might be first parameter of the callback function. If everything is fine, the error object is null; otherwise, it contains error details.
    ```bash 
    fetchData((error, data) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log(data);
      }
    });
    ```

## 8.How many arguments does setState take and why is it async.
It takes 2 arguments. Fist it's an object/newState and second it's a callback function (will invoke when component rerender after new state).
The reason why it's async is that React batches multiple setState calls into a single update for better performance.

## 9.List the steps needed to migrate a Class to Function Component.
- Change the class declaration to a function declaration.
- Remove the render method and return the JSX directly from the function.
- Replace this.props with props and this.state with useState.
- Change lifecycle methods to useEffect and other hooks.
- Remove the constructor and use the useState hook for state.
- Change shouldComponentUpdate method to React.memo or useMemo.

## 10.List a few ways styles can be used with components
- Inline styles. We can use style attribute to add styles directly to a component.
- CSS classes. We can use className attribute to add CSS classes to a component. Need to import css file.
- Styled-components. We can use styled-components library to create styled components.
- CSS modules. We can use CSS modules to scope styles to a specific component.
- Preprocessors (SASS/LESS). We can use preprocessors to write styles in a more structured way (variables, nesting, ...). 
- Tailwind. My favorite mobile first library for styling. You don't need to create names for classes, just use them.

## 11.How to render an HTML string coming from the server
To be honest, I don't have a correct answer to this question. I think it's not a good practice to render HTML strings coming from the server.
I am sure that there exist some method for it or even library, but I don't know it. I think it's better to use React components to render the content.