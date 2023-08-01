import { useSelector } from 'react-redux'
import { DataType } from './components/data-helpers'
import { RootState } from './dataReduxStore'

export const useSpecialArray = (): DataType => {
  const specialArray = useSelector((state: RootState) => state.specialArray)
  return specialArray
}