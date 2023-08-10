import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Devices from './Devcies/Devices';
import EditNewDevice from './EditNewDevice/EditNewDevice';
import Home from './Home/Home';
import Brands from './Brands/Brands';
import EditNewBrand from './EditNewBrand/EditNewBrand';
import Categories from './Categories/Categories';
import EditNewCategorie from './EditNewCategorie/EditNewCategorie';
import SliderImages from './SliderImages/SliderImages';
import EditNewSliderImg from './EditNewSliderImg/EditNewSliderImg';
import HeaderImages from './HeaderImages/HeaderImages';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditNewHeaderImg from './EditNewHeaderImg/EditNewHeaderImg';
import Messages from './Messages/Messages';
import Orders from './Orders/Orders';

const App = () => {
  return (
    <Router>
      <main>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="devices" element={<Devices />} />
          <Route path="devices/:id" element={<EditNewDevice />} />
          <Route path="devices/new" element={<EditNewDevice />} />

          <Route path="brands" element={<Brands />} />
          <Route path="brands/:id" element={<EditNewBrand />} />
          <Route path="brands/new" element={<EditNewBrand />} />

          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<EditNewCategorie />} />
          <Route path="categories/new" element={<EditNewCategorie />} />

          <Route path="slider-imgs" element={<SliderImages />} />
          <Route path="slider-imgs/:id" element={<EditNewSliderImg />} />
          <Route path="slider-imgs/new" element={<EditNewSliderImg />} />

          <Route path="header-imgs" element={<HeaderImages />} />
          <Route path="header-imgs/:id" element={<EditNewHeaderImg />} />
          <Route path="header-imgs/new" element={<EditNewHeaderImg />} />

          <Route path="messages" element={<Messages />} />

          <Route path="orders" element={<Orders />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
