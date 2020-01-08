---
inject: true
to: src/core/store/index.ts
after: import thunk from "redux-thunk";
---
import { <%= entity %>Slice } from "./<%= entity %>";