import styles from './css/checkbox.module.css';

export function CheckboxInput(
  props: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
) {
  return <input type="checkbox" className={styles.checkbox} {...props} />;
}
