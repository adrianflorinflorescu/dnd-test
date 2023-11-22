import React, { InputHTMLAttributes } from "react";

import "./styles.css";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "checked" | "defaultValue"
> & {
  state?: "checked" | "unchecked" | "indeterminate";
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    function setRef(checkbox: HTMLInputElement | null) {
      if (checkbox) {
        checkbox.indeterminate = props.state === "indeterminate";
      }

      if (typeof ref === "function") {
        ref(checkbox);
      } else if (ref) {
        ref.current = checkbox;
      }
    }

    function getStateObject() {
      if (
        typeof props.defaultChecked !== "undefined" &&
        typeof props.state !== "undefined"
      ) {
        console.warn(
          "ForwardedCheckbox: defaultChecked and state are mutually exclusive"
        );
      }

      if (typeof props.defaultChecked !== "undefined") {
        return {
          defaultChecked: props.defaultChecked,
        };
      }

      if (typeof props.state !== "undefined") {
        if (typeof props.onChange !== "function") {
          console.warn(
            "ForwardedCheckbox: onChange is required when using state"
          );
        }

        return {
          checked: props.state === "checked",
        };
      }
    }

    return (
      <>
        <input
          ref={setRef}
          {...props}
          type="checkbox"
          className={`forwarded-checkbox ${props.className || ""}`}
          {...getStateObject()}
        />
      </>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
