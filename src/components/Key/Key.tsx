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
  @Prop() private value!: Props["value"];
  @Prop() private disabled!: Props["disabled"];
  @Prop() private type!: Props["type"];
  @Prop() private text!: Props["text"];

  @Emit("click")
  handleClick(): CalculatorKey {
    return { value: this.value, text: this.text, type: this.type };
  }
  get listeners() {
    return { ...this.$listeners, click: this.handleClick };
  }

  render() {
    return (
      <button
        class={[
          styles.number,
          {
            [styles.zero]: this.value === "0",
            [styles.operation]: this.type !== CalculatorKeyType.NUMBER,
            [styles.clear]: this.type === CalculatorKeyType.CLEAR,
          },
        ]}
        disabled={this.disabled}
        on={this.listeners}
      >
        {this.text}
      </button>
    );
  }
}
