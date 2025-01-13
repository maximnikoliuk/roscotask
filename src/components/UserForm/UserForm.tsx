import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from 'firebase/firestore/lite';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { firestoreAutoId } from "../../utils/firebase.tsx";
import { app } from "../../firebase/firebase.tsx";
import { UserType } from "../../types/UsersTypes.tsx";
import { useAppDispatch } from "../../redux/store.tsx";
import { showSnackbar } from "../../redux/sliceNotifs.tsx";
import { auth } from "../../firebase/firebase.tsx";

export default function UserForm() {
  const dispatch = useAppDispatch();
  const [validated, setValidated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const addNewUser = async (formData: UserType) => {
    const db = getFirestore(app);
    await setDoc(doc(db, "users", formData.id), { ...formData });
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
      setValidated(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    try {
      if (form.checkValidity()) {
        const formData = new FormData(event.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        const newId = firestoreAutoId();

        const data: UserType = {
          id: newId,
          firstName: formEntries.firstName as string,
          lastName: formEntries.lastName as string,
          email: formEntries.email as string,
          password: formEntries.password as string,
          text: formEntries.text as string || ''
        };
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        await addNewUser(data);
        handleReset();
        setValidated(false);
        dispatch(showSnackbar({
          variant: 'success',
          message: "New user has been added"
        }));
      } else {
        setValidated(true);
      }
    } catch (err: any) {
      dispatch(showSnackbar({
        variant: 'danger',
        message: err?.message || "Error while creating new user"
      }));
    }
  };

  return (
    <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            name="firstName"
            placeholder="First name"
            defaultValue=""
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">First name is required.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            placeholder="Last name"
            defaultValue=""
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">Last name is required.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="new-password"
          />
          <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="validationCustom05">
        <Form.Label>Text (optional)</Form.Label>
        <Form.Control
          as="textarea"
          name="text"
          rows={3}
          autoComplete="off"
        />
      </Form.Group>
      <Button type="submit">Add</Button>
    </Form>
  );
}
