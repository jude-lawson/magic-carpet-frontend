import { ride_client_id, ride_client_secret } from '../config';

class RideService {
  static async getInitialAuth(parameters) {
    let encoded_client_auth = btoa(`${ride_client_id}:${ride_client_secret}`);

    let fetch_init = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encoded_client_auth}`
      },
      body: JSON.stringify({
        "grant_type": "authorization_code",
        "code": parameters.code
      })
    }

    let response = await fetch('https://api.lyft.com/oauth/token', fetch_init)
                    .catch((err) => { console.error(err) })
    return await response.json();
  }
}

export default RideService;
