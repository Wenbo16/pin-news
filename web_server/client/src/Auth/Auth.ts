class Auth {
  static authenticateUser(token: string, email: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }

  static isUserAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  static signoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static getEmail(): string | null {
    return localStorage.getItem('email');
  }
}

export default Auth;
