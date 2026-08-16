import { type ContractProcessStep } from '@/data';

import styles from './stepsList.module.css';

export default function StepsList({ steps }: { steps: ContractProcessStep[] }) {
  return (
    <ol className={`${styles.steps} font-bold`}>
      {steps.map(({ step, description }) => {
        return (
          <li key={step}>
            <div className={styles['step-circle']}>
              <span className={styles['step-number']}>{step}</span>
            </div>
            <p className={styles['step-title']}>{description}</p>
          </li>
        );
      })}
    </ol>
  );
}
