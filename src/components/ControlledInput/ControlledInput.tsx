import { VueComponent } from "@/shims-vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";

type Props = {
  value: string;
  key: string;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  onKeyup?: (e: KeyboardEvent) => void;
};

@Component
export default class ConrolledInput extends VueComponent<Props> {
  @Prop() value = "";
  currentValue = `${this.value}`;

  @Watch("value")
  onValueChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      const inputRef = this.$refs.input as HTMLInputElement;
      const validatedVal = val.replace(/[^\d+-]/g, "").replace(/[+-]/g, " $& ");
      inputRef.value = validatedVal;
      this.currentValue = validatedVal;
    }
  }
  @Emit("change")
  handleChange(e: Event) {
    return (e.target as HTMLInputElement).value;
  }
  @Emit("input")
  handleInput(e: Event) {
    e.preventDefault();
    const inputRef = this.$refs.input as HTMLInputElement;

    this.currentValue = (e.target as HTMLInputElement).value;
    inputRef.value = this.value;
    return this.currentValue;
  }
  get listeners() {
    return {
      ...this.$listeners,
      change: this.handleChange,
      input: this.handleInput,
    };
  }

  render() {
    return (
      <input
        {...this.$attrs}
        value={this.currentValue}
        ref="input"
        on={this.listeners}
      />
    );
  }
}
