import { Injectable } from "@angular/core";
import { get } from "jquery";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ResourceService {
  constructor() {}

  private host: string = environment.apiURL + "/api/v1";

  private Auth = this.host + "/auth";
  private Vehicle = this.host + "/vehicle";
  private Booking = this.host + "/booking";
  private Store = this.host + "/store";
  private User = this.host + "/user";
  private Leave = this.host + "/leave";
  private MonthAudit = this.host + "/monthAudit";
  private Common = this.host + "/common";
  private Trip = this.host + "/trip";
  private Expenses = this.host + "/expense";
  private Report = this.host + "/report";
  private ExpenseRequest = this.host + "/expenseRequest";
  private Notification = this.host + "/notification";

  auth = {
    login: this.Auth + "/login",
    resetPassword: this.Auth + "/resetPassword",
    changePassword: this.Auth + "/changePassword",
    refreshAuth: this.Auth + "/refreshAuth",
  };

  store = {
    uploadFile: this.Store + "/upload",
    uploadMultipleFiles: this.Store + "/uploadMultiple",
  };

  user = {
    validateUser: this.User + "/validateUser",
    saveUser: this.User + "/register",
    getAllUsers: this.User + "/get-all",
    getUserById: this.User,
    blockUser: this.User + "/block",
    unblockUser: this.User + "/unblock",
    updateUser: this.User + "/admin/approve-driver",
    updateUserProfile: this.User + "/profile",
    deleteUser: this.User + "/admin/delete-user",
    getUsersByRole: this.User + "/userByRole",
  };

  booking = {
    saveBooking: this.Booking + "/add-booking",
    getAllBooking: this.Booking + "/get-all",
    getBookingById: this.Booking,
    deleteBooking: this.Booking,
    updateBooking: this.Booking + "/update-booking",
    startTrip: this.Booking + "/start-trip",
    endTrip: this.Booking + "/end-trip",
  };

  monthAudit = {
    getPendingLeaves: this.MonthAudit + "/pendingLeaves",
    createNewMonth: this.MonthAudit + "/createNewMonth",
    getWorkingInfo: this.MonthAudit + "/workingInfo",
    getPendingTrips: this.MonthAudit + "/pendingTrip",
  };

  wegaShine = {
    session: "/session",
    devices: "/devices",
  };

  common = {
    getDataByType: this.Common + "/data",
    getGenders: this.Common + "/gender",
  };

  vehicle = {
    saveVehicle: this.Vehicle,
    getAllVehicles: this.Vehicle + "/get-all",
    getVehicleById: this.Vehicle,
    updateVehicle: this.Vehicle,
    deleteVehicleById: this.Vehicle,
    activeInactiveVehicles: this.Vehicle + "/activeInactive",
    getAllVehiclesByCount: this.Vehicle + "/passengerCount",
  };

  trip = {
    saveTrip: this.Trip,
    getAllTrips: this.Trip,
    getTripById: this.Trip,
    updateTrip: this.Trip,
    cancelTrip: this.Trip,
    assignDriver: this.Trip + "/assignDriver",
    updateTripStatus: this.Trip,
    getTripForPrint: this.Trip + "/tripForPrint",

    // checkList routes
    saveCheckList: this.Trip + "/checkList",
    getCheckList: this.Trip + "/checkList",

    // trip places
    getPlacesByTripId: this.Trip + "/places",
    updatePlaceAsMarked: this.Trip,
  };

  expense = {
    saveExpense: this.Expenses,
    updateExpense: this.Expenses,
    deleteExpense: this.Expenses,
    getAllExpensesByTrip: this.Expenses,
    getExpenseById: this.Expenses,
    getExpensesById: this.Expenses,
    saveDriverSalary: this.Expenses + "/saveSalary",
  };

  report = {
    monthlyTripReport: this.Report + "/monthlyTripReport",
    monthlyExpensesReport: this.Report + "/monthlyExpensesReport",
    monthlyDriverSalary: this.Report + "/monthlyDriverSalary",
    monthlyIncomeReport: this.Report + "/monthlyIncomeReport",
  };

  expenseRequest = {
    save: this.ExpenseRequest,
    approveExpense: this.ExpenseRequest + "/approve",
    rejectExpense: this.ExpenseRequest + "/reject",
    getExpenseExtensionById: this.ExpenseRequest,
  };

  notification = {
    getAllNotifications: this.Notification,
  };
}
