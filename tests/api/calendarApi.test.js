import calendarApi from '../../src/api/calendarApi';


describe('Testing on calendarApi', () => {

    test('should have default config', () => {

        // console.log(calendarApi);
        // console.log(process.env);
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );

    });

    test('should have x-token inside header request', async() => {

        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', token);
        const res = await calendarApi.get('/auth');
        
        // console.log(res.config.headers['x-token']);

        expect( res.config.headers['x-token'] ).toBe( token );

    });

});