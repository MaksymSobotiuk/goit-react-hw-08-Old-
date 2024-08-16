import { useDispatch } from 'react-redux';
import s from './Contact.module.css';
import { deleteContact } from '../../redux/contacts/operations';
import { RiDeleteBin5Fill } from "react-icons/ri";

import toast, { Toaster } from 'react-hot-toast';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';




const Contact = ({ id, name, number }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);

    const notify = () => toast('The contact has been deleted!');
    const handleDelete = () => {
        dispatch(deleteContact(id))
            .then(() => {
                notify();
            })
            .catch((error) => {
                toast.error('Failed to delete contact.');
            });
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <li className={s.item}>
                <p>{name}</p>
                <p>{number}</p>
                <div className={s.buttons}>
                    <button className={s.pen}><FaPencil className={s.icon} size="24" /></button>
                    <button onClick={openModal}><RiDeleteBin5Fill className={s.icon} size="24" /></button>
                </div>
            </li>
            <Toaster />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default Contact;

