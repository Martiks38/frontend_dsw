import { type ContractProcessStep } from '@/data';

import styles from './stepsList.module.css';

export default function StepsList({ steps }: { steps: ContractProcessStep[] }) {
  return (
    <div className="mb-8 flex w-full justify-center px-4 sm:my-8">
      <ol className={`${styles.steps} flex flex-col font-bold md:flex-row`}>
        {steps.map(({ step, description }) => {
          return (
            <li key={step} className={styles['step-item']}>
              <div className={styles['step-circle']}>
                <span className={styles['step-number']}>{step}</span>
              </div>
              <p className={styles['step-title']}>{description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
