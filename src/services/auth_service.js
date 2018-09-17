export default class AuthService {
  static verifyAuth() {
    if (localStorage.getItem('access_token')) {

    } else {
      AuthService.authenticateThroughRideService()
    }
  }
}


