export {};

declare global {
  interface Window {
    __APP__?: {
      isLoggedIn: boolean;
    };
    barba?: {
      go: (url: string) => void;
    };
  }
}
