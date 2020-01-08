---
inject: true
to: src/core/store/index.ts
after: const rootReducer \= combineReducers\(\{
---
  <%= entity %>s: <%= entity %>Slice.reducer,