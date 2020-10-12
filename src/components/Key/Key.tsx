import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import { KeyType } from "@/typings/constants";
import styles from "./Key.css?module";

interface Props {
  value: string;
  type: KeyType;
  onClick: (e: { value: string; type: KeyType }) => void;
}

@Component
export default class Key extends VueComponent<Props> {
  @Prop() private value!: string;

  @Prop() private type!: KeyType;

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
          [styles.operation]: this.type !== KeyType.NUMBER,
          [styles.clear]: this.type === KeyType.CLEAR,
        }}
        onClick={this.handleClick}
      >
        {this.value}
      </button>
    );
  }
}
