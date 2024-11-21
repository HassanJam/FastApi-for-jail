import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ItemList from './components/ItemList';
import CreateItemForm from './components/CreateItemForm';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/create" element={<CreateItemForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
