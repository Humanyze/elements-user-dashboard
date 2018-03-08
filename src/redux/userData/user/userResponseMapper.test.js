import {mapUserResponse, parseDataSetsFromRoles} from './userResponseMapper';


describe.only('userResponseMapper', () => {

    describe('parseDataSetsFromRoles', () => {
        const rolesArray = [
            '/api/v1/role/participant-dataset-5/',
            '/api/v1/role/mgr-part-dataset-5/',
            '/api/v1/role/executive-dataset-5/',
            '/api/v1/role/executive-dataset-16/',
            '/api/v1/role/executive-dataset-22/',
            '/api/v1/role/executive-dataset-23/',
            '/api/v1/role/account-admin-dataset-5/',
            '/api/v1/role/executive-dataset-26/',
            '/api/v1/role/executive-dataset-27/',
            '/api/v1/role/deployment-admin-dataset-38/',
            '/api/v1/role/admin-dataset-41/',
            '/api/v1/role/admin-dataset-42/'
        ];


        it('should parse valid roles array to appropriate dataset arrays', () => {
            const expected = {
                executiveDataSetIds: ['5', '16', '22', '23', '26', '27'],
                deploymentDataSetIds: ['5', '38', '41', '42']
            };

            const result = parseDataSetsFromRoles(rolesArray);

            expect(result.executiveDataSetIds).toEqual(expected.executiveDataSetIds);
            expect(result.deploymentDataSetIds).toEqual(expected.deploymentDataSetIds);
        })
    });

});