import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointment, onStarAppointment} = props
  const {title, date, isStarred, id} = appointment

  const starIcon = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const appointmentDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const onClickStarIcon = () => {
    onStarAppointment(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-container">
        <p className="title">{title}</p>
        <button
          //   testid="star"
          onClick={onClickStarIcon}
          type="button"
          className="star-button"
        >
          <img className="icon" src={starIcon} alt="star" />
        </button>
      </div>
      <p className="date">Date: {appointmentDate}</p>
    </li>
  )
}

export default AppointmentItem
