
export class SessionData {
  private setItem(key: string, value: string) {
    if (typeof window === "undefined") return; // SSR guard
    localStorage.setItem(key, value);
  }

  private getItem(key: string) {
    if (typeof window === "undefined") return null; // SSR guard
    return localStorage.getItem(key);
  }

  saveToken(token: string) {
    this.setItem("access_token", token);
  }

  get token() {
    return this.getItem("access_token");
  }
}
