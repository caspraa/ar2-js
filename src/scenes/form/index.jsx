import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { tokens } from "../../themes";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");
  const theme = useTheme();

  // Define imageUrl and setImageUrl using useState
  const [imageUrl, setImageUrl] = useState("");
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post("https://us-central1-model-creator-poc.cloudfunctions.net/generate-ar-page", values);
      console.log("Data from Cloud Function received");
      console.log(response.data.qr_bucket_url)
      // Update imageUrl with the response
      setImageUrl(response.data.qr_bucket_url);
      
      console.log("Request successful");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box display = 'flex' sx={{
        flexDirection: 'row',
        }}>
        <Box display='flex' padding = '20px'sx={{
          margin:10,
          mt:15,
          width: '40%',
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
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="40px"
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
            </Box>
            <Box display="flex" justifyContent="end" mt="40px">
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
          justifyContent: 'center',
          flexDirection: 'column',
          mt: '0px',
          padding: 25,
          width: 780,
          height: 800,
          bgcolor: colors.blue[300]}
        }>
        <Box display="flex" sx={{ mt: "0px", padding: "5px", width: 420, height: 420, borderRadius: 8, bgcolor: colors.white[900] }}>
        {/* Display the image from imageUrl */}
        {imageUrl && <img src={imageUrl} alt="QR Code" />}
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
  firstName: "vishnu",
  lastName: "",
  email: "",
  contact: "",
};

export default Form;