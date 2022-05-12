import React from 'react';
import QueryEditor from './queryEditor/QueryEditor.js';
import { KeyStateProvider } from './stores/key-state';
import './css/reset.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';
import './css/index.css';
import './css/react-split-pane.css';
import './css/vendorOverrides.css';

function SqlEditior() {
  return (
    <KeyStateProvider>
      <QueryEditor />
    </KeyStateProvider>
  );
}

export default SqlEditior;
