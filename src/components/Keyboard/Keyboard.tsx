import { Component, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import Key, { Operations } from "@/components/Key/Key";

import styles from "./Keyboard.css?module";
import MyStore from "@/store/root";
import { useStore } from "vuex-simple";

interface Props {
  msg: string;
}

const keys: { value: string; type: Operations }[] = [
  { value: "7", type: Operations.NUMBER },
  { value: "8", type: Operations.NUMBER },
  { value: "9", type: Operations.NUMBER },
  { value: "C", type: Operations.CLEAR },
  { value: "4", type: Operations.NUMBER },
  { value: "5", type: Operations.NUMBER },
  { value: "6", type: Operations.NUMBER },
  { value: "-", type: Operations.MINUS },
  { value: "1", type: Operations.NUMBER },
  { value: "2", type: Operations.NUMBER },
  { value: "3", type: Operations.NUMBER },
  { value: "+", type: Operations.PLUS },
  { value: "0", type: Operations.NUMBER },
  { value: "=", type: Operations.EQUAL },
];

@Component
export default class Keyboard extends VueComponent {
  typedStore: MyStore = useStore(this.$store);
  handleClick(e: { value: string; type: Operations }) {
    if (e.type === Operations.CLEAR) this.typedStore.clear();
    if (e.type === Operations.NUMBER) this.typedStore.updateDisplay(e.value);
    if (e.type === Operations.PLUS) this.typedStore.plus(e.value);
    if (e.type === Operations.MINUS) this.typedStore.minus(e.value);
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
