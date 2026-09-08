const express = require("express");
const multer = require("multer");
const app = express();

const upload = multer({
  dest: "uploads/"
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("PromoAI Video Server چل رہا ہے!");
});

app.post(
  "/api/generate",
  upload.array("images", 5),
  async (req, res) => {
    try {
      const images = req.files;

      if (!images || images.length < 2) {
        return res.status(400).json({
          error: "کم از کم 2 تصاویر اپ لوڈ کریں"
        });
      }

      res.json({
        success: true,
        message: "تصاویر کامیابی سے server تک پہنچ گئیں!",
        images: images.length
      });

    } catch (error) {
      res.status(500).json({
        error: "Server error"
      });
    }
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PromoAI Server چل رہا ہے: ${PORT}`);
});
