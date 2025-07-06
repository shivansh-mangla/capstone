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

import StudentSidebar from '../../Components/Sidebar';
import SaveIcon from '@mui/icons-material/CheckCircle'; //icons import kiya hai mui se
import axios from 'axios';
import { UserContext } from '../../../UserContext';
import { toast } from 'react-toastify';

export default function Account() {

  const {student, setStudent} = React.useContext(UserContext);
  const [subgroupList, setSubgroupList] = React.useState([]);
  const [electiveBasketList, setElectiveBasketList] = React.useState([]);

  //Objects ki array banayi hai, setField update karta hai field array ko
  const [fields, setFields] = React.useState([]);
  const generateFields = (subgroups, electives) => ([
    { label: 'Name', value: student.name },
    { label: 'Roll Number', value: student.roll_no },
    { label: 'Academic Year', value: student.academic_year, type: 'select', options: ['1', '2', '3', '4'] },
    { label: 'Branch', value: student.branch, type: 'select', options: ['COE', 'MECH', 'CIVIL', 'ECE', 'EEE'] },
    { label: 'Sub Group', value: student.subgroup, type: 'select', options: subgroups },
    { label: 'Elective Basket 1', value: student.elective_basket, type: 'select', options: electives },
    { label: 'Elective Basket 2', value: 'None', type: 'select', options: ['None', 'Cyber Security', 'EDS', 'French', 'Graph Theory'] },
    { label: 'Phone Number', value: student.phone_number }
  ]);

  React.useEffect(() => {
    console.log(student);
    var subgroups = [];
    var electives = [];
    // Get subgroups list
    axios.get("http://localhost:5000/api/student/get-subgroup-name-list")
      .then((res) => {
        //keep only those subgroups in list whose 1st charecter === academic year
        subgroups = res.data["subgroupList"];
        setSubgroupList(res.data["subgroupList"]);
        setFields((prevFields) => generateFields(subgroups, electiveBasketList));
      })
      .catch(() => {
        toast.error('Failed to load subgroup data, please retry!');
      });

    // Get electives list
    axios.get("http://localhost:5000/api/student/get-elective-basket-list")
      .then((res) => {
        electives = res.data["electiveBasketList"];
        setElectiveBasketList(res.data["electiveBasketList"]);
        setFields((prevFields) => generateFields(subgroups, electives));
      })
      .catch(() => {
        toast.error('Failed to load elective data, please retry!');
      });
  }, []);




  //specfic field ki value update karne liye function agar user form mein kuch type karta hai ya phir select karta hai
  const handleFieldChange = (index, newValue) => {
    const updatedFields = [...fields]; //feilds array ki copy banata hai
    updatedFields[index].value = newValue; // feild ki value ko update karta hai
    setFields(updatedFields); //detFeild ko update karta hai aur react re render kar deta hai ui ko latest feild value ke according
  };

// Jab user 'Save Changes' button dabata hai,
// to yeh function call hota hai.

const handleSave = () => {
  const result = {};

  fields.forEach(field => {
    result[field.label] = field.value;
  });

  console.log(result);

  const updatedStudent = {
    ...student,
    name: result['Name'],
    roll_no: result['Roll Number'],
    academic_year: result['Academic Year'],
    branch: result['Branch'],
    subgroup: result['Sub Group'],
    elective_basket: result['Elective Basket 1'],
    general_elective: result['Elective Basket 2'],
    phone_number: result['Phone Number']
  };

  // Update context
  setStudent(updatedStudent);

  axios.post("http://localhost:5000/api/student/update-details", updatedStudent)
  .then(() => {
    toast.success("Details updated successfully!");
  })
  .catch(() => {
    toast.error("Failed to update details. Please try again.");
  });

};



// return mein pura UI define ho raha hai:
// 1. Welcome text dikh raha hai.
// 2. fields array ko loop karke form ban raha hai
//    - Agar dropdown hai to Select
//    - Agar normal input hai to TextField
// 3. Last mein ek Save button hai jo data console mein print karta hai

  return (
    <Box alignItems="flex-start">
      <StudentSidebar/>
      <Container >
        
      </Container>
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
