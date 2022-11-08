import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', starred: false}

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newAppointment = {
      id: v4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onStarAppointment = starredId => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (starredId === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onSelectStarredAppointments = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  renderAppointmentsList = () => {
    const {appointmentsList, starred} = this.state

    const filteredAppoinmentsList = appointmentsList.filter(eachAppointment => {
      if (starred === true) {
        return eachAppointment.isStarred === true
      }
      return eachAppointment
    })

    return (
      <ul className="appointments-list">
        {filteredAppoinmentsList.map(eachAppointment => (
          <AppointmentItem
            onStarAppointment={this.onStarAppointment}
            appointment={eachAppointment}
            key={eachAppointment.id}
          />
        ))}
      </ul>
    )
  }

  renderNoStarredAppointments = () => (
    <p className="no-appointments">No appointments</p>
  )

  render() {
    const {appointmentsList, title, date, starred} = this.state

    const starredClassName = starred
      ? 'starred-button selected-starred'
      : 'starred-button'

    const anyAppointments =
      appointmentsList.length === 0
        ? this.renderNoStarredAppointments()
        : this.renderAppointmentsList()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="appointment-container">
            <div className="appointment-input-container">
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.onAddAppointment} className="form-container">
                <label htmlFor="titleId" className="input-label">
                  TITLE
                </label>
                <input
                  value={title}
                  id="titleId"
                  onChange={this.onChangeTitle}
                  placeholder="Title"
                  className="input"
                  type="text"
                />
                <label htmlFor="dateId" className="input-label">
                  DATE
                </label>
                <input
                  value={date}
                  id="dateId"
                  onChange={this.onChangeDate}
                  className="input"
                  type="date"
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="appointments-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="separator" />
          <div className="starred-container">
            <h1 className="appointments">Appointments</h1>
            <button
              onClick={this.onSelectStarredAppointments}
              type="button"
              className={starredClassName}
            >
              Starred
            </button>
          </div>

          {anyAppointments}
        </div>
      </div>
    )
  }
}

export default Appointments
