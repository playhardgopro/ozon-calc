import { Component, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

// import Keyboard from "@/components/Keyboard/Keyboard";
import styles from "./Display.css?module";
import MyStore from "@/store/root";
import { useStore } from "vuex-simple";

@Component
export default class Display extends VueComponent<Props> {
  typedStore: MyStore = useStore(this.$store);
  // inputValue: string = this.typedStore.buffer;

  get buffer() {
    return this.typedStore.buffer.replace(/[+-]/g, " $& ");
  }
  get result() {
    return this.typedStore.result;
  }
  handleInput(event) {
    const validatedValue = event.target.value.replace(/[^-\d+]/gi, "");
    if (event.data?.match(/[\d\+\-]/gi) !== null) {
      // console.log(event);
      this.typedStore.setBuffer(validatedValue);
    }

    // this.inputValue = event.target.value;
  }
  handleEnter(event) {
    if (event.keyCode === 13) {
      this.typedStore.equal();
    }
  }
  render() {
    return (
      <div class={styles.display}>
        <input
          type="text"
          class={styles.bufferInput}
          value={this.buffer}
          onInput={this.handleInput}
          onKeyup={this.handleEnter}
        />
        {this.result === null ? null : (
          <span class={styles.result}>{this.result}</span>
        )}
      </div>
    );
  }
}
