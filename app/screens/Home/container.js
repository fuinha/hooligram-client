import { connect } from 'react-redux'
import { signOut } from 'hg/actions/app'
import { goToContact, goToDirectMessage, goToGroupMessage } from 'hg/actions/navigation'
import { currentUserSid } from 'hg/selectors'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    goToContact: () => {
      dispatch(goToContact())
    },

    goToDirectMessage: (groupId) => {
      dispatch(goToDirectMessage(groupId))
    },

    goToGroupMessage: (groupId) => {
      dispatch(goToGroupMessage(groupId))
    },

    signOut: () => {
      dispatch(signOut())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserSid: currentUserSid(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)