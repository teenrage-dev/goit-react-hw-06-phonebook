import { combineReducers } from 'redux';

import contactsReducer from './contacts/contacts-reudcer';
import filterReducer from './filter/filter-reducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export default rootReducer;
