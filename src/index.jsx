import React from 'react';
import ReactDOM from 'react-dom';

class AppTitle extends React.Component {
  render() {
    return (
      <div>Bot Talk</div>
    )
  }
}

class AppForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message : '',
      status : ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      message : event.target.value,
      status : ''
    });
  }

  handleSubmit(event) {
    fetch("/messages", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "message" : this.state.message
      })
    })
    .then((response) => {
      response.text()
    })
    .then((responseText) => {
      this.setState(
        {
          message : '',
          status : responseText
        }
      )
    })
    .catch((error) => {
      this.setState(
        {
          message : '',
          status : error
        }
      )
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.message} onChange={this.handleChange} />
          <div>
            <input type="submit" value="Make Me Talk" />
          </div>
        </form>

        <span>{this.state.alert}</span>
      </div>
    )
  }
}

class App extends React.Component {

  render() {
    return (
      <div>
        <AppTitle />

        <AppForm />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);