import "juce-blueprint/cjs/lib/polyfill";

import React from 'react';
import Blueprint from 'juce-blueprint';
import App from './App';

Blueprint.render(<App />, Blueprint.getRootContainer());
