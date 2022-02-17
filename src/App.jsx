import React, { useEffect, useState } from 'react';
import routes from './routes';
import Modal from './Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [imageId, setImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(routes.imagesPath());
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  const handleImageClick = (id) => () => {
    setModalVisibility(true);
    setImageId(id);
  };

  const handleModalClose = () => {
    setModalVisibility(false);
    setImageId(null);
  };

  return (
    <div className="app">
      <h1>TEST APP</h1>
      <main className="images">
        {images.map(({ id, url }) => (
          <img key={id} src={url} alt="" onClick={handleImageClick(id)} />
        ))}
      </main>
      <footer>© 2018-2019</footer>
      {modalVisibility && (
        <Modal imageId={imageId} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default App;
