export default class UserTypeService {

    constructor() {
      this.getUserType = this.getUserType.bind(this);
      this.setUserType = this.setUserType.bind(this);
    }

    getUserType() {
      return localStorage.getItem('eic_user_type')
    }

    setUserType(userType) {
      localStorage.setItem('eic_user_type', String(userType));
    }

}
