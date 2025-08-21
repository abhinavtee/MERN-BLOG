import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});



function fileFilter(req, file, cb) {
  const allowedFiles = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFiles.includes(file.mimetype)) {
    // Accept this file
    cb(null, true);
  } else {
    // Reject this file
    cb(new Error("Invalid file type only jpeg, jpg and png are allowed."), false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;