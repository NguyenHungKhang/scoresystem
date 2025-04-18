import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchScore from './pages/SearchScore';
import TopTenGroupA from './pages/TopTenGroupA';
import Statistics from './pages/Statistics';
import PlayGround from './pages/PlayGround';
import TopMenu from './components/header';
import { Box } from '@mui/material';


function App() {
  return (
    <Router>
      <TopMenu />
      <Box sx={{
        backgroundColor: '#DAE1DE',
        height: '90vh',
        m: '0 !important',
        p: 2,
        overflowY: 'auto' 
      }}>
        <Routes>
          <Route path="/search-score" element={<SearchScore />} />
          <Route path="/top-ten-a-group" element={<TopTenGroupA />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
