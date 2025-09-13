import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-admission-certificate',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="certificate-container">
      <!-- 背景装饰 -->
      <div class="bg-decoration">
        <div class="floating-star star-1">⭐</div>
        <div class="floating-star star-2">✨</div>
        <div class="floating-star star-3">🌟</div>
        <div class="floating-star star-4">💫</div>
        <div class="floating-star star-5">⭐</div>
        <div class="floating-star star-6">✨</div>
      </div>

      <!-- 证书主体 -->
      <div #certificate class="certificate" data-aos="zoom-in" data-aos-duration="1000">
        <!-- 证书边框装饰 -->
        <div class="certificate-border">
          <div class="corner-decoration top-left">🎓</div>
          <div class="corner-decoration top-right">🏆</div>
          <div class="corner-decoration bottom-left">📜</div>
          <div class="corner-decoration bottom-right">🎯</div>
        </div>

        <!-- 证书内容 -->
        <div #certificateContent class="certificate-content">
          <!-- 标题区域 -->
          <div class="certificate-header">
            <div class="seal-container">
              <div class="seal">
                <div class="seal-inner">
                  <span class="seal-text">LEAD</span>
                  <span class="seal-subtitle">PROGRAM</span>
                </div>
              </div>
            </div>
            <h1 class="certificate-title">录取通知书</h1>
            <h2 class="certificate-subtitle">ADMISSION CERTIFICATE</h2>
          </div>

          <!-- 主要内容 -->
          <div class="certificate-body">
            <div class="greeting">
              <p class="greeting-text">亲爱的学员，</p>
            </div>

            <div class="main-content">
              <p class="content-paragraph">
                恭喜您！经过严格的选拔和评估，我们非常高兴地通知您，您已被正式录取为
                <span class="highlight">《D128 LEAD项目第二期》</span>的学员。
              </p>

              <p class="content-paragraph">
                您展现出的领导力潜质和学习热情深深打动了我们。在接下来的学习旅程中，我们将共同探索领导力的奥秘，提升您的
                <span class="highlight">炼能、韧性、共生</span>三大核心能力。
              </p>

              <div class="achievement-highlight">
                <div class="achievement-icon">🎉</div>
                <div class="achievement-text">
                  <h3>您的成就</h3>
                  <p>成功通过LEAD项目入学评估</p>
                  <p>展现出卓越的领导力潜质</p>
                </div>
              </div>

              <div class="program-details">
                <h3 class="details-title">项目详情</h3>
                <div class="details-grid">
                  <div class="detail-item">
                    <span class="detail-icon">📚</span>
                    <span class="detail-text">系统化领导力培训</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">🤝</span>
                    <span class="detail-text">团队协作实践</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">🎯</span>
                    <span class="detail-text">个性化成长路径</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">🏆</span>
                    <span class="detail-text">DLC人才池机会</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 签名区域 -->
            <div class="signature-section">
              <div class="signature-line"></div>
              <div class="signature-info">
                <div class="signature-item">
                  <span class="signature-label">项目负责人</span>
                  <span class="signature-name">LEAD项目组</span>
                </div>
                <div class="signature-item">
                  <span class="signature-label">签发日期</span>
                  <span class="signature-date">{{ currentDate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 证书底部装饰 -->
        <div class="certificate-footer">
          <div class="footer-text">
            <p>让每一位Leader，成为改变发生的支点</p>
            <p>LEAD Program—Ignite change starting from YOU/ME</p>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons" data-aos="fade-up" data-aos-delay="500">
        <button class="btn btn-primary" (click)="shareCertificate()">
          <span class="btn-icon">📤</span>
          分享证书
        </button>
        <button class="btn btn-secondary" 
                (click)="downloadCertificate()" 
                [disabled]="isGenerating">
          <span class="btn-icon">{{ isGenerating ? '⏳' : '💾' }}</span>
          {{ isGenerating ? '生成中...' : '下载证书' }}
        </button>
        <a routerLink="/members" class="btn btn-outline">
          <span class="btn-icon">👥</span>
          查看学员
        </a>
      </div>

      <!-- 庆祝动画 -->
      <div class="celebration" *ngIf="showCelebration">
        <div class="confetti" *ngFor="let confetti of confettiArray; let i = index" 
             [style]="getConfettiStyle(i)">
        </div>
      </div>

    </div>
  `,
  styles: [`
    .certificate-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem 1rem;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .bg-decoration {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 1;
    }

    .floating-star {
      position: absolute;
      font-size: 2rem;
      animation: float 6s ease-in-out infinite;
      opacity: 0.7;
    }

    .star-1 { top: 10%; left: 10%; animation-delay: 0s; }
    .star-2 { top: 20%; right: 15%; animation-delay: 1s; }
    .star-3 { top: 60%; left: 5%; animation-delay: 2s; }
    .star-4 { top: 70%; right: 10%; animation-delay: 3s; }
    .star-5 { top: 40%; left: 20%; animation-delay: 4s; }
    .star-6 { top: 30%; right: 30%; animation-delay: 5s; }

    .certificate {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 2;
      max-width: 800px;
      width: 100%;
      margin: 2rem 0;
      overflow: hidden;
    }

    .certificate-border {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 8px solid transparent;
      background: linear-gradient(45deg, #ffd700, #ffed4e, #ffd700) border-box;
      border-radius: 20px;
      z-index: 1;
    }

    .corner-decoration {
      position: absolute;
      font-size: 2rem;
      z-index: 2;
    }

    .top-left { top: 20px; left: 20px; }
    .top-right { top: 20px; right: 20px; }
    .bottom-left { bottom: 20px; left: 20px; }
    .bottom-right { bottom: 20px; right: 20px; }

    .certificate-content {
      position: relative;
      z-index: 2;
      padding: 3rem;
      background: white;
      margin: 8px;
      border-radius: 12px;
    }

    .certificate-header {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
    }

    .seal-container {
      margin-bottom: 2rem;
    }

    .seal {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
      animation: pulse 2s ease-in-out infinite;
    }

    .seal::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border-radius: 50%;
      border: 3px solid #ffd700;
      animation: rotate 10s linear infinite;
    }

    .seal-inner {
      text-align: center;
      color: white;
    }

    .seal-text {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 2px;
    }

    .seal-subtitle {
      display: block;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 1px;
      opacity: 0.9;
    }

    .certificate-title {
      font-size: 3rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .certificate-subtitle {
      font-size: 1.2rem;
      color: #667eea;
      font-weight: 500;
      letter-spacing: 3px;
      margin-bottom: 0;
    }

    .certificate-body {
      line-height: 1.8;
    }

    .greeting {
      margin-bottom: 2rem;
    }

    .greeting-text {
      font-size: 1.3rem;
      color: #2c3e50;
      font-weight: 500;
      margin: 0;
    }

    .content-paragraph {
      font-size: 1.1rem;
      color: #444;
      margin-bottom: 1.5rem;
      text-align: justify;
    }

    .highlight {
      background: linear-gradient(120deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
    }

    .achievement-highlight {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 15px;
      padding: 2rem;
      margin: 2rem 0;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      border-left: 5px solid #28a745;
    }

    .achievement-icon {
      font-size: 3rem;
      flex-shrink: 0;
    }

    .achievement-text h3 {
      color: #28a745;
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }

    .achievement-text p {
      color: #666;
      margin: 0.25rem 0;
      font-size: 1rem;
    }

    .program-details {
      margin: 2rem 0;
    }

    .details-title {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .detail-item:hover {
      transform: translateY(-3px);
    }

    .detail-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .detail-text {
      color: #2c3e50;
      font-weight: 500;
    }

    .signature-section {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 2px solid #e9ecef;
    }

    .signature-line {
      height: 2px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      margin-bottom: 1rem;
    }

    .signature-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .signature-item {
      text-align: center;
    }

    .signature-label {
      display: block;
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .signature-name,
    .signature-date {
      display: block;
      font-size: 1.1rem;
      color: #2c3e50;
      font-weight: 600;
    }

    .certificate-footer {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 1.5rem;
      text-align: center;
      margin-top: 2rem;
    }

    .footer-text p {
      margin: 0.5rem 0;
      color: #666;
      font-style: italic;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn {
      padding: 1rem 2rem;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .btn:hover::before {
      left: 100%;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
    }

    .btn-secondary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(40, 167, 69, 0.4);
    }

    .btn-outline {
      background: transparent;
      color: white;
      border: 2px solid white;
      box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
    }

    .btn-outline:hover {
      background: white;
      color: #667eea;
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(255, 255, 255, 0.2);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    .btn:disabled:hover {
      transform: none !important;
      box-shadow: inherit !important;
    }

    .btn-icon {
      font-size: 1.2rem;
    }

    .celebration {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 1000;
    }

    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #ffd700;
      animation: confetti-fall 3s linear forwards;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes confetti-fall {
      0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }

    /* 手机端适配 */
    @media (max-width: 768px) {
      .certificate-container {
        padding: 1rem 0.5rem;
      }

      .certificate {
        margin: 1rem 0;
      }

      .certificate-content {
        padding: 2rem 1.5rem;
      }

      .certificate-title {
        font-size: 2rem;
      }

      .certificate-subtitle {
        font-size: 1rem;
        letter-spacing: 2px;
      }

      .seal {
        width: 100px;
        height: 100px;
      }

      .seal-text {
        font-size: 1.2rem;
      }

      .seal-subtitle {
        font-size: 0.7rem;
      }

      .achievement-highlight {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .details-grid {
        grid-template-columns: 1fr;
      }

      .signature-info {
        flex-direction: column;
        gap: 1rem;
      }

      .action-buttons {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 100%;
        max-width: 300px;
        justify-content: center;
      }

      .floating-star {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .certificate-content {
        padding: 1.5rem 1rem;
      }

      .certificate-title {
        font-size: 1.8rem;
      }

      .content-paragraph {
        font-size: 1rem;
      }

      .achievement-highlight {
        padding: 1.5rem;
      }

      .detail-item {
        padding: 0.75rem;
      }
    }
  `]
})
export class AdmissionCertificateComponent implements OnInit {
  @ViewChild('certificateContent', { static: false }) certificateElement!: ElementRef<HTMLDivElement>;
  
  currentDate: string = '';
  showCelebration: boolean = false;
  confettiArray: number[] = [];
  isGenerating: boolean = false;

  ngOnInit() {
    this.currentDate = new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // 显示庆祝动画
    setTimeout(() => {
      this.showCelebration = true;
      this.generateConfetti();
    }, 1000);

    // 3秒后隐藏庆祝动画
    setTimeout(() => {
      this.showCelebration = false;
    }, 4000);
  }

  generateConfetti() {
    this.confettiArray = Array.from({ length: 50 }, (_, i) => i);
  }

  getConfettiStyle(index: number) {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return `
      left: ${left}%;
      background: ${color};
      animation-delay: ${animationDelay}s;
    `;
  }

  shareCertificate() {
    if (navigator.share) {
      navigator.share({
        title: 'LEAD项目录取通知书',
        text: '恭喜我被LEAD项目录取！',
        url: window.location.href
      });
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板！');
      });
    }
  }

  async downloadCertificate() {
    if (this.isGenerating) return;
    
    this.isGenerating = true;
    
    try {
      // 使用html2canvas生成证书图片
      const canvas = await html2canvas(this.certificateElement.nativeElement, {
        scale: 2, // 提高分辨率
        useCORS: true, // 允许跨域资源
        allowTaint: true, // 允许污染画布
        backgroundColor: '#ffffff', // 设置白色背景
        width: this.certificateElement.nativeElement.offsetWidth,
        height: this.certificateElement.nativeElement.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
      
      // 转换为图片数据URL
      const imageDataUrl = canvas.toDataURL('image/png', 1.0);
      
      // 创建下载链接
      const link = document.createElement('a');
      link.download = `LEAD项目录取通知书_${new Date().toISOString().split('T')[0]}.png`;
      link.href = imageDataUrl;
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 显示成功提示
      this.showSuccessMessage();
      
    } catch (error) {
      console.error('生成证书失败:', error);
      alert('生成证书失败，请重试');
    } finally {
      this.isGenerating = false;
    }
  }



  private showSuccessMessage() {
    // 创建成功提示
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      padding: 20px 40px;
      border-radius: 10px;
      font-size: 18px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    message.textContent = '证书下载成功！🎉';
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { opacity: 0; transform: translate(-50%, -60%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // 3秒后移除提示
    setTimeout(() => {
      document.body.removeChild(message);
      document.head.removeChild(style);
    }, 3000);
  }
}
