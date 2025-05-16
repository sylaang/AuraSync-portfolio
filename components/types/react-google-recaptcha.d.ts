declare module "react-google-recaptcha" {
  import * as React from "react";

  interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    ref?: React.Ref<any>;
    size?: "normal" | "compact" | "invisible";
    tabindex?: number;
    hl?: string;
    badge?: "bottomright" | "bottomleft" | "inline";
  }

  export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
    reset(): void;
    execute(): void;
  }
}
