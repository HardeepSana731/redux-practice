
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GridTable from './routes/gridTable';
import { TotalViewCount } from './routes/totalViewCount';
import { DeathlyHallowsRace } from './routes/deathlyHallowsRace';
import { SendMessage } from './routes/sendMessage';

function App() {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/grid-table" element={<GridTable />} />
        <Route path="/message" element={<TotalViewCount />} />
        <Route path="/deathlyHallows" element={<DeathlyHallowsRace />} />
        <Route path="/sendMessage" element={<SendMessage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
