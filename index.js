import { Command } from "commander";
const program = new Command();

import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>")
    .allowUnknownOption(true);

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            console.table(contacts);
            break;
        
        case "get":
            const contactById = await getContactById(id);
            console.log(contactById);
            break;
        
        case "add":
            const newContact = await addContact(name, email, phone);
            console.log(newContact);
            break;
        
        case "remove":
            const deletedContact = await removeContact(id);
            console.log(deletedContact);
            break;
        
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
};

invokeAction(argv);