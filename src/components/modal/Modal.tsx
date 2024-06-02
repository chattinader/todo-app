import { useRef, useEffect } from 'react';
import styles from './modal.module.css';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface ModalFormProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title?: string;
  children: JSX.Element;
}

const Modal = ({
  isModalOpen,
  setModalOpen,
  title,
  children,
}: ModalFormProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, setModalOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, setModalOpen]);

  return (
    <div
      className={`${styles.modalBackground} ${isModalOpen && styles.active}`}
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${isModalOpen && styles.active}`}
      >
        <div className={styles.modalHeader}>
          <h3 className="font-bold text-lg">{title}</h3>
          <IoCloseCircleOutline
            size={24}
            onClick={() => setModalOpen(false)}
            cursor="pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
