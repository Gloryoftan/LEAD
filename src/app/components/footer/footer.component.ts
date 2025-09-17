import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-bottom">
          <p class="copyright">
            &copy; {{ currentYear }} LEAD项目
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      margin-top: 4rem;
    }
    
    .footer-bottom {
      padding: 1.5rem 0;
      text-align: center;
      
      .copyright {
        color: #bdc3c7;
        margin: 0;
        font-size: 0.9rem;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
