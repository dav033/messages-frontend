import axios from "axios";
import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UserState = {
  user: null | {
    id: number | null;
    name: string;
    profile: null | string;
    temporal: boolean;
  };
};

const registerTemporalUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:4000/users/register_temporal"
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null; // Retornar null en caso de error
  }
};

export type UserActions = {
  registerTemporalUser: () => Promise<void>;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return {
    user: null,
  };
};

export const defaultInitState: UserState = {
  user: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          registerTemporalUser: async () => {
            const user = await registerTemporalUser();
            if (user) {
              set({ user }); // Actualizar el estado solo si user no es null
            }
          },
        }),
        {
          name: "user-store",
        }
      )
    )
  );
};
