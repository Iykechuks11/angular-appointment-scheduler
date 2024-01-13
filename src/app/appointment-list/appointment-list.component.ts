import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent  implements OnInit {

  // Loads/keeps the appointment list every time the application is reloaded
  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments')
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

  newAppointmentTitle : string = "";
  newAppointmentDate : Date = new Date();
  appointments: Appointment[] = [];

  addAppointment() {
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppoint: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
    
      this.appointments.push(newAppoint);

      // Store in local storage
      localStorage.setItem("appointments", JSON.stringify(this.appointments))

      // Clear the input fields
      this.newAppointmentTitle = ""
      this.newAppointmentDate = new Date();
    } else {
      alert("Invalid Appointment")
    }
  }

  // Remove an Appointment
  deleteAppointment(index: number) {
    this.appointments.splice(index, 1)
    localStorage.setItem("appointments", JSON.stringify(this.appointments))

  }

}
