import React, { Component } from "react";
import css from './App.module.css';
import { nanoid } from 'nanoid'
import { Section } from 'components/Section/Section';
import { Form } from 'components/Form/Form';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';

export class App extends Component{
  state = {
    contacts: [ ],
    filter: '',
  };
  
  formSubmitHandler = ({name, number}) => { 
      const isExsist = this.state.contacts.find(
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
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value })
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  }

  componentDidUpdate(prevState) {
    console.log("update");
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts})
    }
    
  }
  
  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visiableContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return <div className={css.container}>
      <Section title={'Phonebook'}>
        <Form onSubmit={this.formSubmitHandler}/>
      </Section>
      <Section title={'Contacts'}>
        <Filter vlaue={filter} onChange={this.onChangeFilter} />
     <ContactsList 
          contacts={visiableContacts}
          onDeleteContact = {this.deleteContact}
        />
      </Section>
    </div>
  }
};

