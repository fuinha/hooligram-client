import {
  PERSISTENCE_LOAD_STATE_SUCCESS,
  SAVE_USER_NAME,
  VERIFICATION_SUBMIT_CODE_SUCCESS,
  VERIFICATION_REQUEST_CODE_SUCCESS,
  WEBSOCKET_INIT_SUCCESS
} from '@state/actions'
import { appStartupSuccess } from '@state/actions/app'
import routeNames from '@navigation/routeNames'
import { getFullRouteName } from '@state/middlewares/navigation/utils'

let navigator

export const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef
}

const middleware = navigationActions => store => next => action => {
  if (!navigator) {
    return next(action)
  }

  const fullRouteName = getFullRouteName(navigator)
  const { getState } = store

  const prevState = store.getState()
  const returnedAction = next(action)
  const nextState = store.getState()

  switch (fullRouteName) {
    case '/Onboarding/Agree': {
      if (action.type === 'AGREE_AND_CONTINUE') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'RequestCode'
          })
        )
      }
      break
    }

    case '/Onboarding/RequestCode': {
      if (action.type === VERIFICATION_REQUEST_CODE_SUCCESS) {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'SubmitCode'
          })
        )
      }
      break
    }

    case '/Onboarding/SubmitCode': {
      if (action.type === VERIFICATION_SUBMIT_CODE_SUCCESS) {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'Initialize'
          })
        )
      }
      break
    }

    case '/Onboarding/Initialize': {
      if (action.type === 'ONBOARDING_INITIALIZE_SUCCESS') {
        navigator.dispatch(
          navigationActions.navigate({
            routeName: 'ProfileInfo'
          })
        )
      }
      break
    }

    case `/${routeNames.Onboarding}/${routeNames.ProfileInfo}`: {
      if (action.type === SAVE_USER_NAME) {
        const {
          profile: {
            info: {
              isSaved: isUserNameSaved,
              isSaving: isSavingUserName
            }
          }
        } = nextState

        if (!isSavingUserName && isUserNameSaved) {
          navigator.dispatch(
            navigationActions.navigate({
              routeName: 'Conversation'
            })
          )
        }
      }
      break
    }

    case `/${routeNames.Splash}`: {
      if ([PERSISTENCE_LOAD_STATE_SUCCESS, WEBSOCKET_INIT_SUCCESS].includes(action.type)) {
        const {
          app: {
            websocketOnline
          },
          authorization: {
            country_code,
            phone_number,
            token
          }
        } = nextState

        if (!websocketOnline) return

        let routeName = routeNames.Conversation

        if (!country_code || !phone_number || !token) {
          routeName = routeNames.Agree
        }

        store.dispatch(appStartupSuccess())
        navigator.dispatch(
          navigationActions.navigate({
            routeName
          })
        )
      }
      break
    }

    default:
      break
  }

  return returnedAction
}

export default middleware
