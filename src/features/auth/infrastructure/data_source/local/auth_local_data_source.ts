import { SessionData } from "@/shared/constant/session";

export class AuthLocalDataSource {
  constructor(private localDb = new SessionData()) {}
  async login(token: string): Promise<void> {
    this.localDb.saveToken(token);
  }

  async logout(): Promise<void> {
    this.localDb.saveToken("");
  }

  get isLogin(): boolean {
    return !!this.localDb.token;
  }

  saveIsDarkMode(value: boolean): void {
    return this.localDb.saveIsDarkMode(value);
  }

  get isDarkMode(): boolean {
    return this.localDb.isDarkMode;
  }
}
