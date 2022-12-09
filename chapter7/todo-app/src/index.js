import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import TodosPage from './pages/TodosPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);