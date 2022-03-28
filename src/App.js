import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './Pages/ProductPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <>
      <Routes>
        <Route path='/product-page' element={<ProductPage/>} />
      </Routes>
      </>
     );
  }
}
 
export default App;