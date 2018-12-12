import produce from "immer";
import {
    RECEIVE_FRAME,
    DISCARD_FRAME,
    PATCH_FRAME,
    SET_ACTIVE_FRAME,
    UPDATE_FRAMES_TAB,
} from "../actions/frames";

const defaultState = {
    items: [],
    tab: "graph",
};

export default (state = defaultState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case RECEIVE_FRAME:
                draft.items.unshift(action.frame);
                break;

            case DISCARD_FRAME:
                draft.items = draft.items.filter(
                    item => item.id !== action.frameId,
                );
                break;

            case PATCH_FRAME:
                Object.assign(
                    draft.items.find(frame => frame.id === action.id),
                    action.frameData,
                );
                break;

            case SET_ACTIVE_FRAME:
                draft.activeFrameId = action.frameId;
                return;

            case UPDATE_FRAMES_TAB:
                draft.tab = action.tab;
                return;
            default:
                return;
        }
    });
