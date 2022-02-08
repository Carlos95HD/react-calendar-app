import React from 'react';
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';

import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
  eventStartDelete: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe('Pruebas en <DeleteEventFab>', () => {

  test('Debe mostarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Debe llamar el eventStartDelete al hacer click', () => {
    
    wrapper.find('button').simulate('click');

    expect(eventStartDelete).toHaveBeenCalled();
  });
  
});
