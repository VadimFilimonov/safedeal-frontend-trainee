/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import routes from './routes';

const normalizeDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().padStart(2, '0');
  return `${day}.${month}.${year}`;
};

const Modal = ({ imageId, onClose }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(routes.imagePath(imageId));
      const newData = await response.json();
      setData(newData);
    };

    fetchImage();
  }, [imageId]);

  if (Object.keys(data).length === 0) {
    return null;
  }

  return (
    <>
      <div className="modal">
        <img src={data.url} alt="" />
        <div className="comments">
          {data.comments.map(({ id, date, text }) => (
            <div key={id} className="comment">
              <time className="comment__date">{normalizeDate(date)}</time>
              <div className="comment__text">{text}</div>
            </div>
          ))}
        </div>
        <button
          className="modal__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
      <div className="shade" onClick={onClose} />
    </>
  );
};

export default Modal;
