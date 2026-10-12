
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GridTable from './routes/gridTable';
import { TotalViewCount } from './routes/totalViewCount';

function App() {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/grid-table" element={<GridTable />} />
        <Route path="/message" element={<TotalViewCount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
