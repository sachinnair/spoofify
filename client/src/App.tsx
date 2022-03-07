import { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import './App.css';
import CMS from './common/app/cms.json'
import Logo from './common/app/Logo'
import MainFrame from './pages/main'
import { Loader  } from './common/components/Loader'


function App() {
  const [isLoading, setIsLoading]= useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000)
  }, [])


  return (
    <>
            { createPortal(<Loader isLoading={isLoading}>
                </Loader>, document.getElementById("modalArea") || document.body)}
      <div className="App">
        <header className="App-header">
          <Logo title={CMS.Product.Title} />
        </header>
        <MainFrame></MainFrame>
      </div>
    </>
  );
}

export default App;
