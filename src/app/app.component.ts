import { LanguageService } from './language.service';
import { SocketIoService } from './shared/socket-io.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'grad-project';
  constructor(
    private socketIoService: SocketIoService,
    private langService: LanguageService
  ) {}
  ngOnInit() {
    this.langService.initialLanguage();
    this.socketIoService.init();
  }
}
