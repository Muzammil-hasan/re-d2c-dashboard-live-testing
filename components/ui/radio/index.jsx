import styles from "./radio.module.scss"

const Radio = ({ label, handleRadio, name, disabled, value, ischecked }) => (
  <div className={styles.radioGroupRoot}>
    <div className="d-flex flex-row align-items-center">
      <input
        type="radio"
        value={value}
        name={name}
        disabled={disabled}
        onChange={handleRadio}
        checked={ischecked}
      />
      <label className={styles.label} htmlFor="r1">
        {label}
      </label>
    </div>
  </div>
)

export default Radio
