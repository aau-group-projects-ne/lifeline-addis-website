import {Routes, Route} from 'react-router-dom';
import Homepage from './Homepage/Homepage.jsx';
import Login from './Login/Login.jsx';
import Patient from './Patient dashboard/Patient.jsx';
import Caregiver from './Caregiver/Caregiver.jsx';
import Admin from './Admin/Admin.jsx';
import Signup from './Login/Signup.jsx';

function App(){
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Patient' element={<Patient />} />
      <Route path='/Caregiver' element={<Caregiver />} />
      <Route path='/Admin' element={<Admin />} />
      <Route path='/Signup' element={<Signup />} />
    </Routes>
  );
}
export default App;