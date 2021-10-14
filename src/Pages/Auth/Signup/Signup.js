import React from 'react'
import '../../../App.css';
import validationSchema from "./validations";
import { useFormik } from "formik";
import { useAuth } from '../../../Context/AuthContext'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Signup() {
	let history = useHistory();
    const { register } = useAuth();
    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
		useFormik({
			initialValues: {
				email: "",
				password: "",
				passwordConfirm: "",
			},
			onSubmit: (values) => {
				register(values);
				history.push(`/main`)
				
			},
			validationSchema,
		});

    return (
        <Container>
			<Row>
			<Col xs={12}>
                <div className="signup-page">
                    <h1>Sign Up</h1>
                    <div className="box">
                    <form onSubmit={handleSubmit}>
				<label>Email</label>
				<input
					name="email"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				{errors.email && touched.email && (
					<div className="error">{errors.email}</div>
				)}

				<br />
				<br />
				<label>Password</label>
				<input
					name="password"
                    type="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				{errors.password && touched.password && (
					<div className="error">{errors.password}</div>
				)}

				<br />
				<br />

				<label>Confirm Password</label>
				<input
					name="passwordConfirm"
                    type="password"
					value={values.passwordConfirm}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				{errors.passwordConfirm && touched.passwordConfirm && (
					<div className="error">{errors.passwordConfirm}</div>
				)}

				<br />
				<br />
				<Button variant="primary" type="submit">Submit</Button>
				<br />
				<br />
                <Link to="/signin" id="signin-link">Want to Sign In ?</Link>
			</form>
                    </div>
                </div>
				</Col>
				</Row>
        </Container>
    )

}

export default Signup
