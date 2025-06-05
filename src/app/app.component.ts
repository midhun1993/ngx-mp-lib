import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxMpNotificationService} from 'ngx-mp-notification';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-mp-lib';
  constructor(private notifier: NgxMpNotificationService) {
    
  }
  openWarning(){
      let notify = this.notifier.warning("Hello There", "Ddhj", {});
      notify.addAction("okay", "Okay", this.okay)
      notify.addAction("cancel", "Cancel", this.okay)
      notify.fire();
  }
  okay() {
    console.log("okay");
  }
}
