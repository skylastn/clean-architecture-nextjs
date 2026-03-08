type PlainObject = Record<string, unknown>;

export class FormatHelper {
  static readonly SENSITIVE_KEYS = new Set([
    "password",
    // "refreshToken",
    // "accessToken",
    // "token",
  ]);

  static isPresent<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  static isPlainObject(value: unknown): value is PlainObject {
    return Object.prototype.toString.call(value) === "[object Object]";
  }

  static hasToMapProperty(value: unknown): value is { toMap: unknown } {
    return typeof value === "object" && value !== null && "toMap" in value;
  }
  static isNotEmpty(value: unknown): boolean {
    if (typeof value === "string") return value.trim().length > 0;
    if (typeof value === "number") return !Number.isNaN(value);
    if (typeof value === "boolean") return true;

    if (value instanceof Date) return !Number.isNaN(value.getTime());
    if (Array.isArray(value)) return value.length > 0;
    if (value instanceof Map || value instanceof Set) return value.size > 0;

    if (!this.isPresent(value)) return false;

    if (typeof value === "object" && value !== null) {
      return Object.keys(value).length > 0;
    }

    return true;
  }

  static serializeItem(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;

    if (this.hasToMapProperty(item)) {
      const v = item.toMap;

      if (typeof v === "function") {
        const mapped = v.call(item);
        return this.stripSensitive(mapped);
      }

      if (typeof v === "object" && v !== null) {
        return this.stripSensitive(v);
      }
    }

    return this.stripSensitive(this.toSnakeCaseObject(item));
  }

  static serializeData(data: unknown): unknown {
    if (Array.isArray(data)) {
      return data.map((item) => this.serializeItem(item));
    }
    return this.serializeItem(data);
  }

  static toSnake = (s: string): string =>
    s.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);

  static toSnakeCaseObject = (obj: unknown): unknown => {
    if (Array.isArray(obj)) return obj.map(FormatHelper.toSnakeCaseObject);
    if (!obj || typeof obj !== "object") return obj;
    if (obj instanceof Date) return obj;
    if (!FormatHelper.isPlainObject(obj)) return obj;

    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        FormatHelper.toSnake(k),
        FormatHelper.toSnakeCaseObject(v),
      ]),
    );
  };

  static stripSensitive = (obj: unknown): unknown => {
    if (Array.isArray(obj)) return obj.map(FormatHelper.stripSensitive);
    if (!obj || typeof obj !== "object") return obj;
    if (obj instanceof Date) return obj;
    if (!FormatHelper.isPlainObject(obj)) return obj;

    const entries = Object.entries(obj).filter(
      ([k]) => !FormatHelper.SENSITIVE_KEYS.has(k),
    );

    return Object.fromEntries(
      entries.map(([k, v]) => [k, FormatHelper.stripSensitive(v)]),
    );
  };

  static pad(n: number): string {
    return String(n).padStart(2, "0");
  }

  static formatDate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = this.pad(d.getMonth() + 1);
    const dd = this.pad(d.getDate());
    const hh = this.pad(d.getHours());
    const mi = this.pad(d.getMinutes());
    const ss = this.pad(d.getSeconds());
    return `${dd}${mm}${yyyy}-${hh}${mi}${ss}`;
  }

  static sanitizeBaseName(name: string): string {
    return name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_-]/g, "");
  }

  static isPhoneNoLeadingZero(value: string): boolean {
    return /^(\+62|62)8[1-9][0-9]{6,11}$/.test(value);
  }
}
