import { useDispatch, useSelector } from 'react-redux'
import { DataType } from './components/data-helpers'
import { RootState, actions } from './dataReduxStore'

export const useSpecialArray = (): {
  data: DataType,
  moveRvTo: (rvId: string, toId: string) => void
} => {
  const specialArray = useSelector((state: RootState) => state.specialArray)
  const dispatch = useDispatch();

  const moveRvTo = (rvId: string, toId: string) => {
    console.log('Dispatching MOVE_RV_TO', rvId, toId);
    dispatch(actions.moveRvTo({rvId, toId}))
  }
  return {data: specialArray, moveRvTo}
}
