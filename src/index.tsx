import * as React from "react";
import * as ReactDOM from "react-dom";

import App from './App';

// import fabric ui utilities
import { initializeIcons }  from 'office-ui-fabric-react/lib/Icons';

initializeIcons(undefined, { disableWarnings: true });

ReactDOM.render(<App />, document.getElementById('root'));