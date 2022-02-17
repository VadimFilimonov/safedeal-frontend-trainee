import React, { useEffect, useState } from 'react';
import routes from './routes';

const defaultFormState = { name: '', comment: '' };

const normalizeDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().padStart(2, '0');
  return `${day}.${month}.${year}`;
};

const Modal = ({ imageId, onClose }) => {
  const [data, setData] = useState({});
  const [formState, setFormState] = useState(defaultFormState);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(routes.imagePath(imageId));
      const newData = await response.json();
      setData(newData);
    };

    fetchImage();
  }, [imageId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(routes.commentPath(imageId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });
    setData((prev) => {
      const currentDate = Date.now();
      const newComment = {
        id: currentDate,
        date: currentDate,
        text: formState.comment,
      };
      return { ...prev, comments: [...prev.comments, newComment] };
    });
    setFormState(defaultFormState);
  };

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
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form__input"
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formState.name}
            onChange={handleChange}
          />
          <input
            className="form__input"
            type="text"
            name="comment"
            placeholder="Ваш комментарий"
            value={formState.comment}
            onChange={handleChange}
          />
          <button
            className="form__button"
            type="submit"
            disabled={formState.name === '' || formState.comment === ''}
          >
            Оставить комментарий
          </button>
        </form>
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
