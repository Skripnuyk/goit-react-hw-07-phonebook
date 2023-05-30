import { useDispatch, useSelector } from 'react-redux';
import { Button, Item, List } from './ContactList.styled';
import { useEffect } from 'react';
import { getFilteredContacts } from 'redux/selectors';
import { fetchAllContacts, fetchDeleteContact } from 'redux/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getFilteredContacts);
  
  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(fetchDeleteContact(id));
  };

    return (
      <List>
        {contacts.map(({ id, name, number }) => {
          return (
            <Item key={id}>
              {name}: {number}
              <Button type="button" onClick={() => onDeleteContact(id)}>
                Delete
              </Button>
            </Item>
          );
        })}
      </List>
    );
}