import FruitsForm from '@/components/fruits-form';

import styles from './fruits.module.css';

export default function Fruits() {
  return (
    <div>
      <h1 className={styles.header}>random fruits generator</h1>
      <div className={styles.formResult}>
        <FruitsForm />
      </div>
      <div className={styles.rules}>
        <p className={styles.ruleHeader}>rules</p>
        <p className={styles.rule}>1. dreaming is not merely an act of communication (or coded communication, if you like); it is also an aesthetic activity</p>
        <p className={styles.rule}>2. space should attract space</p>
      </div>
    </div>
  );
}
