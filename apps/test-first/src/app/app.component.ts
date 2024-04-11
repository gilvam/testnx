import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test-first';

  constructor() {
    const x: any = '';
  }

  testX(): any{
    console.log('testX return n');
  }

  testY() {
    console.log('testX return no especific');
  }
}
