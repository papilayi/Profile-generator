import { Fragment, useState } from 'react';
import './App.css';
import axios from 'axios';
import Button from './components/Button';

// Managing state and API 
const App = ()  => {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  const onClickHandler = ()=>{
    setActiveLink(0);
    setLoading(true);
    axios.get('https://randomuser.me/api/')
    .then((response) => {
      console.log(response.data.results);
      setUserData(response.data.results);
    }).catch((error)=>{
      console.log(error);
      setLoading(true);
    }).finally(()=>{
      setLoading(false);
      setActiveUser(true);
    })
  }


  const icons = [
    'fas fa-user fa-2x',
    'fas fa-envelope fa-2x',
    'fas fa-calender-alt fa-2x',
    'fas fa-map-marker fa-2x',
    'fas fa-phone fa-2x',
    'fas fa-lock fa-2x',
  ];

// What should come up when a user is generated
  const PhraseGenerator = ({user}) =>{
    const phrases = [
      `Hi my name is ${user.name.first} ${user.name.last}`,
      `My email address is ${user.email}`,
      `I was born on ${user.dob.date.slice(0 ,10)}`,
      `My country is ${user.location.country}`,
      `My phone number is ${user.phone}`,
      `My password is ${user.login.password}`,
    ]; 
    return <h1>{phrases[activeLink]}</h1>
  }

  const activeLinkHandler = (index) => {
    setActiveLink(index);
  }

  const style = {
    color: "green",
  }


  return (
    <div className="App">
      <h1>Random User Generator App</h1>
      <Button isActive={activeUser} clicked={onClickHandler}></Button>
      {loading ?(
        <h1>Loading...</h1>
      ):(
        <div className='app__user'>
          {userData.map((user)=>{
            return(
              <Fragment key={user.cell}>
                <img src={user.picture.large} alt="#"></img>
                <PhraseGenerator user={user}></PhraseGenerator>
                  <div className='app__icons'>
                    {icons.map((icon, index) =>{
                      return(
                        <i className={icon}
                         key={index} 
                         onMouseEnter={()=>activeLinkHandler(index)}
                         style={activeLink === index ? style : null}
                         ></i>
                      )
                    })}
                  </div>
              </Fragment>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default App;
