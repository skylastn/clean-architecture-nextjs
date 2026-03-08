export class SessionData {
  private setItem(key: string, value: string) {
    if (typeof window === "undefined") return; // SSR guard
    localStorage.setItem(key, value);
  }

  private getItem(key: string) {
    if (typeof window === "undefined") return null; // SSR guard
    return localStorage.getItem(key);
  }

  saveToken(token: string): void {
    this.setItem("access_token", token);
  }

  get token(): string | null {
    return this.getItem("access_token");
  }

  saveIsDarkMode(value: boolean): void {
    this.setItem("is_dark_mode", value.toString());
  }

  get isDarkMode(): boolean {
    const temp = this.getItem("is_dark_mode");
    return temp == "false" ? false : true;
  }
}
