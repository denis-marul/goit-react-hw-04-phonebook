import { useEffect, useState } from "react";
import css from './App.module.css';
import { nanoid } from 'nanoid'
import { Section } from 'components/Section/Section';
import { Form } from 'components/Form/Form';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';

export const App = () => {

  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(parsedContacts)
  const [filter, setFilter] = useState('')
 
 useEffect(() => {
   localStorage.setItem('contacts', JSON.stringify(contacts))
   
  }, [contacts]);

 
  const formSubmitHandler = (name, number) => { 
   
      const isExsist = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    if (isExsist) {
      return alert(isExsist.name + ' is already in contacts.'); 
    };
    const contact = {
      id: nanoid(5),
      name: name,
      number: number,
   };  
   
   setContacts(prevState =>  [contact, ...prevState ])
  };

  const onChangeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value)
  };

  const deleteContact = contactId => {
   setContacts(contacts.filter(contact => contact.id !== contactId),)
  }
    const normalizedFilter = filter.toLowerCase();
    const visiableContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return <div className={css.container}>
      <Section title={'Phonebook'}>
        <Form onSubmit={formSubmitHandler}/>
      </Section>
      <Section title={'Contacts'}>
        <Filter vlaue={filter}
        onChange={onChangeFilter} 
        />
     <ContactsList 
          contacts={visiableContacts}
          onDeleteContact = {deleteContact}
        />
      </Section>
    </div>
  
};

