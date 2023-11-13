import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";

describe('Testing on uiSlice', () => {

    test('should return the default state', () => {

        // console.log(uiSlice.getInitialState());
        // expect( uiSlice.getInitialState().isDateModalOpen ).toBeFalsy();
        expect( uiSlice.getInitialState() ).toEqual({ isDateModalOpen: false });

    });

    test('should change isDateModalOpen value correctly', () => {

        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal() );
        // console.log(state);
        expect( state.isDateModalOpen ).toBeTruthy();

        state = uiSlice.reducer( state, onCloseDateModal() );
        // console.log(state);
        expect( state.isDateModalOpen ).toBeFalsy();

    });

});