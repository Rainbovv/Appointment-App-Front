import { connect, ConnectedProps } from 'react-redux'

interface RootState {
    isOn: boolean
}

const mapState = (state: RootState) => ({
    isOn: state.isOn,
})

const mapDispatch = {
    toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
}

const connector = connect(mapState, mapDispatch)

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>