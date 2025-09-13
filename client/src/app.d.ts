/// <reference types="svelte" />
/// <reference types="vite/client" />

// Định nghĩa module cho .svelte file
declare module "*.svelte" {
  export { SvelteComponent as default } from "svelte";
}

// Typings cho App namespace (bạn có thể mở rộng thêm nếu cần)
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
}
