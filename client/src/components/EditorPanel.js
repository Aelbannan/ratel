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

import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import Editor from "../containers/Editor";

import "../assets/css/EditorPanel.scss";

class EditorPanel extends React.Component {
    renderRadioBtn = (action, title, selectedAction, onUpdateAction) => (
        <button
            className="action actionable"
            onClick={() => onUpdateAction(action)}
        >
            <label className="editor-label">
                <input
                    className="editor-type"
                    type="radio"
                    name="action"
                    value={action}
                    checked={selectedAction === action}
                    onChange={() => onUpdateAction(action)}
                />
                &nbsp;
                {title}
            </label>
        </button>
    );

    render() {
        const {
            query,
            action,
            onRunQuery,
            onUpdateQuery,
            onClearQuery,
            onUpdateAction,
        } = this.props;

        const isQueryDirty = query.trim() !== "";

        return (
            <div className="editor-panel">
                <div className="header">
                    <div className="actions">
                        {this.renderRadioBtn(
                            "query",
                            "Query",
                            action,
                            onUpdateAction,
                        )}
                        {this.renderRadioBtn(
                            "mutate",
                            "Mutate",
                            action,
                            onUpdateAction,
                        )}
                    </div>

                    <div className="actions right">
                        <button
                            className={classnames("action", {
                                actionable: isQueryDirty,
                            })}
                            onClick={() => {
                                if (query === "") {
                                    return;
                                }
                                onClearQuery();
                            }}
                        >
                            <i className="fa fa-times" /> Clear
                        </button>
                        <button
                            className={classnames("action", {
                                actionable: isQueryDirty,
                            })}
                            onClick={() => {
                                if (query === "") {
                                    return;
                                }

                                onRunQuery(query, this.props.action);
                            }}
                        >
                            <i className="fa fa-play" /> Run
                        </button>
                    </div>
                </div>

                <Editor
                    onUpdateQuery={onUpdateQuery}
                    onHotkeyRun={query => onRunQuery(query, this.props.action)}
                    query={query}
                    maxHeight="fillParent"
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        query: state.query.query,
        action: state.query.action,
    };
}

export default connect(mapStateToProps)(EditorPanel);
