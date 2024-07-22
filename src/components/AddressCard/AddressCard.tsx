import { Address } from '@/src/database-types';
import styles from './addressCard.module.scss';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useState } from 'react';
import AddressModal from '../AddressModal/AddressModal';
import Modal from '../Modal/Modal';

export default function AddressCard({
  address,
  updateAddress,
  deleteAddress,
  editable,
}: {
  address: Address;
  updateAddress?: (data: Address) => void;
  deleteAddress?: (id: number) => void;
  editable?: boolean;
}) {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const modalHandler = () => {
    setModal(true);
  };
  const deleteModalHandler = () => {
    setDeleteModal(true);
  };

  const deleteHandler = () => {
    deleteAddress && deleteAddress(address.id);
  };

  const updateHandler = (data: Address) => {
    updateAddress && updateAddress(data);
    setModal(false);
  };

  return (
    <div className={styles.addressCard}>
      <div className={styles.addressHeader}>
        <h2 className={styles.addressName}>{address.address_name}</h2>
        <p className={styles.userName}>
          {address.name} {address.surname}
        </p>
      </div>
      <div className={styles.addressDetails}>
        <p>{address.address_line1}</p>
        {address.address_line2 && <p>{address.address_line2}</p>}
        <p>
          {address.city}, {address.state} {address.postal_code}
        </p>
        <p>{address.country}</p>
      </div>
      {editable && (
        <div className={styles.icons}>
          <MdEdit className={styles.edit} onClick={modalHandler} />
          <MdDelete className={styles.delete} onClick={deleteModalHandler} />
        </div>
      )}
      {modal && (
        <AddressModal
          onSubmitAddress={updateHandler}
          address={address}
          onClose={() => setModal(false)}
        />
      )}
      {deleteModal && (
        <Modal
          text={`Are you sure you want to delete the address "${address.address_name}"?`}
          rejectBtnTxt="Cancel"
          approveBtnTxt="Delete"
          onSubmit={deleteHandler}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
}
