import { VueComponent } from "@/shims-vue";
import { Component, Prop, Watch } from "vue-property-decorator";

interface Props {
  value: string;
  readonly?: boolean;
  validate?: (value: string) => string;
  onInput?: (value: string) => void;
  onKeyup?: (e: KeyboardEvent) => void;
}

@Component
export default class ConrolledInput extends VueComponent<Props> {
  @Prop({ default: "" }) value!: Props["value"];
  @Prop({
    default() {
      return (value: string) => value;
    },
  })
  validate: Props["validate"];

  currentValue = this.value;

  @Watch("value")
  onValueChange(newVal: Props["value"], oldVal: Props["value"]) {
    if (newVal !== oldVal) {
      this.currentValue = this.validate?.(this.value) ?? this.value;
    }
  }
  @Watch("currentValue")
  onCurrentValueChange(newVal: Props["value"], oldVal: Props["value"]) {
    if (newVal !== oldVal) {
      this.currentValue =
        this.validate?.(this.currentValue) ?? this.currentValue;
      this.$emit("input", this.currentValue);
    }
  }

  // 2 watch - это не очень хорошо; 
  // сделал через геттер и .passive ('&input') модификатор - chrome стал ругаться, а firefox нет

  get listeners() {
    return {
      keyup: this.$listeners.keyup,
    };
  }

  render() {
    return (
      <input
        {...this.$attrs}
        type="text"
        v-model={this.currentValue}
        on={this.listeners}
      />
    );
  }
}
