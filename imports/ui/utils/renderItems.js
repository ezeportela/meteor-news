import React from 'react';
import TextInput from '../components/TextInput';
import Checkbox from '../components/Checkbox';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const editorOptions = {
  mode: 'javascript',
  theme: 'material',
  lineNumbers: true
};

export const renderItems = (items, state) =>
  items.map(item => (
    <React.Fragment key={item.name}>
      {item.type === 'text' && (
        <TextInput
          col={item.col}
          id={item.name}
          name={item.name}
          onChange={item.onChange}
          label={item.label}
          icon={item.icon}
          value={state[item.name]}
          validate={true}
        />
      )}
      {item.type === 'checked' && (
        <Checkbox
          name={item.name}
          col={`input-field ${item.col}`}
          label={item.label}
          checked={state[item.name]}
          onChange={item.onChange}
        />
      )}
      {item.type === 'editor' && (
        <div className={`col ${item.col}`} key={item.name}>
          <span className="editor-label">{item.label}</span>
          <CodeMirror
            value={state[item.name]}
            options={editorOptions}
            onBeforeChange={item.onChange(item.name)}
          />
        </div>
      )}
    </React.Fragment>
  ));
