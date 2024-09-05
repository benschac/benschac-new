import { useNavigation, NavigationState } from '@react-navigation/native'
import { useCallback, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return function (this: any, ...args: Parameters<T>) {
    const context = this
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

function useDebounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  const debouncedFunc = useCallback(debounce(func, wait), [func, wait])
  return debouncedFunc as T
}

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1'

/**
 * Persist the navigation state to AsyncStorage
 * @returns The initial state of the navigation
 *
 * @example
 * const initialState = usePersistNavigationState()
 * return <Stack initialRouteName={initialState || 'index'} />
 */
export function usePersistNavigationState() {
  const [initialState, setInitialState] = useState<NavigationState>()
  const navigation = useNavigation()

  useEffect(() => {
    if (__DEV__) {
      const restoreState = async () => {
        try {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY)
          if (savedStateString) {
            const state = JSON.parse(savedStateString)
            setInitialState(state)
            navigation.reset(state)
          }
        } catch (e) {
          if (e instanceof Error) {
            console.warn('Failed to restore navigation state:', e.message)
          }
        }
      }

      restoreState()
    }
  }, [navigation])

  const debouncedSaveState = useDebounce(async (state: NavigationState) => {
    if (__DEV__) {
      try {
        await AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      } catch (e) {
        if (e instanceof Error) {
          console.warn('Failed to save navigation state:', e)
        }
      }
    }
  }, 1000)

  useEffect(() => {
    if (__DEV__) {
      const saveState = () => {
        const state = navigation.getState()
        if (state) {
          debouncedSaveState(state)
        }
      }

      const unsubscribe = navigation.addListener('state', saveState)

      return unsubscribe
    }
  }, [navigation, debouncedSaveState])

  return __DEV__ ? initialState : null
}
