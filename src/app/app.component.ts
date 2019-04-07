import {Component, ViewChild} from '@angular/core';
import {WebSocketService} from './services/web-socket-service';
import {NotificationComponent} from './shared/notification/notification.component';
import {Notification} from './model/Notification';
import {OauthApiService} from './services/oauth-api-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(
    private webSocketService: WebSocketService,
    private oauth: OauthApiService
  ) {
    if (oauth.checkTokens()) {
      this.notify();
    }
  }

  notify() {
    const stompClient = this.webSocketService.connect(); // TODO when connect?

    stompClient.connect({}, () => {
      const url = stompClient.ws._transport.url;
      const array = url.split('/');
      const id = array[array.length - 2];

      alert('Your current session is: ' + id);

      stompClient.subscribe('/user/queue/notify', notification => {
        const notify = <Notification>JSON.parse(notification.body);
        this.notification.show(notify);
      });

      this.webSocketService.register(id);
    });
  }

  test() {
    console.log('TEST');
  }
}
