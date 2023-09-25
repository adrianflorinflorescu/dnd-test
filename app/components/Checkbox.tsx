import { useEffect, useRef } from "react";

type CheckboxProps = {
  state: 'checked' | 'unchecked' | 'indeterminate';
  onChange?: (state: 'checked' | 'unchecked') => void;
};

function Checkbox(props: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = props.state === 'indeterminate';
    }
  }, [props.state]);

  return <input ref={ref} type="checkbox" checked={props.state === 'checked'} onChange={e => props.onChange(e.target.checked ? 'checked' : 'unchecked')} />;
}

export default Checkbox;