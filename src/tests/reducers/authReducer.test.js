import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
  checking: false
}

describe('Pruebas en authREducer ', () => {

  test('Debe retornar authLogin correctamente', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: '123as',
        name: 'Carlos'
      }
    };

    const state = authReducer(initialState, action);
    expect( state ).toEqual({
      checking: false,
      uid: '123as',
      name: 'Carlos'
    })
  })

  test('Debe retornar el estado por defecto', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual({
      checking: false
    });

  });

  test('Debe retornar el logout correctamente', () => {
    const action = () => ({ type: types.authLogout })
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      checking: false
    })
  });

  test('Debe retornar authCheckingFinish correctamente', () => {
    const action = () => ({ type: types.authCheckingFinish })
    const state = authReducer(initialState, action);

    expect( state ).toEqual({checking: false})
  });

});
