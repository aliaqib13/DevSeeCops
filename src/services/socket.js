import Ws from '@adonisjs/websocket-client';

const wsUrl = new URL(process.env.REACT_APP_API_WS_URL);

let ws;
// We only connect to the websocket if the user is logged in (though it's not needed for the connection)
const token = localStorage.getItem('token');
if (token) {
    ws = Ws(wsUrl.href).connect();
}
// Export a function that will return the variable.
export default function socket() { return ws; }
