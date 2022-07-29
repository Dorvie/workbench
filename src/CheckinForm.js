import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from '@mui/material';
import './CheckinForm.css';


function CheckinForm({ myProvider }) {
  const urlParams = new URLSearchParams(window.location.search);
  const cust = urlParams.get('c');

  const [formState, setFormState] = useState({
    customerEmail: cust,
    provider: myProvider,
    service: '',
    isCompleted: true,
    notes: '',
    date: new Date(),
    photoFile: undefined,
  });

  const handleFileChange = (e) => {
    const photoFile = e.target.files[0];
    const files = Array.from(e.target.files);
    console.log(`received files: ${files}`);

    setFormState({ ...formState, photoFile });
    console.log(`stored first file: ${photoFile}`);
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    console.log('submitting form...');
    const {
      customerEmail, provider, service, isCompleted, notes, date, photoFile,
    } = formState;

    console.log("make API call here to store data");
    alert('submit that data!');
  };

  return (
    <form onSubmit={handleContactFormSubmit}>
      <TextField
        id="email"
        label="Customer Email"
        variant="outlined"
        placeholder="Customer Email"
        defaultValue={formState.customerEmail}
        onChange={(e) => setFormState({ ...formState, customerEmail: e.target.value })}
        margin="normal"
      />

      <TextField
        id="timestamp"
        label="Time"
        defaultValue={formState.date}
        InputProps={{
          readOnly: true,
        }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="service-label">Service Type</InputLabel>
        <Select
          labelId="service-label"
          id="service"
          value={formState.service}
          label="Select Service Type"
          onChange={(e) => setFormState({ ...formState, service: e.target.value })}
        >
          <MenuItem value="maintenance">Home Maintenance</MenuItem>
          <MenuItem value="laundry">Laundry</MenuItem>
          <MenuItem value="houseCleaning">House Cleaning</MenuItem>
          <MenuItem value="lawnCare">Lawn Care</MenuItem>
          <MenuItem value="pantryRestock">Pantry Restocking</MenuItem>
          <MenuItem value="mealDelivery">Meal Delivery</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={(
          <Checkbox
            id="isCompleted"
            checked={formState.isCompleted}
            onChange={(e) => setFormState({ ...formState, isCompleted: e.target.value })}
          />
        )}
        label="Was service completed?"
        margin="normal"
      />

      <TextField
        id="notes"
        label="Notes"
        variant="outlined"
        multiline
        rows={4}
        placeholder="How did the service go?"
        value={formState.notes}
        onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
        margin="normal"
      />

      <Button
        variant="contained"
        component="label"
        size="small"
        id="uploader"
      >
        {' '}
        Add Photo
        <input
          type="file"
          name="filename"
          hidden
          multiple={false}
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      <Typography>
        File:
        {' '}
        { formState.photoFile ? formState.photoFile.name : '' }
      </Typography>

      <input type="hidden" value={formState.provider} />

      <Button variant="contained" type="submit" className="submit">Check In</Button>
    </form>
  );
}

CheckinForm.propTypes = {
  myProvider: PropTypes.string.isRequired,
};

export default CheckinForm;
