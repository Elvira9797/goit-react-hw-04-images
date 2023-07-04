import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import {
  StyledSearchbar,
  StyledForm,
  Input,
  SearchFormButton,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    if (values.namePicture.trim() === '') {
      toast.info('Enter the name of the picture.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    onSubmit(values.namePicture);
    actions.resetForm();
  };

  return (
    <StyledSearchbar>
      <Formik initialValues={{ namePicture: '' }} onSubmit={handleSubmit}>
        <StyledForm>
          <SearchFormButton type="submit">
            <SearchIcon />
          </SearchFormButton>

          <Field
            name="namePicture"
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            autoFocus
            as={Input}
          />
        </StyledForm>
      </Formik>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
