class AppConfig {
  port: string | number;
  env: string;
  static instance: AppConfig;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}

const appConfig = AppConfig.getInstance();
export { appConfig };
