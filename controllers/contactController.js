const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactmodel");

//@desc Get all contacts
//@route Get /api/contacts
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  if (!contacts) {
    return res.status(404).json({ message: "No contacts found" });
  }
  console.log("contacts====", contacts);

  res.status(200).json({ contacts });
});
//@desc Create a new contact
//@route POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  // console.log("The request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const createdContact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json({ message: "Created Contact ", createdContact });
});

//@desc Get contact by ID
//@route GET /api/contacts/:id
const getContactById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.json({ message: `Get contact with ID  ${contact}` });
});

//@desc Update contact by ID
//@route PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString !== req.user.id) {
    res.status(401);
    throw new Error("You can only update your own contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ message: `Contact with ID ${id} updated`, updatedContact });
});

//@desc Delete contact by ID
//@route DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString !== req.user.id) {
    res.status(401);
    throw new Error("You can only update your own contact");
  }
  await Contact.findOneAndDelete(id);
  res.json({ message: `Contact with ID ${id} deleted` });
});
module.exports = {
  getContact,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
