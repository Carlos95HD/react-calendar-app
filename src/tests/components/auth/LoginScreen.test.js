import React from 'react';
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';

import '@testing-library/jest-dom'
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}))

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('Pruebas en LoginScreen', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('<LoginScreen /> Debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe hacer dispatch correctamente', () => {
    wrapper.find('[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'carlos@test.com'
      }
    });

    wrapper.find('[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456'
      }
    });

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault(){}
    })

    expect( startLogin ).toHaveBeenCalledWith( 'carlos@test.com', '123456' );
  });

  test('No hay registro si las contraseñas son diferentes', () => {

    wrapper.find('[name="rEmail"]').simulate('change', {
      target: {
        name: 'rEmail',
        value: 'carlos@test.com'
      }
    });

    wrapper.find('[name="rName"]').simulate('change', {
      target: {
        name: 'rName',
        value: 'carlos'
      }
    });

    wrapper.find('[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: '1234567'
      }
    });

    wrapper.find('[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456'
      }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    })

    expect( startRegister ).not.toHaveBeenCalled();
    expect( Swal.fire ).toHaveBeenCalledWith('Error','Las contraseñas no son iguales', 'error');
  });
  
  test('Registro con constraseña iguales', () => {
    wrapper.find('[name="rEmail"]').simulate('change', {
      target: {
        name: 'rEmail',
        value: 'carlos@test.com'
      }
    });

    wrapper.find('[name="rName"]').simulate('change', {
      target: {
        name: 'rName',
        value: 'carlos'
      }
    });

    wrapper.find('[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: '123456'
      }
    });

    wrapper.find('[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456'
      }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    })

    expect( Swal.fire ).not.toHaveBeenCalled();
    expect( startRegister ).toHaveBeenCalledWith('carlos@test.com','123456','carlos');
  });
  
});
