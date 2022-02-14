const routes = {
  imagesPath: () => 'https://boiling-refuge-66454.herokuapp.com/images',
  imagePath: (imageId) => `https://boiling-refuge-66454.herokuapp.com/images/${imageId}`,
  commentPath: (imageId) => `https://boiling-refuge-66454.herokuapp.com/images/${imageId}/comments`,
};

export default routes;
