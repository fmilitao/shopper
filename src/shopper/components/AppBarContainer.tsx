import { ConnectedProps, connect } from 'react-redux';
import { actions, mapState } from '../redux/store';
import AppBar from './AppBar';

const connector = connect(mapState, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromArgs = {};

export type Props = PropsFromRedux & PropsFromArgs;

export default connector(AppBar);
