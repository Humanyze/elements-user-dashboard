import React from 'react';
import { Link } from 'react-router-dom';
import { elementsRedux, routerPaths } from 'ElementsWebCommon';
import { connect } from 'react-redux';
import styled from 'styled-components';
//import withRouter from '../../deployment/DeploymentRoutes';

const {
  companyActions: {
    createCompany,
  },
} = elementsRedux;

const StyledForm = styled.form`

`;

const StyledTextInput = styled.input`

`;
const SubmitButton = styled.button`

`;

const CompanyCreate = connect(
  null,
  { createCompany, }
)(({
  createCompany,
  history,
}) => {

  const [
    companyName,
    setCompanyName,
  ] = React.useState('');
  const onCompanyNameChange = ({ target: { value, }, }) => setCompanyName(value);

  const [
    notes,
    setNotes,
  ] = React.useState('');
  const onNotesChange = ({ target: { value , }, }) => setNotes(value);


  const createNewCompany = (e) => {
    e.preventDefault();
    try {
      createCompany({
        name: companyName,
        notes,
      });
      history.push(routerPaths.selectCompany);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      Company Create
      <Link to={routerPaths.selectCompany}>Company List</Link>
      <StyledForm onSubmit={createNewCompany}>
        <fieldset>
          <label>
            Company Name
          </label>
          <StyledTextInput required onChange={onCompanyNameChange} />

        </fieldset>
        <fieldset>
          <label>
            Notes
          </label>
          <StyledTextInput onChange={onNotesChange} />
        </fieldset>
        <SubmitButton type='submit' onClick={createNewCompany}>
          Create
        </SubmitButton>
      </StyledForm>
    </div>
  );
});

export default CompanyCreate;
