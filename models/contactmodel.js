const mongoose = require("mongoose");

const { Schema } = mongoose;
const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
contactSchema.pre("save", function (next) {
  console.log(this);
  next();
});

module.exports = mongoose.model("Contact", contactSchema);
