
import { useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import Contact from '../Contact/Contact';
import s from './ContactList.module.css';

import { selectIsError, selectIsLoading } from '../../redux/contacts/selectors';
import { selectFilteredContacts } from '../../redux/filters/selectors';

const ContactList = () => {

    const contacts = useSelector(selectFilteredContacts);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);

    return (
        <div>
            {isLoading && !isError && <div className={s.loader}>
                <ThreeCircles
                    visible={true}
                    height="50"
                    width="50"
                    color="#CD00CD"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}
                    }
                    wrapperClass=""
                />
            </div>}
            {!isLoading && isError && <h2>Oops... The action cannot be performed...</h2>}
            <ul className={s.list}>
                {contacts.length ? (contacts.map(({ id, name, number }) => (
                    <Contact
                        key={id}
                        id={id}
                        name={name}
                        number={number}

                    />
                ))) : (
                    <h1>No data received!</h1>
                )}
            </ul>
        </div>
    );
};

export default ContactList;