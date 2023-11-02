const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const bufer = await fs.readFile(contactsPath);
  return JSON.parse(bufer);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const result = await contactsList.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const result = await contactsList.find((contact) => contact.id === contactId);
  const resultIndex = await contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (resultIndex === -1) {
    return null;
  }
  contactsList.splice(resultIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
