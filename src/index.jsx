import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class AppTitle extends React.Component {
  render() {
    return (
      <AppBar title="Bot Talk" />
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
          <TextField hintText="hello world" value={this.state.message} onChange={this.handleChange} /><br />

          <RaisedButton label="Full width" fullWidth={true} type="submit" label="Make Me Talk" />
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

class PrettyApp extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <App />
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(
  <PrettyApp />,
  document.getElementById("root")
);