import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./index";
import { NormalizedState } from "./models";
import { createAction, createSlice, AnyAction } from "@reduxjs/toolkit";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const normalizeData = <T>(data: T) => ({
  error: null,
  data,
  loading: false
});

type DataMapper = <T, EnhancedT>(data: T) => EnhancedT;

interface DataMapperConfig {
  success: DataMapper;
  failure: DataMapper;
}
export const makeCrudListEffectTriplets = <T>(
  name: string,
  initialState: NormalizedState<T>,
  dataMapperConfig?: DataMapperConfig
) => {
  interface GetSuccess {
    data: T[];
  }

  type DeleteSuccess = undefined;
  interface Failure {
    error: Error;
  }
  type Load = undefined;

  const GET_SUCCESS = `GET_ALL_${name}_Success`.toUpperCase();
  const GET_FAILURE = `GET_ALL_${name}_Failure`.toUpperCase();
  const GET_LOADING = `GET_ALL_${name}_Loading`.toUpperCase();

  const getAllSuccess = createAction<GetSuccess>(GET_SUCCESS);
  const getAllFailure = createAction<Failure>(GET_FAILURE);
  const getAllLoading = createAction<Load>(GET_LOADING);

  const DELETE_SUCCESS = `DELETE_ALL_${name}_Success`.toUpperCase();
  const DELETE_FAILURE = `DELETE_ALL_${name}_Failure`.toUpperCase();
  const DELETE_LOADING = `DELETE_ALL_${name}_Loading`.toUpperCase();

  const deleteAllSuccess = createAction<DeleteSuccess>(DELETE_SUCCESS);
  const deleteAllFailure = createAction<Failure>(DELETE_FAILURE);
  const deleteAllLoading = createAction<Load>(DELETE_LOADING);

  const actions = {
    getAllSuccess,
    getAllFailure,
    getAllLoading,
    deleteAllFailure,
    deleteAllLoading,
    deleteAllSuccess
  };

  const getReducer = (state: any, action: AnyAction) => {
    const { data } = action.payload;
    console.log("THE DATARS", data);
    const normalizedData = data.reduce(
      (acc: any, cur: { id: any }) => ({
        ...acc,
        [cur.id]: normalizeData(cur)
      }),
      {}
    );
    console.log("normalizer", normalizedData);
    return {
      error: null,
      loading: false,
      data: normalizedData
    };
  };
  const deleteReducer = (state: any, action: AnyAction) => {
    return {
      error: null,
      loading: false,
      data: {}
    };
  };

  const failReducer = (state: any, action: AnyAction) => {
    const { err } = action.payload;
    const existing = state.data;
    const data = existing ? existing : null;
    return {
      loading: false,
      error: err,
      data
    };
  };

  const loadReducer = (state: any, action: AnyAction): NormalizedState<T> => {
    const existing = state.data;
    const error = existing ? existing.error : null;
    const data = existing ? existing.data : null;

    return {
      error,
      loading: true,
      data
    };
  };

  const slice = createSlice({
    initialState,
    name: `${name}`,
    reducers: {
      [getAllSuccess.type](state, action) {
        return getReducer(state, action);
      },
      [getAllFailure.type](state, action) {
        return failReducer(state, action);
      },
      [getAllLoading.type](state, action) {
        return loadReducer(state, action);
      },
      [deleteAllSuccess.type](state, action) {
        return deleteReducer(state, action);
      },
      [deleteAllFailure.type](state, action) {
        return failReducer(state, action);
      },
      [deleteAllLoading.type](state, action) {
        return loadReducer(state, action);
      }
    }
  });

  return {
    actions,
    slice
  };
};

export const makeCrudItemEffectTriplets = <T>(
  name: string,
  initialState: NormalizedState<T>,
  dataMapperConfig?: DataMapperConfig
) => {
  interface GetSuccessAction {
    id: string | number;
    data: T;
  }
  interface UpdateSuccessAction {
    id: string | number;
    data: Partial<T>;
  }
  interface DeleteSuccessAction {
    id: string | number;
  }
  interface FailureAction {
    id: string | number;
    error: Error;
  }
  interface LoadAction {
    id: string | number;
  }

  const GET_SUCCESS = `GET_${name}_Success`.toUpperCase();
  const GET_FAILURE = `GET_${name}_Failure`.toUpperCase();
  const GET_LOADING = `GET_${name}_Loading`.toUpperCase();

  const getSuccess = createAction<GetSuccessAction>(GET_SUCCESS);
  const getFailure = createAction<FailureAction>(GET_FAILURE);
  const getLoading = createAction<LoadAction>(GET_LOADING);

  const UPDATE_SUCCESS = `UPDATE_${name}_Success`.toUpperCase();
  const UPDATE_FAILURE = `UPDATE_${name}_Failure`.toUpperCase();
  const UPDATE_LOADING = `UPDATE_${name}_Loading`.toUpperCase();

  const updateSuccess = createAction<UpdateSuccessAction>(UPDATE_SUCCESS);
  const updateFailure = createAction<FailureAction>(UPDATE_FAILURE);
  const updateLoading = createAction<LoadAction>(UPDATE_LOADING);

  const DELETE_SUCCESS = `DELETE_${name}_Success`.toUpperCase();
  const DELETE_FAILURE = `DELETE_${name}_Failure`.toUpperCase();
  const DELETE_LOADING = `DELETE_${name}_Loading`.toUpperCase();

  const deleteSuccess = createAction<DeleteSuccessAction>(DELETE_SUCCESS);
  const deleteFailure = createAction<FailureAction>(DELETE_FAILURE);
  const deleteLoading = createAction<LoadAction>(DELETE_LOADING);

  const actions = {
    getSuccess,
    getFailure,
    getLoading,
    updateSuccess,
    updateLoading,
    updateFailure,
    deleteFailure,
    deleteLoading,
    deleteSuccess
  };

  const getReducer = (state: any, action: AnyAction) => {
    const { id, data } = action.payload;
    return {
      error: null,
      loading: false,
      data: {
        ...state.data,
        [id]: {
          id,
          loading: false,
          data,
          error: null
        }
      }
    };
  };

  const deleteReducer = (state: any, action: AnyAction) => {
    const { id } = action.payload;
    
    delete state.data[id];
    return state
  };

  const updateReducer = (state: any, action: AnyAction) => {
    const { id, data } = action.payload;
    const existing = state.data[id];
    const existingData = existing ? existing.data : {};
    return {
      error: null,
      loading: false,
      data: {
        ...state.data,
        [id]: {
          id,
          loading: false,
          error: null,
          data: {
            ...existingData,
            ...data
          }
        }
      }
    };
  };

  const failReducer = (state: any, action: AnyAction) => {
    const { id, err } = action.payload;
    const existing = state.data[id];
    const data = existing ? existing.data : null;
    return {
      ...state,
      data: {
        ...state.data,
        [id]: {
          id,
          loading: false,
          data,
          error: err
        }
      }
    };
  };

  const loadReducer = (state: any, action: AnyAction) => {
    const { id } = action.payload;
    const existing = state.data;
    const error = existing ? existing.error : null;
    const data = existing ? existing.data : null;

    return {
      error: null,
      loading: false,
      data: {
        ...state.data,
        [id]: {
          loading: true,
          error,
          id,
          data
        }
      }
    };
  };

  const slice = createSlice({
    initialState,
    name: `${name}`,
    reducers: {
      [getSuccess.type](state, action) {
        return getReducer(state, action);
      },
      [getFailure.type](state, action) {
        return failReducer(state, action);
      },
      [getLoading.type](state, action) {
        return loadReducer(state, action);
      },
      [updateSuccess.type](state, action) {
        return updateReducer(state, action);
      },
      [updateFailure.type](state, action) {
        return failReducer(state, action);
      },
      [updateLoading.type](state, action) {
        return loadReducer(state, action);
      },
      [deleteSuccess.type](state, action) {
        return deleteReducer(state, action);
      },
      [deleteFailure.type](state, action) {
        return failReducer(state, action);
      },
      [deleteLoading.type](state, action) {
        return loadReducer(state, action);
      }
    }
  });

  return {
    actions,
    slice
  };
};
