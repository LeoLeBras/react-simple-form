/* eslint-disable */

// Method 1

class MyComponent extends Component {

  constructor() {
    this.state = {
      foo: 'foo',
    }
  }

  // ...

}



// Method 2

class MyComponent extends Component {

  state = {
      foo: 'foo',
    }
  }

  // ...

}



// Method 3

const MyComponent = React.createClass({

  getInitialState: function() {
    return {
      foo: 'foo',
    }
  }

  // ...

})
