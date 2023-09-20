const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.toLocaleLowerCase().split(" ").join("-") +
        Date.now() +
        file.originalname
    );
  },
});
exports.uploadFiles = () => {
  return multer({ storage });
};
