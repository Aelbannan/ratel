// Copyright 2017-2019 Dgraph Labs, Inc. and Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { persistCombineReducers } from "redux-persist";

import frames from "./frames";
import connection from "./connection";
import query from "./query";
import ui from "./ui";
import url from "./url";

export default function makeRootReducer(config) {
    return persistCombineReducers(config, {
        frames,
        connection,
        query,
        ui,
        url,
    });
}
