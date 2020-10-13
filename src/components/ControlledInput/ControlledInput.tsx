import { VueComponent } from "@/shims-vue";
import { Component, Prop, Emit } from "vue-property-decorator";

type Props = {
  value: string;
  key: string;
  readonly?: boolean;
  validate?: (value: string) => string;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  onKeyup?: (e: KeyboardEvent) => void;
};

@Component
export default class ConrolledInput extends VueComponent<Props> {
  @Prop({ default: "" }) value!: string;
  @Prop({
    default() {
      return (value: string) => value;
    },
  })
  validate!: (value: string) => string;

  get computedValue() {
    return this.validate(this.value);
  }

  @Emit("change")
  handleChange(e: Event) {
    return (e.target as HTMLInputElement).value;
  }
  @Emit("input")
  handleInput(e: InputEvent) {
    return (e.target as HTMLInputElement).value;
  }

  get listeners() {
    return {
      ...this.$listeners,
      change: this.handleChange,
      // & === .passive модификатор
      "&input": this.handleInput,
    };
  }

  render() {
    return (
      <input {...this.$attrs} value={this.computedValue} on={this.listeners} />
    );
  }
}
