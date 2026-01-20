import TodosPage from './features/Todos/TodosPage';
import Header from './shared/Header';
import Logon from './features/Logon';

import { useAuth } from './context/AuthContext';

import './App.css';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);`

  const { token } = useAuth();

  return token ? (
    <>
      <Header message={'Going To Do...'} />
      <TodosPage />
    </>
  ) : (
    <>
      <Header message={'Please Log In'} />
      <Logon />
    </>
  );
}

export default App;
