import css from './Phonebook.module.css';
import React from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import {
  addContact,
  removeContact,
} from '../../redux/contacts/contacts-actions';
import { setFilter } from '../../redux/filter/filter-actions';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Phonebook = () => {
  const contacts = useSelector(store => store.contacts);
  const filter = useSelector(store => store.filter);
  const dispatch = useDispatch();

  // submit and add to local storage
  const handleSubmit = newContact => {
    // console.log(newContact);
    const { name, number } = newContact;

    const contact = contacts?.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contact) {
      showMessage(`Contact ${name} already exists`);
      return;
    }
    const action = addContact(newContact);
    dispatch(action);
    const newContacts = [...contacts, { name, number, id: nanoid() }];
    return newContacts;
  };

  // change filter by name
  const handleChangeFilterByName = event => {
    const { value } = event.target;
    const action = setFilter(value);
    dispatch(action);
  };

  // get filtered contacts
  const getFIlteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // delete contact
  const onDeleteContact = payload => {
    dispatch(removeContact(payload));
  };

  // show message(error)
  function showMessage(message) {
    Notify.warning(message);
  }

  const renderList = getFIlteredContacts();

  return (
    <div className={css.phonebook_box}>
      <h2>Phonebook</h2>
      <ContactForm handleSubmit={handleSubmit} showMessage={showMessage} />
      <div className={css.phonebook__contacts}>
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          handleChangeFilterByName={handleChangeFilterByName}
        />
        <ContactList
          renderList={renderList}
          onDeleteContact={onDeleteContact}
        />
      </div>
    </div>
  );
};
