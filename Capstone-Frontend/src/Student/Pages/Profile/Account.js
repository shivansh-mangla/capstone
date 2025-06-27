import * as React from 'react';
import {
  Container,
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

import SaveIcon from '@mui/icons-material/CheckCircle'; //icons import kiya hai mui se

export default function Account() {

  //Objects ki array banayi hai, setField update karta hai field array ko
  const [fields, setFields] = React.useState([

      // Yeh ek simple text input hai
    { label: 'Name', value: 'Arnam Chaurasiya' },
    { label: 'Roll Number', value: '102203698' },
    {

      // Yeh ek dropdown hai (select input)
      label: 'Academic Year',
      value: '3',
      type: 'select',
      options: ['1', '2', '3', '4']
    },
    {
      label: 'Branch',
      value: 'COE',
      type: 'select',
      options: ['COE', 'ECE', 'ME', 'CE', 'EE']
    },
    { label: 'Sub Group', 
      value: '3 C41',
      type:'select',
      options:['3C41','3C42','3C43']
     },
    {
      label: 'Elective Basket 1',
      value: 'None',
      type: 'select',
      options: ['None','Cloud Computing', 'Data Science', 'COnvo AI', 'UI/UX']
    },
    {
      label: 'Elective Basket 2',
      value: 'None',
      type: 'select',
      options: ['None','Cyber Security', 'EDS', 'French', 'Graph Theoru']
    },
    { label: 'Phone Number', value: '9501503324' }
  ]);


  //specfic field ki value update karne liye function agar user form mein kuch type karta hai ya phir select karta hai
  const handleFieldChange = (index, newValue) => {
    const updatedFields = [...fields]; //feilds array ki copy banata hai
    updatedFields[index].value = newValue; // feild ki value ko update karta hai
    setFields(updatedFields); //detFeild ko update karta hai aur react re render kar deta hai ui ko latest feild value ke according
  };

// Jab user 'Save Changes' button dabata hai,
// to yeh function call hota hai.

const handleSave = () => {
  // Jo bhi fields ka current data hai, usko console mein print kar diya.
  console.log('Saved Values:', fields);
};



// return mein pura UI define ho raha hai:
// 1. Welcome text dikh raha hai.
// 2. fields array ko loop karke form ban raha hai
//    - Agar dropdown hai to Select
//    - Agar normal input hai to TextField
// 3. Last mein ek Save button hai jo data console mein print karta hai

  return (
    <Box alignItems="flex-start">

    <Container maxWidth="md">
      <Box sx={{ textAlign: 'left', mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'blue' }}>
          Welcome !
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Arnam Chaurasiya
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: 'gray' }}>
          Edit Your Info Here
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={9}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                {field.label}
              </Typography>

              {field.type === 'select' ? (
                <FormControl fullWidth size="small" variant="outlined">
                  
                  <Select
                    value={field.value}
                    
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                  >
                    {field.options.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={field.value}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          endIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
    </Box>
  );
}
