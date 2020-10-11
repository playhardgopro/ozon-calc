import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import styles from "./Key.css?module";

export enum Operations {
  CLEAR = "C",
  MINUS = "-",
  PLUS = "+",
  EQUAL = "=",
  NUMBER = "num",
}

interface Props {
  value: string;
  type: Operations;
  onClick: (e: { value: string; type: Operations }) => void;
}

@Component
export default class Key extends VueComponent<Props> {
  @Prop() private value!: string;

  @Prop() private type!: Operations;

  @Emit("click")
  handleClick() {
    return { value: this.value, type: this.type };
  }

  render() {
    return (
      <button
        class={{
          [styles.number]: true,
          [styles.zero]: this.value === "0",
          [styles.operation]: this.type !== Operations.NUMBER,
          [styles.clear]: this.type === Operations.CLEAR,
        }}
        onClick={this.handleClick}
      >
        {this.value}
      </button>
    );
  }
}
