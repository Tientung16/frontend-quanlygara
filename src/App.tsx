import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import { publicRouter } from './router';
import { defaultLayout } from './components/layout';

function App() {
  return (
    <Router>
      <Routes>
        {publicRouter.map((route,index) => {
          const Layout = route.layout === null ? defaultLayout : route.layout ;
          
          const Page = route.component

          return <Route 
                    key={index} 
                    path={route.path} 
                    element={                      
                      <Layout>
                        <Page/>
                      </Layout>
                    }
                  />
        })}
      </Routes>
    </Router>
  );
}

export default App;