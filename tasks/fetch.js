import { AsyncStorage } from 'react-native';

export default async function({path, method, body, auth = true}) {

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = await AsyncStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;
  }

  const opts = {
    method,
    headers,
  };

  if (body) {
    opts.body = body;
  }

  const response = await fetch('https://573f7f58.ngrok.io/' + path, opts);
  return await response.json();
}