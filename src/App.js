import Navigation from './Components/Navigation/Navigation';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Logo from './Components/Logo/Logo';
import Link from './Components/ImageLink/ImageLink';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
  // eslint-disable-next-line
import { render } from '@testing-library/react';
import React, { Component } from 'react';








const parti = {
    particles: {
      number:{
        value:150,
        density:{
          enable:true,
          value_area: 1000
        }
      } 
    }
  }

  const initialState = {
    input: '',
    imgUrl:'',
    box:{},
    route:'signin',
    isSignedIn: false,
    user:{
      id:'',
      name: '',
      email: '',
      entries: 0,
      joined:""
    }
  }
  class App extends Component{
constructor() {
      super();
    this.state = initialState
    
  }

  loadUser = (data) => {
    this.setState({user:{
        id:data.id,
        name: data.name,
        email: data.email,
        entries:data.entries,
        joined:data.joined
      }  
    })
  }

 


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onRouteChange = (route) => {
    if( route === 'signout'){
      this.setState(initialState)   
    }
    else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
  this.setState({route: route});
  }
  FaceCalculation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
   

    return { 
      leftCol:clarifaiFace.left_col * width,
      topRow:clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height-(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    
    this.setState({box:box})
  }

    onButtonSubmit = () => {
      this.setState({imgUrl: this.state.input});
          fetch('https://guarded-plateau-99945.herokuapp.com/imageUrl', {
            method:'post',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input:this.state.input
            })
          })
          .then(response => response.json()) 
          .then(response => {
            if (response){
              fetch('https://guarded-plateau-99945.herokuapp.com/image', {
              method:'put',
              headers : {'Content-Type': 'application/json'},
              body: JSON.stringify({
              id:this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user , {entries: count}))
              })
            .catch(console.log)
       }
        this.displayFaceBox(this.FaceCalculation(response))
        })
        .catch(err => console.log(err));      
    }
  
    render(){
      return (
     
        <div className="App">

        <Particles className="particles"
        params={parti}
        />

        <Navigation isSignedIn ={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home' 
        ?
        <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <Link 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
        </div>
        :(
          this.state.route === 'signin' ?
          <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
          :
          <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
        )
        }
        </div>
      );
  
    }
  }

export default App;
