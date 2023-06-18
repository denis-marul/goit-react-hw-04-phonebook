import  { useState } from "react";
import css from './Form.module.css';
import PropTypes from 'prop-types';

export const Form = ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = event => {
        
        const { name, value } = event.currentTarget
        switch (name) {
            case 'name':
                setName(value)
                break;
            case 'number':
                setNumber(value)
                break;
            default:
                break;
        }
      
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(name, number)
        setName('');
        setNumber('');
        console.log(name, number);
    };
  
    
       
    return <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>Name</label>
        <input
            className={css.formInput}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
        />
        <label className={css.label}>Number</label>
        <input
            className={css.formInput}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
        />
        <button className={css.submitBtn} type="submit">Add contact</button>
    </form>
    
};

Form.protoTypes = {
    onSubmit: PropTypes.func.isRequired,
}