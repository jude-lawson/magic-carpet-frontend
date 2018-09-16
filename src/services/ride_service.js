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
                    .catch((err) => { console.error(err) })
    return await response.json();
  }

  static async callRide(destination, origin) {
    console.log(`Ride is being called to ${origin.latitude} / ${origin.longitude}`)

    let ride_request = JSON.stringify({
      "ride_type": "lyft",
      "origin": { "lat": origin.latitude, "long": origin.longitude },
      "destination": { "lat": destination.latitude, "long": destination.longitude },
    })

    let fetch_init = {
      method: "post",
      headers: {
        "Authorization": `Bearer ${localStorage.access_token}`,
        "Content-Type": "application/json"
      },
      body: ride_request
    }

    try {
      var response = await fetch('https://api.lyft.com/v1/rides', fetch_init)
    } catch(err) {
      let error = err
      debugger
    }
    let parsed_response = response.json();
    window.location.href = '/ride_called'
    localStorage.setItem('latest_ride_id', parsed_response.ride_id)
  }

  static async cancelRide() {
    console.log(localStorage.latest_ride_id)
  }
}

export default RideService;
