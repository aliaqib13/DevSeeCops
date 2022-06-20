import {
    UPDATE_CC,
} from '../action-types/preferences';
import { deleteCreditCard } from './preferences';
import api from '../../services/api';

// Use the api mock
jest.mock('../../services/api');

describe('src/store/actions/preferences.js', () => {
    describe('deleteCreditCard()', () => {
        it('should delete credit card details and dispatch `UPDATE_CC`', async () => {
            const dispatch = jest.fn();
            const result = await deleteCreditCard()(dispatch);
            expect(result).toBe(true);
            expect(dispatch).toHaveBeenCalledWith({
                type: UPDATE_CC,
                payload: {},
            });
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('api/v1/preferences/delete-cc');
        });
    });
});
