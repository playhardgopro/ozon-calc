import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import { CalculatorKeyType } from "@/typings/constants";
import styles from "./Key.css?module";
import { CalculatorKey } from "@/typings/types";

interface Props {
  value: string;
  type: CalculatorKeyType;
  text: string;
  disabled?: boolean;
  onClick: (value: CalculatorKey) => void;
}

@Component
export default class Key extends VueComponent<Props> {
  @Prop() private value!: string;
  @Prop() private disabled!: boolean;
  @Prop() private type!: CalculatorKeyType;
  @Prop() private text!: string;

  @Emit("click")
  handleClick(): CalculatorKey {
    return { value: this.value, text: this.text, type: this.type };
  }

  render() {
    return (
      <button
        class={{
          [styles.number]: true,
          [styles.zero]: this.value === "0",
          [styles.operation]: this.type !== CalculatorKeyType.NUMBER,
          [styles.clear]: this.type === CalculatorKeyType.CLEAR,
        }}
        disabled={this.disabled}
        onClick={this.handleClick}
      >
        {this.text}
      </button>
    );
  }
}
