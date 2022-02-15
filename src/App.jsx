import React, { useEffect, useState } from 'react';
import routes from './routes';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(routes.imagesPath());
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <div className="app">
      <h1>TEST APP</h1>
      <main className="images">
        {images.map(({ id, url }) => (
          <img key={id} src={url} alt="" />
        ))}
      </main>
      <footer>© 2018-2019</footer>
    </div>
  );
};

export default App;
