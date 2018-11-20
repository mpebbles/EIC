export default class UserTypeService {

    constructor() {
      this.getUserType = this.getUserType.bind(this);
      this.setUserType = this.setUserType.bind(this);
    }

    getUserType() {
      const userType = localStorage.getItem('eic_user_type')
      return userType;
    }

    setUserType(userType) {
      localStorage.setItem('eic_user_type', String(userType));
    }

}
