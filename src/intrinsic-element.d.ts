import * as Lynx from "@lynx-js/types";

declare module "@lynx-js/types" {
  interface IntrinsicElements extends Lynx.IntrinsicElements {
    input: {
      bindinput?: (e: { type: "input"; detail: { value: string } }) => void;
      style: string | Lynx.CSSProperties;
      value?: string | undefined;
      placeholder?: string;
    };
    textarea: {
      bindinput?: (e: { type: "input"; detail: { value: string } }) => void;
      class?: string;
      style?: string | Lynx.CSSProperties;
      value?: string | undefined;
      maxlines?: number;
      maxlength?: number;
      placeholder?: string;
    };
  }
}