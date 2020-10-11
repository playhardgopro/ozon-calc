import { Component, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import Key, { Operations } from "@/components/Key/Key";

import styles from "./Keyboard.css?module";
import MyStore from "@/store/root";
import { useStore } from "vuex-simple";

interface Props {
  msg: string;
}

const keys: { value: string; type: "number" | Operations }[] = [
  { value: "7", type: "number" },
  { value: "8", type: "number" },
  { value: "9", type: "number" },
  { value: "C", type: Operations.CLEAR },
  { value: "4", type: "number" },
  { value: "5", type: "number" },
  { value: "6", type: "number" },
  { value: "-", type: Operations.MINUS },
  { value: "1", type: "number" },
  { value: "2", type: "number" },
  { value: "3", type: "number" },
  { value: "+", type: Operations.PLUS },
  { value: "0", type: "number" },
  { value: "=", type: Operations.EQUAL },
];

@Component
export default class Keyboard extends VueComponent {
  typedStore: MyStore = useStore(this.$store);
  handleClick(e: { value: string; type: "number" | Operations }) {
    if (e.type === Operations.CLEAR) this.typedStore.clear();
    if (
      e.type === "number" ||
      e.type === Operations.MINUS ||
      e.type === Operations.PLUS
    )
      this.typedStore.updateDisplay(e.value);
    if (e.type === Operations.EQUAL) this.typedStore.equal();
  }

  render() {
    return (
      <div class={styles.Keyboard}>
        {keys.map((key) => {
          return (
            <Key value={key.value} type={key.type} onClick={this.handleClick} />
          );
        })}
      </div>
    );
  }
}
