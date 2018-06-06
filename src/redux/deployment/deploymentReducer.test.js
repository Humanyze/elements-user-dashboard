import deploymentReducer, { initialState } from './deploymentReducer';
import USER_ACTION_TYPES from '../common/userData/user/userActionTypes';
import { deploymentsByIdRequested, deploymentsByIdSuccessful, setSelectedDeploymentId } from './deploymentActions';

describe('deploymentReducer', () => {
   it('should initialize properly', () => {
       expect(deploymentReducer(undefined, {})).toEqual(initialState);
   });

   it('should respond to User data fetch success', () => {

       const deploymentIds = ['1', '2'];

       it('should set deploymentDataSetId from payload', () => {
           const mockAction = {
               type: USER_ACTION_TYPES.USER_DATA_FETCH_SUCCESSFUL,
               payload: {
                   deploymentDataSetIds: deploymentIds
               }
           };

           const expectedState = {
               ...initialState,
               deploymentDataSetIds: deploymentIds
           };

           expect(deploymentReducer(mockAction, initialState)).toEqual(expectedState);
       });
   });

   it('should set requestPending to be true after deployment data is requested', () => {
        const expectedState = {
            ...initialState,
            requestPending: true
        };
        expect(
            deploymentReducer(initialState, deploymentsByIdRequested())
        ).toEqual(expectedState);
   });

   it('should handle deploymentDataSuccessful', () => {
       const deploymentsById =  {
           '1': {},
           '2': {}
       };
       const expectedState = {
           ...initialState,
           requestPending: false,
           deploymentsById
       };

       expect(
           deploymentReducer(initialState, deploymentsByIdSuccessful(deploymentsById))).toEqual(expectedState);
   });

   it('should handle set deploymentId correctly', () => {
       const id = '2';

       const expectedState = {
           ...initialState,
           selectedDeploymentId: id
       };

       expect(deploymentReducer(initialState, setSelectedDeploymentId(id))).toEqual(expectedState);
   });


});
