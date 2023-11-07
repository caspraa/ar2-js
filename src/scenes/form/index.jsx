import React, { useState } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { tokens } from "../../themes";
import CircularProgress from '@mui/material/CircularProgress';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  // Define imageUrl and setImageUrl using useState
  const [imageUrl, setImageUrl] = useState("");
  const colors = tokens(theme.palette.mode);

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result.split(',')[1]); // Extract the base64 content
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  const handleFormSubmit = async (values) => {
    setLoading(true); 
    console.log(values.file.name)
    const formData = new FormData();
    formData.append('file', values.file);
    console.log(values)
    const selectedFile = values.file;
    const fileContent = await readFileAsBase64(values.file)
    console.log(fileContent)
    const gcsFileName = selectedFile.name;
    values = {
        "name": values.firstName,
        "email": values.email,
        "number": values.contact,
        "image_url": gcsFileName,
        "fileContent": fileContent,
        "marker_patt_file": "marker.patt",
        "marker_image_file": "marker.png"
    };

    try {
      const response = await axios.post("https://us-central1-model-creator-poc.cloudfunctions.net/generate-ar-page", values);
      console.log(response)
      console.log("Data from Cloud Function received");
      console.log(response.data.qr_bucket_url)
      // Update imageUrl with the response
      setImageUrl(response.data.qr_bucket_url);
      
      console.log("Request successful");
    } catch (e) {
      console.log(e);
    }finally {
        setLoading(false); // Set loading back to false when image is loaded or request is completed
      }
  };
  return (
    <Box display = 'flex' sx={{
        flexDirection: 'row',
        height:'100%'
        }}>
        <Box display='flex' padding = '20px'sx={{
          margin:10,
          mt:15,
          mb: 15,
          width: '100%',
          flexDirection: 'column',
          borderRadius: 10,
          bgcolor: colors.white[900]
          }
        }>
        <Box m='20px' mt='70px'>
      <Header title="CREATE AR TAG" subtitle="Create a New User ARtag" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          setFieldValue,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="25px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
              />
                
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <Box display="flex" sx={{ gridColumn: "span 4" }}>
              <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                   }}
                  multiple
                  type="file"
                />
                <label htmlFor="file" >
                  <Button variant="raised" component="span" >
                    Upload User Image
                  </Button>
                </label> 
                </Box>
              
            </Box>
            <Box display="flex" justifyContent="end" mt="10px">
              <Button type="submit" color="primary" variant="contained">
                Create New Tag
              </Button>
            
            </Box>
          </form>
        )}
      </Formik>
      </Box>
      </Box >
      <Box display='flex' sx={{
          justifyContent:"center",
          alignItems:"center",
          mt: '0px',
          padding: 25,
          width: '100%',
          height: "100%",
          bgcolor: colors.blue[300]}
        }>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: "0px", width: 420, height: 420, borderRadius: 8, bgcolor: colors.white[900] }}>
        {loading ? (
            <CircularProgress />
          ) : imageUrl ? (
            <img src={imageUrl} alt="QR Code" />
          ) : null}
      </Box>
        </Box>
       
      </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  file: ""
};

export default Form;