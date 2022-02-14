import { useEffect, useState } from "react";
import routes from './routes';
import './styles.css';

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
      {images.map(({ id, url }) => <img key={id} src={url} alt='' />)}
    </div>
  );
}

export default App;
