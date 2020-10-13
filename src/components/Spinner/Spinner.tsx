import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import styles from "./Spinner.css?module";

interface Props {
  size: number;
}

@Component
export default class Spinner extends VueComponent<Props> {
  @Prop({ default: 32 }) size!: number;

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width={`${this.size}px`}
        height={`${this.size}px`}
        class={styles.spinner}
        viewBox="0 0 128 128"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
        <g>
          <path
            d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
            fill="#b15e5e"
            fill-opacity="1"
          />
          {[45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
              d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z"
              fill="#d8d8d8"
              fill-opacity="0.25"
              transform={`rotate(${angle} 64 64)`}
            />
          ))}
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64"
            calcMode="discrete"
            dur="800ms"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg>
    );
  }
}
