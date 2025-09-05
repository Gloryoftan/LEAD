import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Contact Hero -->
    <section class="contact-hero">
      <div class="container">
        <div class="contact-hero-content text-center">
          <h1 class="contact-title fade-in-up">联系我们</h1>
          <p class="contact-subtitle fade-in-up">
            我们很乐意听到您的想法和建议
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <div class="card">
              <h2 class="form-title">发送消息</h2>
              <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
                <div class="form-group">
                  <label for="name" class="form-label">姓名 *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    class="form-input" 
                    [(ngModel)]="formData.name"
                    required
                    #nameInput="ngModel">
                  <div class="form-error" *ngIf="nameInput.invalid && nameInput.touched">
                    请输入您的姓名
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">邮箱 *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    class="form-input" 
                    [(ngModel)]="formData.email"
                    required
                    email
                    #emailInput="ngModel">
                  <div class="form-error" *ngIf="emailInput.invalid && emailInput.touched">
                    <span *ngIf="emailInput.errors?.['required']">请输入您的邮箱</span>
                    <span *ngIf="emailInput.errors?.['email']">请输入有效的邮箱地址</span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">主题</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    class="form-input" 
                    [(ngModel)]="formData.subject">
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">消息 *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    class="form-textarea" 
                    rows="5"
                    [(ngModel)]="formData.message"
                    required
                    #messageInput="ngModel"></textarea>
                  <div class="form-error" *ngIf="messageInput.invalid && messageInput.touched">
                    请输入您的消息
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  class="btn btn-primary form-submit"
                  [disabled]="contactForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">发送消息</span>
                  <span *ngIf="isSubmitting">发送中...</span>
                </button>
              </form>
            </div>
          </div>
          
          <!-- Contact Info -->
          <div class="contact-info-section">
            <div class="contact-info-card card">
              <h2 class="info-title">联系信息</h2>
              
              <div class="info-item">
                <div class="info-icon">📧</div>
                <div class="info-content">
                  <h3 class="info-label">邮箱地址</h3>
                  <p class="info-value">
                    <a href="mailto:your-email@example.com">your-email@example.com</a>
                  </p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">🌐</div>
                <div class="info-content">
                  <h3 class="info-label">项目地址</h3>
                  <p class="info-value">
                    <a href="https://github.com/yourusername/LEAD" target="_blank">
                      GitHub Repository
                    </a>
                  </p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">🏠</div>
                <div class="info-content">
                  <h3 class="info-label">网站地址</h3>
                  <p class="info-value">
                    <a href="https://yourusername.github.io/LEAD" target="_blank">
                      https://yourusername.github.io/LEAD
                    </a>
                  </p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">📍</div>
                <div class="info-content">
                  <h3 class="info-label">位置</h3>
                  <p class="info-value">中国</p>
                </div>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="social-section card">
              <h3 class="social-title">社交媒体</h3>
              <div class="social-links">
                <a href="https://github.com/yourusername" target="_blank" class="social-link">
                  <span class="social-icon">📱</span>
                  <span class="social-text">GitHub</span>
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" class="social-link">
                  <span class="social-icon">🐦</span>
                  <span class="social-text">Twitter</span>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">
                  <span class="social-icon">💼</span>
                  <span class="social-text">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">常见问题</h2>
          <p class="section-subtitle">
            以下是一些常见问题的答案
          </p>
        </div>
        
        <div class="faq-list">
          <div class="faq-item card" *ngFor="let faq of faqList; let i = index">
            <div class="faq-question" (click)="toggleFaq(i)">
              <h3 class="faq-title">{{ faq.question }}</h3>
              <span class="faq-toggle" [class.active]="faq.isOpen">+</span>
            </div>
            <div class="faq-answer" [class.open]="faq.isOpen">
              <p class="faq-text">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 0 4rem;
      
      .contact-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      .contact-subtitle {
        font-size: 1.3rem;
        opacity: 0.9;
      }
    }
    
    .contact-content {
      padding: 6rem 0;
      background: white;
      
      .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
      }
    }
    
    .contact-form-section {
      .card {
        padding: 2.5rem;
        
        .form-title {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          color: #2c3e50;
        }
      }
    }
    
    .contact-form {
      .form-group {
        margin-bottom: 1.5rem;
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          
          &:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          
          &.ng-invalid.ng-touched {
            border-color: #dc3545;
          }
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        .form-error {
          color: #dc3545;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
      }
      
      .form-submit {
        width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
    
    .contact-info-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      
      .contact-info-card {
        padding: 2rem;
        
        .info-title {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          color: #2c3e50;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
          
          .info-icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            margin-top: 0.25rem;
          }
          
          .info-content {
            .info-label {
              font-size: 1.1rem;
              font-weight: 600;
              color: #2c3e50;
              margin-bottom: 0.5rem;
            }
            
            .info-value {
              color: #666;
              margin: 0;
              
              a {
                color: #667eea;
                text-decoration: none;
                
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
      
      .social-section {
        padding: 2rem;
        
        .social-title {
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        
        .social-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          
          .social-link {
            display: flex;
            align-items: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            text-decoration: none;
            color: #2c3e50;
            transition: all 0.3s ease;
            
            &:hover {
              background: #667eea;
              color: white;
              transform: translateX(5px);
            }
            
            .social-icon {
              font-size: 1.5rem;
              margin-right: 1rem;
            }
            
            .social-text {
              font-weight: 500;
            }
          }
        }
      }
    }
    
    .faq {
      padding: 6rem 0;
      background: #f8f9fa;
      
      .section-header {
        margin-bottom: 4rem;
        
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #666;
        }
      }
      
      .faq-list {
        max-width: 800px;
        margin: 0 auto;
        
        .faq-item {
          margin-bottom: 1rem;
          padding: 0;
          overflow: hidden;
          
          .faq-question {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            
            &:hover {
              background: rgba(102, 126, 234, 0.05);
            }
            
            .faq-title {
              font-size: 1.2rem;
              font-weight: 600;
              color: #2c3e50;
              margin: 0;
            }
            
            .faq-toggle {
              font-size: 1.5rem;
              font-weight: 300;
              color: #667eea;
              transition: transform 0.3s ease;
              
              &.active {
                transform: rotate(45deg);
              }
            }
          }
          
          .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            
            &.open {
              max-height: 200px;
            }
            
            .faq-text {
              padding: 0 2rem 1.5rem;
              color: #666;
              line-height: 1.6;
              margin: 0;
            }
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .contact-hero {
        padding: 4rem 0 2rem;
        
        .contact-title {
          font-size: 2.5rem;
        }
        
        .contact-subtitle {
          font-size: 1.1rem;
        }
      }
      
      .contact-content {
        padding: 4rem 0;
        
        .contact-grid {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }
      
      .contact-form-section {
        .card {
          padding: 1.5rem;
        }
      }
      
      .contact-info-section {
        .contact-info-card,
        .social-section {
          padding: 1.5rem;
        }
      }
      
      .faq {
        padding: 4rem 0;
        
        .section-header {
          margin-bottom: 2rem;
          
          .section-title {
            font-size: 2rem;
          }
        }
        
        .faq-list {
          .faq-item {
            .faq-question {
              padding: 1rem 1.5rem;
              
              .faq-title {
                font-size: 1.1rem;
              }
            }
            
            .faq-answer {
              .faq-text {
                padding: 0 1.5rem 1rem;
              }
            }
          }
        }
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;
  
  faqList = [
    {
      question: '如何参与项目开发？',
      answer: '欢迎Fork我们的仓库，然后提交Pull Request。我们很乐意看到您的贡献！',
      isOpen: false
    },
    {
      question: '项目使用什么许可证？',
      answer: '本项目采用MIT许可证，您可以自由使用、修改和分发。',
      isOpen: false
    },
    {
      question: '如何报告安全问题？',
      answer: '如果您发现了安全问题，请通过邮件联系我们，我们会尽快处理。',
      isOpen: false
    },
    {
      question: '项目支持哪些浏览器？',
      answer: '我们支持所有现代浏览器，包括Chrome、Firefox、Safari和Edge。',
      isOpen: false
    },
    {
      question: '如何获取技术支持？',
      answer: '您可以通过GitHub Issues或邮件联系我们获取技术支持。',
      isOpen: false
    }
  ];
  
  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // 模拟提交过程
    setTimeout(() => {
      console.log('表单数据:', this.formData);
      alert('消息发送成功！我们会尽快回复您。');
      
      // 重置表单
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      this.isSubmitting = false;
    }, 2000);
  }
  
  toggleFaq(index: number) {
    this.faqList[index].isOpen = !this.faqList[index].isOpen;
  }
}
