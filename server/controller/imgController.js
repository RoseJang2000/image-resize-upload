const imgList = [];

module.exports = {
  create: (req, res) => {
    const newData = {
      ...req.body,
      id: imgList.length + 1,
    };
    imgList.push(newData);
    return res.status(201).json(imgList);
  },

  getImage: (req, res) => {
    return res.status(200).json(imgList);
  },

  deleteImage: (req, res) => {
    const { id } = req.query;
    const findIndex = imgList.findIndex((item) => Number(item.id) === Number(id));
    if (findIndex === -1) {
      return res.status(404).send('id 틀렸다...');
    }
    const deletedData = imgList.splice(findIndex, 1);
    res.status(200).json(deletedData);
  },

  patchImage: (req, res) => {
    const { id } = req.query;
    const findIndex = imgList.findIndex((item) => Number(item.id) === Number(id));
    if (findIndex === -1) {
      return res.status(404).send('id 틀렸다...');
    }
    imgList[findIndex] = {
      id,
      ...req.body,
    };
    res.status(200).json(imgList);
  },
};
