import { fetchConToken } from "../../helpers/fetch";

describe('Pruebas en el helper Fetch', () => {

  let token;

  test('fetchSinToken debe funcionar', async () => {
    const resp = await fetchConToken('auth', { email:'carlos@gmail.com', password: '123456'}, 'POST');

    expect( resp instanceof Response ).toBe(true);

    const body = await resp.json();
    expect( body.ok ).toBe(true);

    token = body.token;
  });

  test('fetchConToken debe funcionar', async () => {
    localStorage.setItem('token', token);

    const resp = await fetchConToken('events/61fcc1fe94cb75dbbbe2fb11', {}, 'DELETE')
    const body = await resp.json();

    expect( body.msg ).toEqual('Evento no existe con ese id');
  });
  


});
