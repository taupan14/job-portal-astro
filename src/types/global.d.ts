export {};

declare global {
  interface Window {
    __APP__?: {
      isLoggedIn: boolean;
    };
    __CONFIG__: {
      API_BASE_URL: string;
    };
    barba?: {
      go: (url: string) => void;
    };
  }
}
