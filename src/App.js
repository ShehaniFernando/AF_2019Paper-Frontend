import './App.css';
import NavBar from './components/navBar/navBar';
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Categories from './components/categories/categories';
import CreateRoom from './components/createRoom/createRoom';
import CreateCategory from './components/createCategory/createCategory';
import RoomList from './components/categories/roomList';

function App() {
  return (
    <div>
      <Router> 
          <NavBar/>
          <section>
            <Switch>     
              <Route path = "/" component={Categories} exact/>
              <Route path = "/create-room" component={CreateRoom} />
              <Route path = "/create-category" component={CreateCategory} />
              <Route path = "/:id" component = {RoomList}/>
            </Switch>
          </section>
      </Router>
    </div>
  );
}

export default App;
