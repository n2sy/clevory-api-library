exports.addAvatar = (req, res) => {
  res.status(201).json({
    message: "Image successfully uploaded",
    filename: req.file.filename,
  });
};
