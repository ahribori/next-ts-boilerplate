import * as React from 'react';
import './index.scss';
import { inject } from '../../lib/helpers/reduxStoreInjector';

interface State {
    flag: boolean;
}

@(inject(['example']) as any)
class Index extends React.Component<State> {
    state = {
        flag: false,
    };

    render() {
        console.log(this.props);
        return (
            <div>
                Index
            </div>
        );
    }
}

export default Index;
