import React from 'react';
import { Form, Message ,Button} from 'semantic-ui-react';
import { authAxios, addressCreateURL, addressUpdateURL } from './Utils';
import { Link, useNavigate } from 'react-router-dom';

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

class AddressForm extends React.Component {
  static defaultProps = {
    address: {
      address_type: "",
      house_address: "",
      country: "",
      default: false,
      id: "",
      street_address: "",
      user: 1,
      zip: ""
    }
  };

  state = {
    error: null,
    formData: this.props.address,
    saving: false,
    success: false
  };
  componentDidUpdate(prevProps) {
    if (this.props.address !== prevProps.address) {
      this.setState({ formData: this.props.address });
    }
  }
  handleToggleDefault = () => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        default: !prevState.formData.default
      }
    }));
  };
 
  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ saving: true });

    const { formType } = this.props;
    if (formType === UPDATE_FORM) {
      this.handleUpdateAddress();
    } else {
      this.handleCreateAddress();
    }
  };

  handleCreateAddress = () => {
    const { userID, activeItem } = this.props;
    const { formData } = this.state;
    console.log('hello');
    authAxios
      .post(addressCreateURL, {
        ...formData,
        user: userID,
        address_type: activeItem === "billingAddress" ? "B" : "S"
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
          formData: { default: false }
        });
        this.props.callback();
        this.navigateToAddresses();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
  isFormValid = () => {
    const { formData } = this.state;
    // Check if all required fields have a value
    return (
      formData.street_address.trim() !== '' &&
      formData.house_address.trim() !== '' &&
      formData.country.trim() !== '' &&
      formData.zip.trim() !== ''
    );
  };

  handleUpdateAddress = () => {
    const { userID, activeItem } = this.props;
    const { formData } = this.state;
    authAxios
      .put(addressUpdateURL(formData.id), {
        ...formData,
        user: userID,
        address_type: activeItem === "billingAddress" ? "B" : "S"
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
          formData: { default: false }
        });
        this.props.callback();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
  navigateToAddresses = () => {
    const navigate = useNavigate();
    navigate('/profile/adresses'); // Navigate to addresses page
  };

  render() {
    const { formData, success, error, saving, formType } = this.state;

    return (
      <div className='form-address' >
        <div>
        <h4>Enter Your Address</h4></div>
      <Form onSubmit={this.handleSubmit} success={success} error={error} className='form-input-add mt-5'>

        <Form.Input
          required
          name="street_address"
          placeholder="Street address"
          onChange={this.handleChange}
          value={formData.street_address}
        />
        <Form.Input
          required
          name="house_address"
          placeholder="Apartment address"
          onChange={this.handleChange}
          value={formData.house_address}
        />
        <Form.Input
          required
          name="country"
          placeholder="Country"
          onChange={this.handleChange}
          value={formData.country}
        />
        <Form.Input
          required
          name="zip"
          placeholder="Zip code"
          onChange={this.handleChange}
          value={formData.zip}
        />
        <Form.Checkbox
          name="default"
          label="Make this the default address?"
          onChange={this.handleToggleDefault}
          checked={formData.default}
        />
        {success ? (
          <Message success header="Success!" content="Your address was saved" />
        ) : error ? (
          <Message
            error
            header="There was an error"
            content={JSON.stringify(error)}
          />
        ) : null}
        <Link to="/profile/adresses">
        <Button disabled={saving || !this.isFormValid()} loading={saving} className='button-action-green'>
        {formType === CREATE_FORM ? 'Save' : 'Update'}
        </Button></Link>
      </Form>
      </div>
    );
  }
}

export default AddressForm;
