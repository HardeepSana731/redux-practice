import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './features/counter/counterSlice';

function App() {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <div className="App">
      <button  onClick={() => dispatch(increment())} >Click Me</button>
      <>
      {state.counter.value}
      </>
    </div>
  );
}

export default App;
