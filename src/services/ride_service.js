class RideService {
  static async getInitialAuth(parameters) {
    let ride_client_id = process.env.REACT_APP_RIDE_CLIENT_ID;
    let ride_client_secret = process.env.REACT_APP_RIDE_CLIENT_SECRET;
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
    let parsed_response =  await response.json();

    localStorage.setItem('access_token', parsed_response.access_token)
    localStorage.setItem('refresh_token', parsed_response.refresh_token)

    window.location.href = '/main'
  }

  static async callRide(destination, origin) {

    let ride_request = JSON.stringify({
      "ride_type": "lyft",
      "origin": { "lat": origin.latitude, "lng": origin.longitude },
      "destination": { "lat": destination.latitude, "lng": destination.longitude },
    })

    let fetch_init = {
      method: "post",
      headers: {
        "Authorization": `Bearer ${localStorage.access_token}`,
        "Content-Type": "application/json"
      },
      body: ride_request
    }

    let response = await fetch('https://api.lyft.com/v1/rides', fetch_init)
    let parsed_response = await response.json();
    localStorage.setItem('latest_ride_id', parsed_response.ride_id)

    window.location.href = '/ride_called'
  }

  // static async cancelRide() {
  //   console.log(localStorage.latest_ride_id)
  // }
}

export default RideService;
