import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxMpNotificationService } from 'ngx-mp-notification';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-mp-lib';
  constructor(
    private notifier: NgxMpNotificationService
  ) { }

  openWarning(){
    this.notifier.warning(
      "Hello There",
      "How are you",
      {
        ok: () => console.log("Okay"),
        cancel: () => console.log("Cancel"),
      });
  }

  openAlert(){
    this.notifier.alert(
      "Hello There",
      "How are you",
      {
        ok: () => console.log("Okay")
      });
  }

  openGeneric(){
     const notifier = this.notifier.generic("Hey There", "This is an generic")
      notifier.addAction("okay", "Okay", () => console.log("Okay"))
      notifier.addAction("maybe", "May be", () => console.log("May be"))
      notifier.addAction("cancel", "Cancel", () => console.log("Cancel"))
      notifier.fire();
  }
  
}
