import { Injectable } from "@angular/core";
import { HelperService } from "./helper.service";
@Injectable({
  providedIn: "root",
})
export class MasterDataService {
  constructor(private helper: HelperService) {}

  setUserData(loginData: any) {
    // this.MenuList = loginData?.moduleIds ?? [];
    // this.SessionKey = loginData.token;
    this.SessionKey = `Bearer ${loginData.token}`;
    this.ClientId = loginData.user?.userId;
    this.CurrentUserName = loginData.user?.firstName;
    this.Role = loginData.user?.role;
    this.profileImage = loginData.user?.profileImage;
    this.TimedOut = "false";
    this.WorkingMonth = loginData.workingMonth;
    this.WorkingYear = loginData.workingYear;
    this.WorkingDate = loginData.workingDate;
  }

  setWorkingInfo(workingInfo: any) {
    this.WorkingMonth = workingInfo.workingMonth;
    this.WorkingYear = workingInfo.workingYear;
    this.WorkingDate = workingInfo.workingDate;
  }

  get TimedOut(): any {
    return localStorage.getItem(AppKeys.TimedOut) ?? "false";
  }

  set TimedOut(value: any) {
    localStorage.setItem(AppKeys.TimedOut, value);
  }

  get SessionKey(): string {
    return localStorage.getItem(AppKeys.SessionKey) ?? "";
  }

  set SessionKey(key: string) {
    localStorage.setItem(AppKeys.SessionKey, key);
  }

  get MenuList(): any {
    let menus = localStorage.getItem(AppKeys.MenuList) ?? "";
    return JSON.parse(menus);
  }

  set MenuList(key: any) {
    localStorage.setItem(AppKeys.MenuList, JSON.stringify(key));
  }

  get CurrentUserName(): any {
    return localStorage.getItem(AppKeys.CurrentUserName) ?? "";
  }

  set CurrentUserName(name: any) {
    localStorage.setItem(AppKeys.CurrentUserName, name);
  }

  get ClientId(): any {
    return localStorage.getItem(AppKeys.ClientId) ?? "";
  }

  set ClientId(id: any) {
    localStorage.setItem(AppKeys.ClientId, id);
  }

  set Role(role: any) {
    localStorage.setItem(AppKeys.Role, role);
  }

  get Role(): any {
    return localStorage.getItem(AppKeys.Role) ?? "";
  }

  set profileImage(profile: any) {
    localStorage.setItem(AppKeys.profileImage, profile);
  }

  get profileImage(): any {
    return localStorage.getItem(AppKeys.profileImage) ?? "";
  }


  set WorkingMonth(month: any) {
    localStorage.setItem(AppKeys.WorkingMonth, month);
  }

  get WorkingMonth(): any {
    return localStorage.getItem(AppKeys.WorkingMonth) ?? "";
  }

  set WorkingYear(year: any) {
    localStorage.setItem(AppKeys.WorkingYear, year);
  }

  get WorkingYear(): any {
    return localStorage.getItem(AppKeys.WorkingYear) ?? "";
  }

  set WorkingDate(date: any) {
    localStorage.setItem(AppKeys.WorkingDate, date);
  }

  get WorkingDate(): any {
    return localStorage.getItem(AppKeys.WorkingDate) ?? "";
  }

  clearLoginData() {
    localStorage.removeItem(AppKeys.SessionKey);
    localStorage.removeItem(AppKeys.MenuList);
    localStorage.removeItem(AppKeys.CurrentUserName);
    localStorage.removeItem(AppKeys.ClientId);
    localStorage.removeItem(AppKeys.TimedOut);
    localStorage.removeItem(AppKeys.Role);
    localStorage.removeItem(AppKeys.profileImage);
    localStorage.removeItem(AppKeys.WorkingMonth);
    localStorage.removeItem(AppKeys.WorkingYear);
    localStorage.removeItem(AppKeys.WorkingDate);
  }
}

export class AppKeys {
  static readonly SessionKey = "SessionKey";
  static readonly MenuList = "MenuList";
  static readonly CurrentUserName = "CurrentUserName";
  static readonly ClientId = "ClientId";
  static readonly TimedOut = "TimedOut";
  static readonly Role = "Role";
  static readonly profileImage = "profileImage";
  static readonly WorkingMonth = "WorkingMonth";
  static readonly WorkingYear = "WorkingYear";
  static readonly WorkingDate = "WorkingDate";
}
