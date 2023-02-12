import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store }from './app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fetchBlogs } from './features/wall/wallSlice';

store.dispatch(fetchBlogs())

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>

);

