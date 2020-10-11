import { Component, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import { Keyboard, Display } from "@/components";
import styles from "./Calculator.css?module";

interface Props {
  msg: string;
}

@Component
export default class Calculator extends VueComponent {
  // @Prop()
  // private msg!: string;

  render() {
    return (
      <div class={styles.calculator}>
        <Display />
        {/* <div class={styles.display}>1+1+1</div> */}
        <Keyboard />
      </div>
    );
  }
}
