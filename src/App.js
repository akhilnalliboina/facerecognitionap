import React,{ Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'; 
import Logo from './components/logo'; 
import Imagelinkform from './components/ImageLinkform'; 
import FaceRecognition from './components/FaceRecognition'; 
import Particles from 'react-particles-js';
import Rank from './components/Rank';
import Signin from './components/signin';
import Register from './components/register';

const ParticleOptions= {
  particles: {
    number: {
      value:30,

      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

const initialState={
  input:'',
  imageURL: '',
  cname:'',
  probability:0,
  route: 'Signin',
  isSignedIn:false,
  user:
    {
        id:'',
        name: '',
        email:'',
        password:'',
        entries:0,
        joined: ''

    }
}
class App extends Component {
  constructor(){

    super();
    this.state={
      input:'',
      imageURL: '',
      cname:'',
      probability:0,
      route: 'Signin',
      isSignedIn:false,
      user:
        {
            id:'',
            name: '',
            email:'',
            password:'',
            entries:0,
            joined: ''

        }
    }
  }
  
loadUser=(data)=>{
  this.setState({
    user:
        {
            id:data.id,
            name: data.name,
            email:data.email,
            entries:data.entries,
            joined:data.joined

        }
  })

}
  

  onInputChange=(event)=>{
   this.setState({input:event.target.value})

  }

  onCountChange=(response)=>{
    if(response){
      fetch('https://boiling-basin-26975.herokuapp.com/image',{
      method:'put',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        id:this.state.user.id
      })
    }).then(response => response.json())
    .then(count=>{
      this.setState(Object.assign(this.state.user,{entries:count}))
    })
    .catch(err=>console.log(err))}
  }

  
  onButtonSubmit=(event)=>{

    this.setState({imageURL:this.state.input} );
    fetch('https://boiling-basin-26975.herokuapp.com/imageURL',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        input:this.state.input
      })
    }).then(response=>response.json())
    .then(response=>{ 
      this.onCountChange(response);
      console.log(response)
      this.setState({
        cname:response.outputs[0].data.regions[0].data.concepts[0].name,
        probability:parseInt((response.outputs[0].data.regions[0].data.concepts[0].value)*100)
      })})}


  onRouteChange=(route)=>{
    if(route==='SignOut'){this.setState(initialState)}
    else if (route==='Home'){this.setState({isSignedIn:true})}
this.setState({
  route:route
});
  }
  
  render(){
    const {isSignedIn,imageURL, route, cname,probability} = this.state;
    return (

    <div className="App">
      
      <Particles className='particles' 
              params={ParticleOptions}
            />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {
    route==='Home'? 
      <div>
        <Logo/>
    <Rank cname={cname}  
    probability={probability} 
    name={this.state.user.name}
    entries={this.state.user.entries} />
    <Imagelinkform 
    onInputChange={this.onInputChange} 
    onButtonSubmit={this.onButtonSubmit} />
    <FaceRecognition imageUrl={imageURL}/>
    </div>
    :
    (route==='Signin'?
    <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
    <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> )
     } 
     </div>

  )
}
}
export default App;
