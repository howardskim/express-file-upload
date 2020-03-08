import React, { Component } from 'react'
import {Button, ProgressBar} from 'react-bootstrap'
import axios from 'axios';
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Choose file',
      file: '',
      filePath: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let newFormData = new FormData();
    newFormData.append("uploader", this.state.file);
    axios.post('http://localhost:5000/upload', newFormData ,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }, 
    }).then((resp) => {
      let { filePath, fileName } = resp.data;
      this.setState({
        filePath
      });
    })
  }
  handleChange = (e) => {
    let name = e.target.files[0].name;
    this.setState({
      name,
      file: e.target.files[0]
    })
  }
  // componentDidUpdate(prevProps, prevState){
  //   console.log(prevState, this.state)
  // };
  render() {
    return (
      <div className="container">
        <h1>React File Upload</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            {/* <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupFileAddon01">
              Upload
            </span>
          </div> */}
            <div className="custom-file">
              <input
                onChange={this.handleChange}
                encType="multipart/form-data"
                action="http://localhost:5000/upload"
                method="POST"
                type="file"
                name="uploader"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {this.state.name}
              </label>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
        {this.state.filePath ? <img src={this.state.filePath} /> : ""}
      </div>
    );
  }
}


