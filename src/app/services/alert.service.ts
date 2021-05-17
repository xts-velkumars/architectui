import { Injectable } from "@angular/core";
import { NotificationBarService, NotificationType } from "ngx-notification-bar";

@Injectable()
export class AlertService {
  constructor(private notificationBarService: NotificationBarService) {}

  success(message: string, keepAfterNavigationChange = false) {
    this.notificationBarService.create({
      message: message,
      type: NotificationType.Success,
      isHtml: true,
      hideOnHover: false,
      hideDelay: 50000,
      allowClose: true,
    });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.notificationBarService.create({
      message: message,
      type: NotificationType.Error,
      isHtml: true,
      hideOnHover: false,
      hideDelay: 5000,
      allowClose: true,
    });
  }

  warning(message: string, keepAfterNavigationChange = false) {
    this.notificationBarService.create({
      message: message,
      type: NotificationType.Warning,
      isHtml: true,
      hideOnHover: false,
      hideDelay: 5000,
      allowClose: true,
    });
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.notificationBarService.create({
      message: message,
      type: NotificationType.Info,
      isHtml: true,
      hideOnHover: false,
      hideDelay: 5000,
      allowClose: true,
    });
  }
}
