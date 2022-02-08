import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import Swal from "sweetalert2";

import '@testing-library/jest-dom'
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from '../../helpers/fetch'

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

let initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas den las acciones Auth', () => {

  beforeEach(() => {
    store = mockStore(initState);
  });

  test('startLogin Correcto', async () => {
    await store.dispatch( startLogin('carlos@gmail.com', '123456'));
    const actions = store.getActions();

    // console.log( actions );
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    //Obtener token
    // token = localStorage.setItem.mock.calls[0][1];
  });

  test('Login Incorrecto', async () => {
    await store.dispatch( startLogin('carlos@gmail.com', '123456asdz'));

    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error');


    await store.dispatch( startLogin('carlos@gmail2.com', '123456'));
    actions = store.getActions();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'No existe usuario con ese email', 'error');
  });
  

  test('startRegister correcto', async () => {

    //Retorna un objeto Json
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '1234',
          name:'hernan',
          token: '123456asdzxc2'
        }
      }
    }));

    await store.dispatch( startRegister('carlos2@gmail.com', '123456asdz', 'Carl') );

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '1234',
        name:'hernan'
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', '123456asdzxc2');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('startChecking correcto', async () => {
    
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '1234',
          name:'hernan',
          token: '123456asdzxc2'
        }
      }
    }));
    
    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '1234',
        name:'hernan'
      }
    })
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '123456asdzxc2');


  });
  
  
});