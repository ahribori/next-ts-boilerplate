import * as React from 'react';
import './index.scss';

interface State {
  flag: boolean;
}

class Index extends React.Component<State> {
  state = {
    flag: false,
  };

  render() {
    return <div>Index</div>;
  }
}

export default Index;
