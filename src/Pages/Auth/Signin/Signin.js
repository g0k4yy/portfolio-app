import React from 'react'
import '../../../App.css';
import validationSchema from "./validations";
import { useFormik, } from "formik";
import { useAuth } from '../../../Context/AuthContext'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useHistory } from "react-router-dom";


function Signin() {
	const { login } = useAuth();
	let history = useHistory();
	const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
		useFormik({
			initialValues: {
				email: "",
				password: "",
			},
			onSubmit: (values) => {
				console.log("submitted")
				login(values);
				history.push(`/main`)
			},
			validationSchema,
		});

	return (
		<Container>
			<Row>
			<Col xs={12}>
			<div className="signup-page">
				<h1>Sign In</h1>
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
						<Button variant="primary" type="submit">Submit</Button>
						<br />
						<br />
					</form>
				</div>
			</div>
			</Col>
			</Row>
		</Container>
	)
}
export default Signin