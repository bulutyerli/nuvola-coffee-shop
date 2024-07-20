import CustomButton from '../CustomButton/CustomButton';
import styles from './modal.module.scss';

export default function Modal({
  text,
  rejectBtnTxt,
  approveBtnTxt,
  onClose,
  onSubmit,
}: {
  text: string;
  onClose: () => void;
  onSubmit: () => void;
  rejectBtnTxt: string;
  approveBtnTxt: string;
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.text}>{text}</h2>
        <div className={styles.buttonContainer}>
          <CustomButton
            type="button"
            text={rejectBtnTxt}
            color="red"
            className={styles.button}
            onClick={onClose}
          ></CustomButton>
          <CustomButton
            type="button"
            color="primary"
            text={approveBtnTxt}
            className={styles.button}
            onClick={onSubmit}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
}
