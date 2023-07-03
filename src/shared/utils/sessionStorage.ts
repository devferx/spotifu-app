class SessionStorage {
  getItem(key: string) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      console.log(error);
      return new Error();
    }
  }
  setItem(key: string, value: any) {
    try {
      return window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
      return new Error();
    }
  }

  getToken() {
    return JSON.parse(this.getItem("token") as string);
  }

  setToken(accessToken: string, refreshToken: string, expiresIn: string) {
    this.setItem("token", {
      accessToken,
      refreshToken,
      expiresIn,
      date: new Date(),
    });
  }
}

const sessionStorage = new SessionStorage();

export default sessionStorage;
