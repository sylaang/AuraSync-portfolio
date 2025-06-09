declare module "react-google-recaptcha" {
  import { Component, Ref } from "react";

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    ref?: Ref<ReCAPTCHA>;
    size?: "normal" | "compact" | "invisible";
    tabindex?: number;
    hl?: string;
    badge?: "bottomright" | "bottomleft" | "inline";
    theme?: "light" | "dark";
    className?: string;
    style?: React.CSSProperties;
  }

  declare class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset: () => void;
    execute: () => void;
    getValue: () => string | null;
  }

  export default ReCAPTCHA;
}