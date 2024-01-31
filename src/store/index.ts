import { createStore } from "vuex";
import { UserPreferences } from "@/common/types/types";

// State type
export interface RootState {
  userPreferences: UserPreferences;
}

export const store = createStore<RootState>({
  state: (): RootState => ({
    userPreferences: {} as UserPreferences,
  }),
  mutations: {
    ADD_USER_PREFERENCES(state, payload) {
      state.userPreferences = payload;
    },
  },
  actions: {
    addUserPrefferences(context, payload) {
      context.commit("ADD_USER_PREFERENCES", payload);
    },
  },
});

export default store;

export const { dispatch, getters, state } = store;
