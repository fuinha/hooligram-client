import { connect } from 'react-redux'
import { groupCreateRequest } from 'hg/actions/group'
import { goToHome } from 'hg/actions/navigation'
import { currentUserCountryCode, currentUserPhoneNumber } from 'hg/selectors'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToHome: () => {
      dispatch(goToHome())
    },

    groupCreateRequest: (actionId, groupName, memberSids) => {
      dispatch(groupCreateRequest(actionId, groupName, memberSids))
    }
  }
}

const mapStateToProps = (state) => {
  const countryCode = currentUserCountryCode(state)
  const phoneNumber = currentUserPhoneNumber(state)
  return {
    countryCode,
    phoneNumber
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)