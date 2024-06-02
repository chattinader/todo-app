import styles from './input.module.css';

interface InputProps {
  type: string;
  value: string;
  placeholder: string;
  action: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, value, placeholder, action }: InputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={action}
    />
  );
};

export default Input;
